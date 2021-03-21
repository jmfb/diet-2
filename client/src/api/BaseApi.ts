export default class BaseApi {
	static async checkStatus(response: Response) {
		const { status, statusText } = response;
		if (status < 200 || status >= 300) {
			const error = await response.text();
			const errorMessage = `${status} - ${statusText}\n${error}`;
			throw new Error(errorMessage);
		}
	}

	static authHeader() {
		const token = localStorage.getItem('token');
		return `Token ${token}`;
	}
}
