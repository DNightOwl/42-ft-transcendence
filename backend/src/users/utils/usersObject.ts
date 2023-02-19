export interface usersObject {
    id: string
    username:string
    status: string
    pictureLink: string
    freind: string
    blocked: string
    NumberofFreinds: number
}

export interface profileObject {
    id: string
    nickname:string
    status: string
    pictureLink: string
    freind: string
    blocked: string
    NumberofFreinds: number
    tofactor: boolean
}

export interface Objectgame {
    id: string
    username:string
    pictureLink: string
    state: string
    date: string
    score: string
    NumberofWins: number
    NumberofLoses: number
  }