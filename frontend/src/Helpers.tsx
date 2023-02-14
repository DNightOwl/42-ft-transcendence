import axios from 'axios';
import { Await } from 'react-router-dom';

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

export function checkTfa(){
  
}

export function checkTokenLogin(){

    axios.get("http://localhost:3000/profile", {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
        }).then(()=>{
            window.location.href = "http://localhost:3001/Home"
        }).catch(error=>{
            if(error.response.data.statusCode === 401)
            {
              axios.get("http://localhost:3000/auth/refresh", {
                withCredentials: true,
                headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
              }).then(()=>{
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
        })
}

export function getUsers(getRes:any){
  axios.get("http://localhost:3000/profile/AllUsers", {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
        getRes(res);
      })
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

export function editPicture(file:any){

  axios({
    method: "patch",
    data:file,
    headers: { "Content-Type": "multipart/form-data" },
    url: "http://localhost:3000/profile/upload-photo",
    withCredentials:true
  })
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