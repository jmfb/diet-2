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

		[Route("url")]
		[HttpGet]
		public async Task<string> GetAuthenticationUrl(string redirectUrl)
		{
			return await AuthenticationService.GetGoogleAuthenticationUrl(redirectUrl);
		}

		[Route("login")]
		[HttpGet]
		public async Task<LoginModel> Login(string redirectUrl, string authorizationCode)
		{
			var googleToken = await AuthenticationService.GetGoogleToken(redirectUrl, authorizationCode);
			var userInfo = await AuthenticationService.GetUserInfo(googleToken.TokenType, googleToken.AccessToken);
			var email = userInfo.Email;
			// TODO: Map email to a unique user ID
			var userId = 1;
			return new LoginModel
			{
				AccessToken = AuthenticationService.CreateAuthorizationToken(userId),
				Email = email
			};
		}
	}
}
