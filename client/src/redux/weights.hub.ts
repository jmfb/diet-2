import { get, put } from './hub';
import { IWeightModel } from '~/models';

const hub = {
	saveWeight: async (accessToken: string, date: string, weightInPounds: number) => put({
		endpoint: `/api/weights/${date}`,
		accessToken,
		body: { weightInPounds }
	}),
	loadAllWeights: async (accessToken: string) => get<IWeightModel[]>({
		endpoint: '/api/weights',
		accessToken
	})
};

export default hub;
