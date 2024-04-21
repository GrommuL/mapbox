import { Dispatch, SetStateAction, MouseEvent } from 'react'
import { HiLocationMarker } from 'react-icons/hi'

import { useFirstClick } from '@/hooks/use-first-click'

import type { Marker } from '@/types/marker-type'

type MarkerButtonProps = {
	marker: Marker
	setOpenDeleteModal: Dispatch<SetStateAction<boolean>>
}

export const MarkerButton = ({ marker, setOpenDeleteModal }: MarkerButtonProps) => {
	const { openEditCurrentMarkerInformation } = useFirstClick()

	const openDeleteModal = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.stopPropagation()
		setOpenDeleteModal(true)
	}

	return (
		<button
			className='translate-y-[6px] cursor-pointer bg-transparent text-primary'
			onClick={() => openEditCurrentMarkerInformation(marker)}
			onDoubleClick={openDeleteModal}
		>
			<HiLocationMarker size={40} />
		</button>
	)
}
