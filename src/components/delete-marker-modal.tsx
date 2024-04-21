import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from './ui/button'

type DeleteMarkerModalProps = {
	markerName: string
	openDeleteModal: boolean
	handleDeleteMarker: () => void
}

export const DeleteMarkerModal = ({ handleDeleteMarker, openDeleteModal, markerName }: DeleteMarkerModalProps) => {
	return (
		<Dialog open={openDeleteModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{`Are you sure you want to delete ${markerName}?`}</DialogTitle>
					<DialogDescription>{`This action cannot be undone. This will permanently delete your ${markerName} marker.`}</DialogDescription>
				</DialogHeader>
				<DialogClose asChild>
					<Button onClick={handleDeleteMarker}>Delete marker</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	)
}
