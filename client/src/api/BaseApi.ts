export default class BaseApi {
	static async checkStatus(response: Response) {
		const { status, statusText } = response;
		if (status < 200 || status >= 300) {
			const error = await response.text();
			const errorMessage = `${status} - ${statusText}\n${error}`;
			throw new Error(errorMessage);
		}
	}

	static getStandardHeaders(accessToken?: string) {
		return {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...accessToken === undefined ?
				{} :
				{ Authorization: `Bearer ${accessToken}` }
		};
	}
}
