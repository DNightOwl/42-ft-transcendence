import axios from 'axios';
import { socket } from './context/socket';



export function checkToken(){
    axios.get("http://localhost:3000/profile", {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': 'localhost:3000'} 
        }).then().catch(error=>{
            if(error.response.data.statusCode === 401)
            {
              axios.get("http://localhost:3000/auth/refresh", {
                withCredentials: true,
                headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
              }).then().catch(()=>{
                window.location.href="http://localhost:3001/Login";
              });
            }
        });
}


export function checkTokenLogin(){

    axios.get("http://localhost:3000/profile", {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
        }).then(()=>{
          if(!socket.connected)
            socket.connect()
            window.location.href = "http://localhost:3001/Home"
        }).catch(error=>{
            if(error.response.data.statusCode === 401)
            {
              axios.get("http://localhost:3000/auth/refresh", {
                withCredentials: true,
                headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
              }).then(()=>{
                if(!socket.connected)
                  socket.connect()
                window.location.href = "http://localhost:3001/Home"
              });
            }
        });

}

export function getUserData(getRes:any){
    axios.get("http://localhost:3000/profile", {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
        }).then((res)=>{
            getRes(res.data) 
        }).catch()
}

export function getUsers(getRes:any){
  axios.get("http://localhost:3000/profile/AllUsers", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
        getRes(res);
      }).catch()
}

export function addFriend(login:string){
  axios.post("http://localhost:3000/profile/addfreind",{login},{withCredentials: true})
}

export function unFriend(login:string){
  axios.delete(`http://localhost:3000/profile/unfreind/${login}`,{withCredentials: true})
}

export function getFriends(getRes:any){
  axios.get("http://localhost:3000/profile/getfreind/", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
          getRes(res.data) 
      })
}

export function getFriendsUsers(getRes:any,login:string){
  axios.get(`http://localhost:3000/profile/getfreindUser/${login}`, {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
          getRes(res.data) 
      })
}

export function blockFriend(login:string){
  axios.patch("http://localhost:3000/profile/blocked",{login},{withCredentials: true})
}

export function unblockFriend(login:string){
  axios.patch("http://localhost:3000/profile/unblocked",{login},{withCredentials: true})
}

export function editPicture(file: File){
  
  let fd :FormData = new FormData();
  fd.append('file',file)
  axios.patch("http://localhost:3000/profile/upload-photo",fd,{withCredentials:true})
}

export function editNickName(nickname:string){
  axios.patch("http://localhost:3000/profile/seting",{nickname},{withCredentials: true})
}

export function getAchievements(getRes:any,id:string){
  axios.post("http://localhost:3000/achievements",{id},{withCredentials: true}).then((res:any)=>{
    getRes(res)
  })
}

export function getConversations(getRes:any){
  axios.get("http://localhost:3000/rooms/DM", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
        getRes(res);
      })
}


export function getAllUsersDm(getRes:any){
  axios.get("http://localhost:3000/rooms/DMWithAllUsers", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res:any)=>{
        
        getRes(res);
      })
}

export function getAllChannels(getRes:any){
  axios.get("http://localhost:3000/rooms/allrooms", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res:any)=>{
        
        getRes(res);
      })
}


export function getChannelConversations(getRes:any){
  axios.get("http://localhost:3000/rooms/RoomMessage", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
        getRes(res);
      })
}

export function getQR(getRes:any){
  axios.post("http://localhost:3000/auth/generateqr",{},{withCredentials: true}).then((res:any)=>{
    getRes(res)
  })
}

export function confermQr(getRes:any,code:string){

  axios.post("http://localhost:3000/auth/enabletfa",{code:code},{withCredentials: true}).then((res:any)=>{
  getRes(res)
  }).catch((error)=>{
    getRes(error);
  })
}

export function confermDisableQr(getRes:any,code:string){

  axios.post("http://localhost:3000/auth/disabletfa",{code:code},{withCredentials: true}).then((res:any)=>{
  getRes(res)
  }).catch((error)=>{
    getRes(error);
  })
}

export function CreateChannel(data:any){

  axios.post("http://localhost:3000/rooms/createroom",{data},{withCredentials: true})
}

export function getFriendChannel(getRes:any,nameChannel:string){

  axios.get(`http://localhost:3000/rooms/FreindNotjoin/${nameChannel}`, {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
          getRes(res.data) 
      })
}

export function addFriendToChannel(data:any){

  axios.post("http://localhost:3000/rooms/addtoroom",{data},{withCredentials: true})
}

export function getMemberChannel(getRes:any,nameChannel:string){

  axios.get(`http://localhost:3000/rooms/usersinroom/${nameChannel}`, {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
          getRes(res.data) 
      })
}

export function logout(getRes:any){
  axios.get("http://localhost:3000/auth/logout",{withCredentials: true}).then((res)=>getRes(res)).catch((e)=>getRes(e))
}

export function validationQr(getRes:any,code:string){

  axios.post("http://localhost:3000/auth/tfaverification",{code:code},{withCredentials: true}).then((res:any)=>{
  getRes(res)
  }).catch((error)=>{
    getRes(error);
  });
}


export async function refreshToken(){
try
{
  await axios.get("http://localhost:3000/auth/refresh", {
    withCredentials: true,
    headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
  }).then().catch(()=>{
    window.location.href="http://localhost:3001/Login";
  });
}
catch(error){
}
}

export function joinRoom(getRes:any,data:any){
  

  axios.post("http://localhost:3000/rooms/joinroom",{data},{withCredentials: true}).then((res)=>{
    getRes(res)
  }).catch()
}

export function leaveRoom(getRes:any,name:string){
  axios.post("http://localhost:3000/rooms/quiteRoom",{name},{withCredentials: true}).then((res)=>{
    getRes(res)
  }).catch()
}

export function deleteRoom(getRes:any,name:string){
  axios.delete(`http://localhost:3000/rooms/Deleteroom/${name}`,{withCredentials: true}).then((res)=>{
    getRes(res)
  }).catch()
}

export function setAdmin(data:any){
  axios.post("http://localhost:3000/rooms/setadmins",{data},{withCredentials: true}).then().catch()
}

export function setMute(data:any){
  axios.patch("http://localhost:3000/rooms/muted",{data},{withCredentials: true}).then().catch()
}

export function setBlock(data:any){
  axios.patch("http://localhost:3000/rooms/ban",{data},{withCredentials: true}).then().catch()
}