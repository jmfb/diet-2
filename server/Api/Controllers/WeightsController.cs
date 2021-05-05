using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Diet.Server.Api.Models;
using Diet.Server.Models;
using Diet.Server.Services;

namespace Diet.Server.Api.Controllers {
	[Route("api/weights")]
	public class WeightsController : AuthorizedController {
		private IWeightsService WeightsService { get; }

		public WeightsController(IWeightsService weightsService) {
			WeightsService = weightsService;
		}

		[HttpPut("{date}")]
		public async Task<IActionResult> SaveAsync(
			string date,
			[FromBody] SaveWeightRequest model,
			CancellationToken cancellationToken
		) {
			var weight = new Weight {
				UserId = UserId,
				Date = date,
				WeightInPounds = model.WeightInPounds
			};
			if (!WeightsService.TryValidate(weight, out var errorMessage))
				return BadRequest(errorMessage);
			await WeightsService.SaveAsync(weight, cancellationToken);
			return Ok();
		}

		[HttpGet]
		public async Task<IList<Weight>> LoadAllAsync(CancellationToken cancellationToken) {
			return await WeightsService.LoadAllAsync(UserId, cancellationToken);
		}
	}
}
