using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Diet.Server.Models;
using Amazon.DynamoDBv2.DataModel;

namespace Diet.Server.Services
{
	public interface IWeightsService
	{
		bool TryValidate(Weight weight, out string errorMessage);
		Task SaveAsync(Weight weight, CancellationToken cancellationToken);
		Task<IList<Weight>> LoadAllAsync(string userId, CancellationToken cancellationToken);
	}

	public class WeightsService : IWeightsService
	{
		private DynamoDBContext Context { get; }

		public WeightsService(DynamoDBContext context)
		{
			Context = context;
		}

		public bool TryValidate(Weight weight, out string errorMessage)
		{
			if (!DateTime.TryParse(weight.Date, out var parsedDate))
			{
				errorMessage = "Invalid date.";
				return false;
			}
			if (parsedDate.ToString("yyyy-MM-dd") != weight.Date)
			{
				errorMessage = "Invalid date format.";
				return false;
			}
			if (weight.WeightInPounds <= 0)
			{
				errorMessage = "Weight in pounds must be positive and non-zero.";
				return false;
			}
			if (weight.WeightInPounds > 2000)
			{
				errorMessage = "No human being should ever weight more than 1-ton.";
				return false;
			}
			errorMessage = string.Empty;
			return true;
		}

		public async Task SaveAsync(Weight weight, CancellationToken cancellationToken)
		{
			await Context.SaveAsync(weight, cancellationToken);
		}

		public async Task<IList<Weight>> LoadAllAsync(string userId, CancellationToken cancellationToken)
		{
			return await Context.QueryAsync<Weight>(userId).GetRemainingAsync(cancellationToken);
		}
	}
}
