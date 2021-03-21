using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Diet.Server.Configuration;
using Diet.Server.Models;
using Diet.Server.Services;

namespace Diet.Server
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<AppSettings>(settings => settings.Configure());
			services.AddHttpClient<IAuthenticationService, AuthenticationService>(httpClient =>
			{
				httpClient.BaseAddress = new Uri("https://www.googleapis.com/oauth2/");
			});
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseHsts();
			app.UseHttpsRedirection();
			app.UseStaticFiles(StaticFiles.Configure());
			app.UseMvc(Routes.Configure);
		}
	}
}
