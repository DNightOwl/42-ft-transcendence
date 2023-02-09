import React from 'react'
import { SearchIcon } from './Icons'

export default function SearchInput(){
    return(
        <div className="flex items-center rounded-md bg-body pl-2 mr-4">
        <SearchIcon edit="w-3.5 relative" />
        <input
          type="text"
          placeholder="Search for member"
          className="placeholder-secondary-text flex-1 bg-transparent py-3.5 px-3 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
        />
      </div>
    )
}