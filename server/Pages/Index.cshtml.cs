using System.Reflection;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Diet.Server.Pages
{
	public class IndexModel : PageModel
	{
		public string BundleVersion { get; } = Assembly.GetExecutingAssembly().GetName().Version.ToString();
	}
}
