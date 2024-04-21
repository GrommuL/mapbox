import { ChangeEvent, KeyboardEvent } from 'react'
import { IoMdClose } from 'react-icons/io'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useAppDispatch } from '@/hooks/use-app-dispatch'
import { useAppSelector } from '@/hooks/use-app-selector'

import { getSearchValue } from '@/store/selectors/search-selectors'
import { searchActions } from '@/store/slices/search-slice'

export const SearchInput = () => {
	const dispatch = useAppDispatch()
	const searchValue = useAppSelector(getSearchValue)

	const { setSearchValue, resetSearchValue } = searchActions

	const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const trimmedSearchInputValue = event.target.value.trimStart()
		dispatch(setSearchValue(trimmedSearchInputValue))
	}

	const handleSearchInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Escape') {
			dispatch(resetSearchValue())
		}
	}

	const clearSearchValue = () => {
		dispatch(resetSearchValue())
	}

	return (
		<div className='relative'>
			<Input
				className='pr-[40px] placeholder:text-[14px]'
				placeholder='Введите адрес или местоположение'
				value={searchValue}
				onChange={handleSearchInputChange}
				onKeyDown={handleSearchInputKeydown}
			/>
			{searchValue.length > 0 && (
				<Button className='absolute right-[8px] top-[8px] h-[24px] w-[24px] rounded-full' size='icon' onClick={clearSearchValue}>
					<IoMdClose size={16} />
				</Button>
			)}
		</div>
	)
}
