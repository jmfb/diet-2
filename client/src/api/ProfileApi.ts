import BaseApi from './BaseApi';
import { IProfile } from '~/models';

export default class ProfileApi extends BaseApi {
	static async getProfile(accessToken: string) {
		const response = await fetch('/api/profile', {
			headers: super.getStandardHeaders(accessToken)
		});
		await super.checkStatus(response);
		return await response.json() as IProfile;
	}

	static async setProfile(accessToken: string, profile: IProfile) {
		const response = await fetch('/api/profile', {
			method: 'PUT',
			headers: super.getStandardHeaders(accessToken),
			body: JSON.stringify(profile)
		});
		await super.checkStatus(response);
	}
}
