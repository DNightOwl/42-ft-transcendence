import React,{useState} from 'react'
import { SearchIcon } from './Icons'

interface typeprops{
  edit?:string
  dataMembers?:any
  reset?:any
  setDataMembers?: React.Dispatch<React.SetStateAction<any>>;

}

export default function SearchInput({edit,dataMembers,setDataMembers,reset}:typeprops){
  const [value,setValue] = useState("");

    return(
        <div className="flex items-center rounded-md bg-body pl-2 mr-4">
        <SearchIcon edit="w-3.5 relative" />
        <input
          type="text"
          placeholder={`${!edit?"Search for member":edit}`}
          className="placeholder-secondary-text flex-1 bg-transparent py-3.5 px-3 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
          value={value}
          onChange={(e)=>{
            let value = e.currentTarget.value;
            let data:any = [];
            setValue(e.currentTarget.value)
            if(value.length)
            {
                data = dataMembers.filter((e:any)=>{
                    if(e.username.search(value) != -1){
                        return e;        
                    }
                })
                if(setDataMembers)
                  setDataMembers(data);
            }
            else
            {
              console.log(reset);
              
                data=reset;
                if(setDataMembers)
                  setDataMembers(data)
                
            }
            
            
        }}
        />
      </div>
    )
}