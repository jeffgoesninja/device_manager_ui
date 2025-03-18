import { useMemo, useState, useCallback, useDeferredValue } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { fetchDevices } from '@/lib/api'
import { SortHDD } from '@/types'

import { DevicesForm } from './DevicesForm'
import { DevicesFilter } from './DevicesFilters'
import { DevicesList } from './DevicesList'

export default function DevicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const deferredSearch = useDeferredValue(search)
  const filter = searchParams.get('filter') || 'All'
  const sort = searchParams.get('sort') || SortHDD.DESC

  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deviceId, setDeviceId] = useState<string | null>(null)

  const {
    data: listDevices = [],
    isLoading,
    refetch
  } = useQuery({ queryKey: ['devices'], queryFn: fetchDevices })

  /* const filteredDevices = useMemo(() => {
  }, [])*/

  const handleOpenEditDevice = (deviceId: string) => {
    setDeviceId(deviceId)
    setFormDialogOpen(true)
  }

  const handleOpenFormDialog = () => {
    setFormDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDeviceId(null)
    setFormDialogOpen(false)
  }

  /*
    const updateParams = useCallback(
    (key: string, value: string) => {
    },
    []
  )
   */


  return (
    <>
      <Header />

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-medium leading-none">Devices</h1>
          <Button
            onClick={handleOpenFormDialog}
            variant="default"
            className="rounded px-4 py-2 text-white"
          >
            + Add device
          </Button>
        </div>

        <DevicesFilter
          search={search}
          filter={filter}
          sort={sort}
          updateParams={() => {}}
          onRefresh={refetch}
        />
        <DevicesList
          devices={listDevices}
          onEdit={handleOpenEditDevice}
          onRefresh={refetch}
          isLoading={isLoading}
        />
        <DevicesForm
          isOpen={formDialogOpen}
          onClose={handleCloseDialog}
          deviceId={deviceId}
        />
      </div>
    </>
  )
}
