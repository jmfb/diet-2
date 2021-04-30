export interface IErrorReport {
	action: string;
	context: string;
	message: string;
}

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

interface IWeightCategoryMetadata {
	name: string;
	upperBoundBodyMassIndex: number;
}

type IWeightCategories = {
	[K in WeightCategory]: IWeightCategoryMetadata;
};

export const weightCategories: IWeightCategories = {
	[WeightCategory.SevereThinness]: {
		name: 'Severe Thinness',
		upperBoundBodyMassIndex: 16
	},
	[WeightCategory.ModerateThinness]: {
		name: 'Moderate Thinness',
		upperBoundBodyMassIndex: 17
	},
	[WeightCategory.MildThinness]: {
		name: 'Mild Thinness',
		upperBoundBodyMassIndex: 18.5
	},
	[WeightCategory.Normal]: {
		name: 'Normal',
		upperBoundBodyMassIndex: 25
	},
	[WeightCategory.Overweight]: {
		name: 'Overweight',
		upperBoundBodyMassIndex: 30
	},
	[WeightCategory.ObeseClass1]: {
		name: 'Obese Class I',
		upperBoundBodyMassIndex: 35
	},
	[WeightCategory.ObeseClass2]: {
		name: 'Obese Class II',
		upperBoundBodyMassIndex: 40
	},
	[WeightCategory.ObeseClass3]: {
		name: 'Obese Class III',
		upperBoundBodyMassIndex: Number.MAX_VALUE
	}
};
