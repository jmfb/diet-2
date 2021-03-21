using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Extensions.Options;
using Diet.Server.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Diet.Server.Services
{
	public interface IAuthenticationService
	{
		Task<string> GetGoogleAuthenticationUrl(string redirectUrl);
		Task<TokenModel> GetGoogleToken(string redirectUrl, string authorizationCode);
		Task<UserInfoModel> GetUserInfo(string tokenType, string accessToken);
		string CreateAuthorizationToken(int userId);
		int? Authorize(AuthenticationHeaderValue authorization);
	}

	public class AuthenticationService : IAuthenticationService
	{
		private const string clientId = "959516251255-t1bd2ee6771be2ck4j68vpbg9em8g2pp.apps.googleusercontent.com";
		private const string audience = "https://diet.buysse.link";
		private const string issuer = "https://diet.buysse.link";
		private const string signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha256";
		private const string digestAlgorithm = "http://www.w3.org/2001/04/xmlenc#sha256";
		private const string userIdClaimType = "userId";

		private HttpClient HttpClient { get; }
		private SymmetricSecurityKey Key { get; }
		private string ClientSecret { get; }

		public AuthenticationService(
			HttpClient httpClient,
			IOptions<AppSettings> appSettingsAccessor)
		{
			HttpClient = httpClient;
			var appSettings = appSettingsAccessor.Value;
			Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.TokenSecret));
			ClientSecret = appSettings.AuthClientSecret;
		}

		private async Task<DiscoveryModel> GetDiscoveryModel()
		{
			var response = await HttpClient.GetAsync("https://accounts.google.com/.well-known/openid-configuration");
			if (!response.IsSuccessStatusCode)
				throw new InvalidOperationException(await response.Content.ReadAsStringAsync());
			var json = await response.Content.ReadAsStringAsync();
			return JsonConvert.DeserializeObject<DiscoveryModel>(json);
		}

		public async Task<string> GetGoogleAuthenticationUrl(string redirectUrl)
		{
			var query = HttpUtility.ParseQueryString("");
			query["redirect_uri"] = redirectUrl;
			query["prompt"] = "consent";
			query["response_type"] = "code";
			query["client_id"] = clientId;
			query["scope"] = "https://www.googleapis.com/auth/userinfo.email";
			query["access_type"] = "offline";
			var discovery = await GetDiscoveryModel();
			return $"{discovery.AuthorizationEndpoint}?{query}";
		}

		public async Task<TokenModel> GetGoogleToken(string redirectUrl, string authorizationCode)
		{
			var discovery = await GetDiscoveryModel();
			var query = HttpUtility.ParseQueryString("");
			query["code"] = authorizationCode;
			query["redirect_uri"] = redirectUrl;
			query["client_id"] = clientId;
			query["client_secret"] = ClientSecret;
			query["scope"] = "";
			query["grant_type"] = "authorization_code";
			var content = new StringContent(query.ToString(), Encoding.UTF8, "application/x-www-form-urlencoded");
			var response = await HttpClient.PostAsync(discovery.TokenEndpoint, content);
			if (!response.IsSuccessStatusCode)
				throw new InvalidOperationException(await response.Content.ReadAsStringAsync());
			var json = await response.Content.ReadAsStringAsync();
			return JsonConvert.DeserializeObject<TokenModel>(json);
		}

		public async Task<UserInfoModel> GetUserInfo(string tokenType, string accessToken)
		{
			var discovery = await GetDiscoveryModel();
			using (var request = new HttpRequestMessage(HttpMethod.Get, discovery.UserInfoEndpoint))
			{
				request.Headers.Authorization = new AuthenticationHeaderValue(tokenType, accessToken);
				var response = await HttpClient.SendAsync(request);
				if (!response.IsSuccessStatusCode)
					throw new InvalidOperationException(await response.Content.ReadAsStringAsync());
				var json = await response.Content.ReadAsStringAsync();
				return JsonConvert.DeserializeObject<UserInfoModel>(json);
			}
		}

		public string CreateAuthorizationToken(int userId) => new JwtSecurityTokenHandler()
			.WriteToken(new JwtSecurityToken(
				issuer,
				audience,
				new[]
				{
					new Claim(userIdClaimType, userId.ToString())
				},
				signingCredentials: new SigningCredentials(Key, signatureAlgorithm, digestAlgorithm)));

		private int ParseToken(string token)
		{
			try
			{
				var claimsPrincipal = new JwtSecurityTokenHandler().ValidateToken(
					token,
					new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidIssuer = issuer,
						ValidateAudience = true,
						ValidAudience = audience,
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = Key,
						ValidateLifetime = false
					},
					out var _);
				var userId = claimsPrincipal.Claims.Single(claim => claim.Type == userIdClaimType).Value;
				return int.Parse(userId);
			}
			catch (Exception exception)
			{
				throw new SecurityException("Invalid authorization token.", exception);
			}
		}

		public int? Authorize(AuthenticationHeaderValue authorization)
		{
			if (authorization == null)
				return null;
			if (authorization.Scheme != "Bearer")
				return null;
			try
			{
				return ParseToken(authorization.Parameter);
			}
			catch (SecurityException)
			{
				return null;
			}
		}
	}
}
