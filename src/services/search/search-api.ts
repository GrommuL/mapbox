import { AxiosError } from 'axios'

import { axiosInstance } from '@/config/axios-config'

export const fetchAutocompleteResultsBySearchValue = async (searchValue: string) => {
	try {
		const response = await axiosInstance.get('/search/geocode/v6/forward', {
			params: {
				q: searchValue
			}
		})

		return response.data
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log('Ошибка при получении AutocompleteResults', error.message)
			throw new Error('Ошибка при получении AutocompleteResults')
		} else if (error instanceof Error) {
			console.log('Ошибка при получении AutocompleteResults', error.message)
			throw new Error('Ошибка при получении AutocompleteResults')
		} else {
			console.log('Неизвестная ошибка при получении AutocompleteResults', error)
			throw new Error('Ошибка при получении AutocompleteResults')
		}
	}
}
