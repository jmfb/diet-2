export interface IIndexModel {
	bundleVersion: string;
}

export interface ISignedInModel {
	accessToken: string;
	email: string;
}

export interface IHeartbeatModel {
	bundleVersion: string;
}

export interface IWeightModel {
	date: string;
	weightInPounds: number;
}

export enum Gender {
	Male = 0,
	Female = 1
}

export interface IProfile {
	targetWeightInPounds?: number;
	birthDate?: string;
	gender?: Gender;
	heightInInches?: number;
}

export enum WeightCategory {
	SevereThinness = 0,
	ModerateThinness = 1,
	MildThinness = 2,
	Normal = 3,
	Overweight = 4,
	ObeseClass1 = 5,
	ObeseClass2 = 6,
	ObeseClass3 = 7
}

export const weightCategoryNames = {
	[WeightCategory.SevereThinness]: 'Severe Thinness',
	[WeightCategory.ModerateThinness]: 'Moderate Thinness',
	[WeightCategory.MildThinness]: 'Mild Thinness',
	[WeightCategory.Normal]: 'Normal',
	[WeightCategory.Overweight]: 'Overweight',
	[WeightCategory.ObeseClass1]: 'Obese Class I',
	[WeightCategory.ObeseClass2]: 'Obese Class II',
	[WeightCategory.ObeseClass3]: 'Obese Class III'
};

export const weightCategoryExclusiveUpperBound = {
	[WeightCategory.SevereThinness]: 16,
	[WeightCategory.ModerateThinness]: 17,
	[WeightCategory.MildThinness]: 18.5,
	[WeightCategory.Normal]: 25,
	[WeightCategory.Overweight]: 30,
	[WeightCategory.ObeseClass1]: 35,
	[WeightCategory.ObeseClass2]: 40,
	[WeightCategory.ObeseClass3]: Number.MAX_VALUE
};
