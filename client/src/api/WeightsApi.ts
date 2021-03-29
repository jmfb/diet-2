import BaseApi from './BaseApi';
import { IWeightModel } from '~/models';

export default class WeightsApi extends BaseApi {
	static async saveWeight(accessToken: string, date: string, weightInPounds: number) {
		const response = await fetch(`/api/weights/${date}`, {
			method: 'PUT',
			headers: super.getStandardHeaders(accessToken),
			body: JSON.stringify({ weightInPounds })
		});
		await super.checkStatus(response);
	}

	static async loadAllWeights(accessToken: string) {
		const response = await fetch('/api/weights', {
			headers: super.getStandardHeaders(accessToken)
		});
		await super.checkStatus(response);
		return await response.json() as IWeightModel[];
	}
}
