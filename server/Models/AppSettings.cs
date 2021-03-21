using System;
using System.Reflection;

namespace Diet.Server.Models
{
	public class AppSettings
	{
		public string BundleVersion { get; set; }
		public string TokenSecret { get; set; }
		public string AuthClientSecret { get; set; }

		public void Configure()
		{
			BundleVersion = Assembly
				.GetExecutingAssembly()
				.GetName()
				.Version
				.ToString();
			TokenSecret = GetEnvironmentVariable(nameof(TokenSecret));
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
