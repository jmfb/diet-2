using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Diet.Server.Models;
using Diet.Server.Services;

namespace Diet.Server.Api.Controllers {
	[Route("api/profile")]
	public class ProfileController : AuthorizedController {
		private IProfileService ProfileService { get; }

		public ProfileController(IProfileService profileService) {
			ProfileService = profileService;
		}

		[HttpGet]
		public async Task<Profile> GetAsync(CancellationToken cancellationToken) {
			return await ProfileService.GetAsync(UserId, cancellationToken);
		}

		[HttpPut]
		public async Task<IActionResult> SaveAsync([FromBody] Profile profile, CancellationToken cancellationToken) {
			profile.UserId = UserId;
			if (!ProfileService.TryValidate(profile, out var errorMessage))
				return BadRequest(errorMessage);
			await ProfileService.SaveAsync(profile, cancellationToken);
			return Ok();
		}
	}
}
