import { memo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { DeleteDialog } from '@/components/custom/deleteDialog'
import { DevicesListItem } from './DevicesListItem'
import type { Device } from '@/types'
import { deleteDevice } from '@/lib/api'

type DevicesListProps = {
  devices: Device[]
  onEdit: (deviceId: string) => void
  onRefresh: () => void
  isLoading: boolean
}

const DevicesList = memo(
  ({ devices, onEdit, onRefresh, isLoading }: DevicesListProps) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deviceId, setDeviceId] = useState<string | null>(null)

    const mutation = useMutation({
      mutationFn: deleteDevice
    })
      
    if (isLoading) {
      return <h3 className="text-md leading-none font-medium">Loading ...</h3>
    }

    return (
      <>
        <div className="px-3 py-2 border-b border-strong-silver">
          <h2 className="text-sm leading-none font-medium">Device</h2>
        </div>
        <ul>
          {devices.map((device) => (
            <DevicesListItem
              key={device.id}
              item={device}
              onEdit={onEdit}
              onDelete={() => {}}
            />
          ))}
        </ul>
        <DeleteDialog
          isOpen={!!(deviceId && deleteDialogOpen)}
          onClose={() => {}}
          onConfirm={() => {}}
          title="Delete device?"
          description="You are about to delete the device. This action cannot be undone."
        />
      </>
    )
  }
)

DevicesList.displayName = 'DevicesList'

export { DevicesList }
