import BaseApi from './BaseApi';

export default class WeightsApi extends BaseApi {
	static async saveWeight(accessToken: string, date: string, weightInPounds: number) {
		const response = await fetch(`/api/weights/${date}`, {
			method: 'PUT',
			headers: super.getStandardHeaders(accessToken),
			body: JSON.stringify({ weightInPounds })
		});
		await super.checkStatus(response);
	}
}
