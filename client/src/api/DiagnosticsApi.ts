import BaseApi from './BaseApi';
import { IHeartbeatModel } from '~/models';

export default class DiagnosticsApi extends BaseApi {
	static async heartbeat(accessToken: string) {
		const response = await fetch('/api/diagnostics/heartbeat', {
			headers: super.getStandardHeaders(accessToken)
		});
		await super.checkStatus(response);
		return await response.json() as IHeartbeatModel;
	}
}
