import { memo, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { type Device, DeviceType } from '@/types'
import Dots from '@/assets/three-dots.svg'
import DeviceWindows from '@/assets/windows.svg'
import DeviceMac from '@/assets/apple.svg'
import DeviceLinux from '@/assets/linux.svg'

type DevicesListItem = {
  item: Device
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const DevicesListItem = memo(({ item, onEdit, onDelete }: DevicesListItem) => {
  const { id, system_name, type, hdd_capacity } = item
  const renderSystemImage = useMemo(() => {
    switch (type) {
      case DeviceType.WINDOWS:
        return DeviceWindows
      case DeviceType.MAC:
        return DeviceMac
      default:
        return DeviceLinux
    }
  }, [type])
  return (
    <li className="bg-mint-500 group flex items-center justify-between px-3 py-2 border-b border-soft-gray transition hover:bg-pale-gray">
      <div>
        <div className="flex items-center mb-1 gap-1">
          <img
            src={renderSystemImage}
            alt={`${system_name} ${type} logo`}
            className="size-4"
          />
          <span className="text-sm leading-none font-medium">
            {system_name}
          </span>
        </div>
        <span className="block text-sm leading-none text-muted-lavender">
          {type} - {hdd_capacity}
        </span>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="opacity-0 transition group-hover:opacity-100"
          >
            <img src={Dots} alt="more-button" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 p-0 bg-white border border-soft-gray overflow-hidden shadow-lg">
          <button
            onClick={() => onEdit(id)}
            className="flex w-full items-center px-3 py-2 text-sm leading-[1.5] hover:bg-light-silver cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="flex w-full items-center px-3 py-2 text-sm text-crimson-red leading-[1.5] hover:bg-light-silver cursor-pointer"
          >
            Delete
          </button>
        </PopoverContent>
      </Popover>
    </li>
  )
})

DevicesListItem.displayName = 'DevicesListItem'

export { DevicesListItem }
