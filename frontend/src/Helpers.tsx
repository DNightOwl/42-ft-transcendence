import axios from 'axios';
import { socket } from './context/socket';


const domain : string | undefined = process.env.REACT_APP_DOMAIN;

export function checkToken(){
    axios.get("http://"+domain+":3000/profile", {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': domain+':3000'} 
        }).then().catch(error=>{
            if(error.response.data.statusCode === 401)
            {
              axios.get("http://"+domain+":3000/auth/refresh", {
                withCredentials: true,
                headers :{'Access-Control-Allow-Origin': domain+':3000'}
              }).then().catch(()=>{
                window.location.href="http://"+domain+":3001/Login";
              });
            }
        });
}


export function checkTokenLogin(){

    axios.get("http://"+domain+":3000/profile", {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': domain+':3000'}
        }).then(()=>{
            socket.connect()
            window.location.href = "http://"+domain+":3001/Home"
        }).catch(error=>{
            if(error.response.data.statusCode === 401)
            {
              axios.get("http://"+domain+":3000/auth/refresh", {
                withCredentials: true,
                headers :{'Access-Control-Allow-Origin': domain+':3000'}
              }).then(()=>{
                  socket.connect()
                window.location.href = "http://"+domain+":3001/Home"
              }).catch();
            }
        });

}


export async function getUserData(getRes:any){
  for (let index = 0; index < 3; index++) {

   const val = await axios.get("http://"+domain+":3000/profile", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
        if(Object.keys(res.data).length)
        { getRes(res.data) 
          return true;
        }
        return false;
      }).catch(error => {
        if(error.response.data.statusCode === 401)
        {
          return false;
        }
      })

      if(val)
        break
  }
}

export function getUsers(getRes:any){
  axios.get("http://"+domain+":3000/profile/AllUsers", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
        getRes(res);
      }).catch()
}

export function addFriend(login:string){
  axios.post("http://"+domain+":3000/profile/addfreind",{login},{withCredentials: true}).then().catch()
}

export function unFriend(login:string){
  axios.delete(`http://${domain}:3000/profile/unfreind/${login}`,{withCredentials: true}).then().catch()
}

export function getFriends(getRes:any){
  axios.get("http://"+domain+":3000/profile/getfreind/", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
          getRes(res.data) 
      }).catch()
}

export function getFriendsUsers(getRes:any,login:string){
  axios.get(`http://${domain}:3000/profile/getfreindUser/${login}`, {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
          getRes(res.data) 
      }).catch()
}

export function blockFriend(login:string){
  axios.patch("http://"+domain+":3000/profile/blocked",{login},{withCredentials: true}).then().catch()
}

export function unblockFriend(login:string){
  axios.patch("http://"+domain+":3000/profile/unblocked",{login},{withCredentials: true}).then().catch()
}

export function editPicture(file: File){
  
  let fd :FormData = new FormData();
  fd.append('file',file)
  axios.patch("http://"+domain+":3000/profile/upload-photo",fd,{withCredentials:true}).then().catch()
}

export function editNickName(nickname:string){
  axios.patch("http://"+domain+":3000/profile/seting",{nickname},{withCredentials: true}).then().catch()
}

export function getAchievements(getRes:any,id:string){
  axios.post("http://"+domain+":3000/achievements",{id},{withCredentials: true}).then((res:any)=>{
    getRes(res)
  }).catch()
}

export function getConversations(getRes:any){
  axios.get("http://"+domain+":3000/rooms/DM", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
        getRes(res);
      }).catch()
}


export function getAllUsersDm(getRes:any){
  axios.get("http://"+domain+":3000/rooms/DMWithAllUsers", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res:any)=>{
        
        getRes(res);
      }).catch()
}

export function getAllChannels(getRes:any){
  axios.get("http://"+domain+":3000/rooms/allrooms", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res:any)=>{
        
        getRes(res);
      }).catch()
}


export function getChannelConversations(getRes:any){
  axios.get("http://"+domain+":3000/rooms/RoomMessage", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
        getRes(res);
      }).catch()
}

