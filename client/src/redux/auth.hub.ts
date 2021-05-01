import { get } from './hub';
import { ISignedInModel } from '~/models';

const redirectUrl = `${location.origin}/authenticate`;

const hub = {
	getAuthenticationUrl: async () => get<string>({
		endpoint: '/api/authentication/url',
		query: { redirectUrl }
	}),
	signIn: async (authorizationCode: string) => get<ISignedInModel>({
		endpoint: '/api/authentication/sign-in',
		query: {
			redirectUrl,
			authorizationCode
		}
	})
};

export default hub;
