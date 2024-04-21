import { useEffect } from 'react'

import { AutocompleteList } from '@/components/autocomplete-list'
import { SearchInput } from '@/components/search-input'

import { fetchAutocompleteResults } from '@/store/thunks/search-thunk'
import { getSearchValue } from '@/store/selectors/search-selectors'

import { useAppSelector } from '@/hooks/use-app-selector'
import { useAppDispatch } from '@/hooks/use-app-dispatch'

export const SearchPlaces = () => {
	const searchValue = useAppSelector(getSearchValue)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (searchValue.length) dispatch(fetchAutocompleteResults(searchValue))
	}, [searchValue])

	return (
		<div className='relative w-full'>
			<SearchInput />
			<AutocompleteList />
		</div>
	)
}
