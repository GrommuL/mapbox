import axios from 'axios'

const BASE_URL = 'https://api.mapbox.com'

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	params: {
		proximity: 'ip',
		access_token: import.meta.env.VITE_MAPBOX_API_ACCESS_TOKEN
	}
})
