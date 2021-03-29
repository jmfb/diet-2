using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Diet.Server.Api.Models;
using Diet.Server.Services;

namespace Diet.Server.Api.Controllers
{
	[Route("api/authentication")]
	public class AuthenticationController : Controller
	{
		private IAuthenticationService AuthenticationService { get; }

		public AuthenticationController(IAuthenticationService authenticationService)
		{
			AuthenticationService = authenticationService;
		}

		[HttpGet("url")]
		public async Task<string> GetAuthenticationUrl(string redirectUrl)
		{
			return await AuthenticationService.GetGoogleAuthenticationUrl(redirectUrl);
		}

		[HttpGet("sign-in")]
		public async Task<SignedInModel> SignIn(string redirectUrl, string authorizationCode)
		{
			var googleToken = await AuthenticationService.GetGoogleToken(redirectUrl, authorizationCode);
			var userInfo = await AuthenticationService.GetUserInfo(googleToken.TokenType, googleToken.AccessToken);
			var email = userInfo.Email.ToLower();
			var userId = email.GetHashCode();
			return new SignedInModel
			{
				AccessToken = AuthenticationService.CreateAccessToken(userId),
				Email = email
			};
		}
	}
}
