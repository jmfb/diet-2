using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Diet.Server.Services;

namespace Diet.Server.Api.Controllers {
	[Authorize]
	public class AuthorizedController : Controller {
		protected string UserId => User
			.Claims
			.Single(claim => claim.Type == AuthenticationService.UserIdClaimType)
			.Value;
	}
}
