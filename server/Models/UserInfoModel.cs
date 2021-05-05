using System.Text.Json.Serialization;

namespace Diet.Server.Models {
	public class UserInfoModel {
		[JsonPropertyName("email")]
		public string Email { get; set; }
	}
}
