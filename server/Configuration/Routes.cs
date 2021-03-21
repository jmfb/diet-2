using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace Diet.Server.Configuration
{
	public static class Routes
	{
		public static void Configure(IRouteBuilder routes)
		{
			routes.MapRoute(
				name: "default",
				template: "{controller=Home}/{action=Index}/{id?}");
			routes.MapSpaFallbackRoute(
				name: "spa-fallback",
				defaults: new { controller = "Home", action = "Index" });
		}
	}
}
