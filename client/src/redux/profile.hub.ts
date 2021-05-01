import { get, put } from './hub';
import { IProfile } from '~/models';

export async function getProfile(accessToken: string) {
	return await get<IProfile>({
		endpoint: '/api/profile',
		accessToken
	});
}

export async function setProfile(accessToken: string, profile: IProfile) {
	await put({
		endpoint: '/api/profile',
		accessToken,
		body: profile
	});
}
