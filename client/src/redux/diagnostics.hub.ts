import { get } from './hub';
import { IHeartbeatModel } from '~/models';

const hub = {
	heartbeat: async (accessToken: string) => get<IHeartbeatModel>({
		endpoint: '/api/diagnostics/heartbeat',
		accessToken
	})
};

export default hub;