export function getQR(getRes:any){
  axios.post("http://"+domain+":3000/auth/generateqr",{},{withCredentials: true}).then((res:any)=>{
    getRes(res)
  }).catch()
}

export function confermQr(getRes:any,code:string){
axios.post("http://"+domain+":3000/auth/codeverification",{code:code},{withCredentials: true}).then((res:any)=>{
  getRes(res)
  }).catch((error)=>{
    getRes(error);
  })
}

export function checkTfa(){

  axios.post("http://"+domain+":3000/auth/enabletfa",{},{withCredentials: true}).then((res)=>{
    
  }).catch()
}

export function DisableQr(){

  axios.post("http://"+domain+":3000/auth/disabletfa",{},{withCredentials: true}).then((res:any)=>{
  }).catch()
}

export function CreateChannel(data:any){

  axios.post("http://"+domain+":3000/rooms/createroom",{data},{withCredentials: true}).then().catch()
}

export function getFriendChannel(getRes:any,nameChannel:string){

  axios.get(`http://${domain}:3000/rooms/FreindNotjoin/${nameChannel}`, {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
          getRes(res.data) 
      }).catch()
}

export function addFriendToChannel(data:any){

  axios.post("http://"+domain+":3000/rooms/addtoroom",{data},{withCredentials: true}).then().catch()
}

export function getMemberChannel(getRes:any,nameChannel:string){

  axios.get(`http://${domain}:3000/rooms/usersinroom/${nameChannel}`, {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
          getRes(res.data)
      }).catch()
}

export function logout(getRes:any){
  axios.get("http://"+domain+":3000/auth/logout",{withCredentials: true}).then((res)=>getRes(res)).catch((e)=>getRes(e))
}

export function validationQr(getRes:any,code:string){

  axios.post("http://"+domain+":3000/auth/tfaverification",{code:code},{withCredentials: true}).then((res:any)=>{
  getRes(res)
  }).catch((error)=>{
    getRes(error);
  });
}


export async function refreshToken(){
try
{
  await axios.get("http://"+domain+":3000/auth/refresh", {
    withCredentials: true,
    headers :{'Access-Control-Allow-Origin': domain+':3000'}
  }).then().catch(()=>{
    window.location.href="http://"+domain+":3001/Login";
  });
}
catch(error){
}
}

export function joinRoom(getRes:any,data:any){
  

  axios.post("http://"+domain+":3000/rooms/joinroom",{data},{withCredentials: true}).then((res)=>{
    getRes(res)
  }).catch()
}

export function leaveRoom(getRes:any,name:string){
  axios.post("http://"+domain+":3000/rooms/quiteRoom",{name},{withCredentials: true}).then((res)=>{
    getRes(res)
  }).catch()
}

export function deleteRoom(getRes:any,name:string){
  axios.delete(`http://${domain}:3000/rooms/Deleteroom/${name}`,{withCredentials: true}).then((res)=>{
    getRes(res)
  }).catch()
}

export function setAdmin(data:any){
  axios.post("http://"+domain+":3000/rooms/setadmins",{data},{withCredentials: true}).then().catch()
}

export function setMute(data:any){
  axios.patch("http://"+domain+":3000/rooms/muted",{data},{withCredentials: true}).then().catch()
}

export function setBlock(data:any){
  axios.patch("http://"+domain+":3000/rooms/ban",{data},{withCredentials: true}).then().catch()
}

export function setKick(data:any){
  axios.patch("http://"+domain+":3000/rooms/kick",{data},{withCredentials: true}).then().catch()
}


export function getMatchHistoryProfile(getRes:any){
  axios.get("http://"+domain+":3000/profile/matchhistorique/", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
          getRes(res.data) 
      }).catch()
}

export function getMachHistoryUser(getRes:any,login:string){

  axios.get(`http://${domain}:3000/profile/matchhistorique/${login}`, {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': domain+':3000'}
      }).then((res)=>{
          getRes(res.data) 
      }).catch()
}


