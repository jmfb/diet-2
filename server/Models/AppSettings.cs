using System;
using System.IO;
using System.Reflection;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Amazon.KeyManagementService;
using Amazon.KeyManagementService.Model;

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

		private static AmazonKeyManagementServiceClient CreateKeyManagementServiceClient() =>
			new AmazonKeyManagementServiceClient(new AmazonKeyManagementServiceConfig
			{
				// Must specify the ClientConfig.HttpClientCacheSize to avoid "Not supported on this platform" error.
				HttpClientCacheSize = Environment.ProcessorCount
			});

		private static string DecryptEnvironmentVariable(string ciphertext)
		{
			if (string.IsNullOrEmpty(ciphertext))
				return null;
			using (var client = CreateKeyManagementServiceClient())
			using (var ciphertextBlob = new MemoryStream(Convert.FromBase64String(ciphertext)))
			{
				var result = client.DecryptAsync(new DecryptRequest
				{
					CiphertextBlob = ciphertextBlob
				}).Result;
				using (var stringReader = new StreamReader(result.Plaintext))
					return stringReader.ReadToEnd();
			}
		}
	}
}
