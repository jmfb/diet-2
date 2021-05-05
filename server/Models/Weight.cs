using System.Text.Json.Serialization;
using Amazon.DynamoDBv2.DataModel;

namespace Diet.Server.Models {
	[DynamoDBTable("diet-weights")]
	public class Weight {
		[JsonIgnore]
		[DynamoDBHashKey]
		public string UserId { get; set; }

		[DynamoDBRangeKey]
		public string Date { get; set; }

		[DynamoDBProperty]
		public decimal WeightInPounds { get; set; }
	}
}
