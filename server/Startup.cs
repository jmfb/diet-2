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
			services.AddHttpClient<IAuthenticationService, AuthenticationService>();
			services.AddControllers();
			services.AddMvc();
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseHsts();
			app.UseHttpsRedirection();
			app.UseStaticFiles(StaticFiles.Configure());
			app.UseRouting();
			app.UseEndpoints(Endpoints.Configure);
		}
	}
}
