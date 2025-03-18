export enum DeviceType {
  WINDOWS = 'WINDOWS',
  MAC = 'MAC',
  LINUX = 'LINUX'
}

export enum SortHDD {
  ASC = 'asc',
  DESC = 'desc'
}

export type Device = {
  hdd_capacity: string
  id: string
  system_name: string
  type: DeviceType
}
