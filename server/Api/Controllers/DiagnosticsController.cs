using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Diet.Server.Models;
using Diet.Server.Api.Models;

namespace Diet.Server.Api.Controllers
{
	[Route("api/diagnostics")]
	public class DiagnosticsController : AuthorizedController
	{
		private AppSettings AppSettings { get; }

		public DiagnosticsController(IOptions<AppSettings> appSettingsAccessor)
		{
			AppSettings = appSettingsAccessor.Value;
		}

		[HttpGet("heartbeat")]
		public HeartbeatModel Heartbeat()
		{
			return new HeartbeatModel
			{
				BundleVersion = AppSettings.BundleVersion
			};
		}
	}
}
