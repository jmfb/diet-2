import { get, put } from './hub';
import { IWeightModel } from '~/models';

export async function loadAllWeights(accessToken: string) {
	return await get<IWeightModel[]>({
		endpoint: '/api/weights',
		accessToken
	});
}

export async function saveWeight(accessToken: string, date: string, weightInPounds: number) {
	await put({
		endpoint: `/api/weights/${date}`,
		accessToken,
		body: { weightInPounds }
	});
}
