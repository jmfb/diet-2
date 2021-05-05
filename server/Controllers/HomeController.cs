using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Diet.Server.Models;

namespace Diet.Server.Controllers {
	public class HomeController : Controller {
		private AppSettings AppSettings { get; }

		public HomeController(IOptions<AppSettings> appSettingsAccessor) {
			AppSettings = appSettingsAccessor.Value;
		}

		[HttpGet]
		public IActionResult Index() {
			var model = new IndexModel {
				BundleVersion = AppSettings.BundleVersion,
				ScriptChunks = AppSettings.ScriptChunks,
				StyleChunks = AppSettings.StyleChunks
			};
			return View(model);
		}
	}
}
