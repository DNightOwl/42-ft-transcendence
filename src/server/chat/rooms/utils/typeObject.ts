import internal from "stream"

export interface typeobject{
    type: string
    message: string
  }
  export interface typeObject{
    id:string
    username:string
    status: string
    latestMessage: string | undefined
    conversation:typeobject[] ;
  }

  export interface chanel {
    id: string,
    name: string,
    members: number,
    latestMessage: string
    role: string,
    conversation: typeobject[]
  }