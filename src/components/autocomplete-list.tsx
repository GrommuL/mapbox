import { AutocompleteListItem } from '@/components/autocomplete-list-item'

import { getAutocompleteResults, getSearchError } from '@/store/selectors/search-selectors'

import { useAppSelector } from '@/hooks/use-app-selector'

export const AutocompleteList = () => {
	const autocompleteResults = useAppSelector(getAutocompleteResults)
	const searchError = useAppSelector(getSearchError)

	if (searchError) {
		return (
			<div className='absolute top-[45px] flex w-full flex-col items-center justify-center rounded-[8px] p-[20px] shadow-md'>
				<p className='text-[14px]'>No results</p>
			</div>
		)
	}

	return (
		<div className='absolute top-[45px] z-40 flex w-full flex-col rounded-[8px] bg-white shadow-md'>
			{autocompleteResults.map((autocompleteResultsItem) => (
				<AutocompleteListItem autocompleteItem={autocompleteResultsItem} key={autocompleteResultsItem.id} />
			))}
		</div>
	)
}
