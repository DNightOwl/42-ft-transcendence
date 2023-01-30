export interface typeobject{
    type: string
    message: string
  }
  export interface typeObject{
    id:string
    username:string
    latestMessage: string | undefined
    conversation:typeobject[] ;
  }