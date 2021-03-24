import BaseApi from './BaseApi';
import { ISignedInModel } from '~/models';
import queryString from 'query-string';

const redirectUrl = `${location.origin}/authenticate`;

export default class AuthApi extends BaseApi {
	static async getAuthenticationUrl() {
		const query = queryString.stringify({ redirectUrl });
		const response = await fetch(`/api/authentication/url?${query}`, {
			headers: {
				Accept: 'application/json'
			}
		});
		await super.checkStatus(response);
		return await response.json() as string;
	}

	static async signIn(authorizationCode: string) {
		const query = queryString.stringify({
			redirectUrl,
			authorizationCode
		});
		const response = await fetch(`/api/authentication/sign-in?${query}`, {
			headers: {
				Accept: 'application/json'
			}
		});
		await super.checkStatus(response);
		return await response.json() as ISignedInModel;
	}
}
