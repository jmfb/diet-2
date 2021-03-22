using System;
using System.Reflection;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Diet.Server.Models
{
	public class AppSettings
	{
		public string BundleVersion { get; set; }
		public SymmetricSecurityKey Key { get; set; }
		public string AuthClientSecret { get; set; }

		public static SymmetricSecurityKey CreateKey() =>
			new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GetEnvironmentVariable("TokenSecret")));

		public void Configure(SymmetricSecurityKey key)
		{
			BundleVersion = Assembly
				.GetExecutingAssembly()
				.GetName()
				.Version
				.ToString();
			Key = key;
			AuthClientSecret = GetEnvironmentVariable(nameof(AuthClientSecret));
		}

		private static string GetEnvironmentVariable(string name) =>
			GetAndDecryptEnvironmentVariable($"Encrypted{name}") ??
			Environment.GetEnvironmentVariable(name);

		private static string GetAndDecryptEnvironmentVariable(string name) =>
			DecryptEnvironmentVariable(Environment.GetEnvironmentVariable(name));

		private static string DecryptEnvironmentVariable(string value)
		{
			if (string.IsNullOrEmpty(value))
				return null;
			// TODO: Use KMS to decrypt value
			return value;
		}
	}
}
