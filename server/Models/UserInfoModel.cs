using Newtonsoft.Json;

namespace Diet.Server.Models
{
	public class UserInfoModel
	{
		[JsonProperty("email")]
		public string Email { get; set; }
	}
}
