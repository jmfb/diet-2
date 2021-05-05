using System.Text.Json.Serialization;
using Amazon.DynamoDBv2.DataModel;

namespace Diet.Server.Models {
	[DynamoDBTable("diet-profiles")]
	public class Profile {
		[JsonIgnore]
		[DynamoDBHashKey]
		public string UserId { get; set; }

		[DynamoDBProperty]
		public decimal? TargetWeightInPounds { get; set; }

		[DynamoDBProperty]
		public string BirthDate { get; set; }

		[DynamoDBProperty]
		public decimal? HeightInInches { get; set; }

		[DynamoDBProperty]
		public int? Gender { get; set; }
	}
}
