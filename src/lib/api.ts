import { Device } from '@/types'

const API_URL = import.meta.env.VITE_API_URL

export type UpsertDevice = Omit<Device, 'type' | 'id'> & {
  type: string
}

export const createDevice = async (
  newDevice: UpsertDevice
): Promise<any> => {
  const res = await fetch(`${API_URL}/devices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDevice)
  })
  if (!res.ok) throw new Error('Failed to create device')
  return res
}

export const updateDevice = async (
  id: string,
  updatedDevice: UpsertDevice
): Promise<any> => {
  const res = await fetch(`${API_URL}/devices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedDevice)
  })
  if (!res.ok) throw new Error('Failed to update device')
  return res
}

export const deleteDevice = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/devices/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to delete device')
}

export const fetchDevices = async (): Promise<any> => {
  const res = await fetch(`${API_URL}/devices`)
  if (!res.ok) throw new Error('Failed to fetch devices')
  return res
}
