import { memo, useMemo } from 'react'

import Refresh from '@/assets/refresh.svg'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue
} from '@/components/ui/select'
import { SearchInput } from '@/components/custom/searchInput'

import { DeviceType, SortHDD } from '@/types'

type DevicesFilterProps = {
  filter: string
  onRefresh: () => void
  search: string
  sort: string
  updateParams: (key: string, value: string) => void
}

const SortLabel = {
  asc: 'Sort by: HDD Capacity (Ascending)',
  desc: 'Sort by: HDD Capacity (Descending)'
}

const DevicesFilter = memo(
  ({ search, filter, sort, updateParams, onRefresh }: DevicesFilterProps) => {
    const sortLabel = useMemo(() => {
      if (sort === SortHDD.ASC) return SortLabel.asc
      return SortLabel.desc
    }, [sort])

    const filterCapitalized = useMemo(() => {
      return filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()
    }, [filter])

    return (
      <div className="mb-4 flex flex-wrap gap-2">
        <SearchInput
          value={search}
          onChange={(value) => {}}
        />

        <Select
          defaultValue={filter}
          onValueChange={(value) => {}}
        >
          <SelectTrigger className="w-full sm:w-40 rounded border px-3 py-2">
            <SelectValue>{filterCapitalized}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Device Type: All</SelectItem>
            <SelectItem value={DeviceType.WINDOWS}>Windows</SelectItem>
            <SelectItem value={DeviceType.MAC}>Mac</SelectItem>
            <SelectItem value={DeviceType.LINUX}>Linux</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={sort}
          onValueChange={(value) => {}}
        >
          <SelectTrigger className="w-full sm:w-72 rounded border px-3 py-2">
            <SelectValue>{sortLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortHDD.DESC}>{SortLabel.desc}</SelectItem>
            <SelectItem value={SortHDD.ASC}>{SortLabel.asc}</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={onRefresh}
          variant="ghost"
          className="ml-auto hover:bg-transparent"
        >
          <img src={Refresh} alt="refresh-button" />
        </Button>
      </div>
    )
  }
)

DevicesFilter.displayName = 'DevicesFilter'

export { DevicesFilter }
