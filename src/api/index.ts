import {ApiResponse} from "../types.ts";

class Api {
	private readonly url = import.meta.env.VITE_API_URL;

	/**
	 * Fetches user data from the API for a specific page.
	 *
	 * @param {number} [page=1] - The page number to fetch. Defaults to 1.
	 * @param {number} [results=10] - The returning results size to fetch. Defaults to 10.
	 * @returns {Promise<ApiResponse>} - A promise that resolves to the user data.
	 *
	 * @throws Will log an error to the console if the fetch request fails.
	 *
	 * @description
	 * Makes an API call to retrieve a list of users for the specified page.
	 * The results are limited to 10 users per request. In case of an error,
	 * it catches the error and logs it to the console.
	 */
	public async getUsers(page = 1, results = 10): Promise<ApiResponse> {
		try {
			const response = await fetch(`${this.url}?page=${page}&results=${results}`);
			const data = await response.json() as Promise<ApiResponse>;
			return data
		} catch(error) {
			console.log(error);
		}
	}
}


export const api = new Api();