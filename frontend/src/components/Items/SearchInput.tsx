import React from 'react'
import { SearchIcon } from './Icons'

interface typeprops{
  edit?:string
}

export default function SearchInput({edit}:typeprops){
    return(
        <div className="flex items-center rounded-md bg-body pl-2 mr-4">
        <SearchIcon edit="w-3.5 relative" />
        <input
          type="text"
          placeholder={`${!edit?"Search for member":edit}`}
          className="placeholder-secondary-text flex-1 bg-transparent py-3.5 px-3 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
        />
      </div>
    )
}