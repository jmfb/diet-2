using System;
using System.IdentityModel.Tokens;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Extensions.Options;
using Diet.Server.Models;

namespace Diet.Server.Services
{
	public interface IAuthenticationService
	{
	}

	public class AuthenticationService : IAuthenticationService
	{
		private const string clientId = "658047002068-3ua2muku5jcicnj8ru0nvqa6f5khg0mi.apps.googleusercontent.com";
		private const string clientSecret = "KYbKCySxnPQLvFoywB_wO5Uu";
		private const string audience = "DietClient";
		private const string issuer = "DietApi";
		private const string signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#hmac-sha256";
		private const string digestAlgorithm = "http://www.w3.org/2001/04/xmlenc#sha256";
		private const string userIdClaimType = "userId";

		private HttpClient HttpClient { get; }
		private InMemorySymmetricSecurityKey Key { get; }

		public AuthenticationService(
			HttpClient httpClient,
			IOptions<AppSettings> appSettingsAccessor)
		{
			HttpClient = httpClient;
			var secret = appSettingsAccessor.Value.Secret;
			var secretBytes = Encoding.UTF8.GetBytes(secret);
			Key = new InMemorySymmetricSecurityKey(secretBytes);
		}

		public string GetGoogleAuthenticationUrl(string redirectUrl)
		{
			var query = HttpUtility.ParseQueryString("");
			query["redirect_uri"] = redirectUrl;
			query["prompt"] = "consent";
			query["response_type"] = "code";
			query["client_id"] = clientId;
			query["scope"] = "https://www.googleapis.com/auth/userinfo.email";
			query["access_type"] = "offline";
			return $"https://accounts.google.com/o/oauth2/v2/auth?{query}";
		}

		public async Task<TokenModel> GetGoogleToken(string redirectUrl, string authorizationCode)
		{
			var query = HttpUtility.ParseQueryString("");
			query["code"] = authorizationCode;
			query["redirect_uri"] = redirectUrl;
			query["client_id"] = clientId;
			query["client_secret"] = clientSecret;
			query["scope"] = "";
			query["grant_type"] = "authorization_code";
			var content = new StringContent(query.ToString(), Encoding.UTF8, "application/x-www-form-urlencoded");
			var response = await httpClient.PostAsync(new Uri("v4/token"), content);
			if (!response.IsSuccessStatusCode)
				throw new InvalidOperationException(await response.Content.ReadAsStringAsync());
			var json = await response.Content.ReadAsStringAsync();
			return JsonConvert.DeserializeObject<TokenModel>(json);
		}

		public async Task<UserInfoModel> GetUserInfo(string tokenType, string accessToken)
		{
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(tokenType, accessToken);
			var response = await client.GetAsync(new Uri("v2/userinfo"));
			if (!response.IsSuccessStatusCode)
				throw new InvalidOperationException(await response.Content.ReadAsStringAsync());
			var json = await response.Content.ReadAsStringAsync();
			return JsonConvert.DeserializeObject<UserInfoModel>(json);
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
