import { memo } from 'react'

import { Input } from '@/components/ui/input'
import Search from '@/assets/search.svg'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

const SearchInput = memo(({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative w-full sm:w-2xs">
      <img
        src={Search}
        alt="search-icon"
        className="absolute left-3 top-1/2 -translate-y-1/2"
      />
      <Input
        type="text"
        placeholder="Search"
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
})

SearchInput.displayName = 'SearchInput'

export default SearchInput
