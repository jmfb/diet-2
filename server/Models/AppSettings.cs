namespace Diet.Server.Models
{
	public class AppSettings
	{
		public string BundleVersion { get; set; }
		public string Secret { get; set; }

		public void Configure()
		{
			BundleVersion = Assembly
				.GetExecutingAssembly()
				.GetName()
				.Version
				.ToString();
			// TODO: Read and decrypt Secret from environment variables
			Secret = "ReallyLongSuperSecret";
		}
	}
}
