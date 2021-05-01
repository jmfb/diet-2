import { get, put } from './hub';
import { IProfile } from '~/models';

const hub = {
	getProfile: async (accessToken: string) => get<IProfile>({
		endpoint: '/api/profile',
		accessToken
	}),
	setProfile: async (accessToken: string, profile: IProfile) => put({
		endpoint: '/api/profile',
		accessToken,
		body: profile
	})
};

export default hub;
