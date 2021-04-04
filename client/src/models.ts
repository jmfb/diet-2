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
