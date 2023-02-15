import internal from "stream"

export interface typeobject{
    type: string
    message: string
  }
  export interface objectChannel{
    type: string
    message: string
    picture: string
  }
  export interface typeObject{
    id:string
    username:string
    status: string
    latestMessage: string | undefined
    picture: string
    conversation:typeobject[] ;
  }

  export interface chanel {
    id: string,
    name: string,
    members: number,
    latestMessage: string
    role: string,
    type: string,
    conversation: objectChannel[]
  }