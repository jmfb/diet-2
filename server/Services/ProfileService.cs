using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Diet.Server.Models;
using Amazon.DynamoDBv2.DataModel;

namespace Diet.Server.Services
{
	public interface IProfileService
	{
		bool TryValidate(Profile profile, out string errorMessage);
		Task SaveAsync(Profile profile, CancellationToken cancellationToken);
		Task<Profile> GetAsync(string userId, CancellationToken cancellationToken);
	}

	public class ProfileService : IProfileService
	{
		private DynamoDBContext Context { get; }

		public ProfileService(DynamoDBContext context)
		{
			Context = context;
		}

		public bool TryValidate(Profile profile, out string errorMessage)
		{
			if (profile == null)
			{
				errorMessage = "Profile was null.";
				return false;
			}

			if (string.IsNullOrEmpty(profile.UserId))
			{
				errorMessage = "UserId is required.";
				return false;
			}

			if (profile.TargetWeightInPounds != null)
			{
				if (profile.TargetWeightInPounds.Value <= 0)
				{
					errorMessage = "Weight in pounds must be positive and non-zero.";
					return false;
				}

				if (profile.TargetWeightInPounds.Value > 2000)
				{
					errorMessage = "No human being should ever weight more than 1-ton.";
					return false;
				}
			}

			if (profile.BirthDate != null)
			{
				if (!DateTime.TryParse(profile.BirthDate, out var parsedDate))
				{
					errorMessage = "Invalid date.";
					return false;
				}

				if (parsedDate.ToString("yyyy-MM-dd") != profile.BirthDate)
				{
					errorMessage = "Invalid date format.";
					return false;
				}

				if (parsedDate > DateTime.Now)
				{
					errorMessage = "Nobody from the future is allowed to use this site.";
					return false;
				}

				if (parsedDate < DateTime.Now.AddYears(-200))
				{
					errorMessage = "Nobody more than 200 years old is allowed to use this site.";
					return false;
				}
			}

			if (profile.HeightInInches != null)
			{
				if (profile.HeightInInches.Value <= 0)
				{
					errorMessage = "Height in inches must be positive and non-zero.";
					return false;
				}

				if (profile.HeightInInches.Value > 12 * 10)
				{
					errorMessage = "Height in inches must not exceed ten feet.";
					return false;
				}
			}

			if (profile.Gender != null)
			{
				if (profile.Gender.Value != 0 && profile.Gender.Value != 1)
				{
					errorMessage = "Only male and female genders are supported.";
					return false;
				}
			}

			errorMessage = string.Empty;
			return true;
		}

		public async Task SaveAsync(Profile profile, CancellationToken cancellationToken)
		{
			await Context.SaveAsync(profile, cancellationToken);
		}

		public async Task<Profile> GetAsync(string userId, CancellationToken cancellationToken)
		{
			var profile = await Context.LoadAsync<Profile>(userId, cancellationToken);
			return profile ?? new Profile { UserId = userId };
		}
	}
}
