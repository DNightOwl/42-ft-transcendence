import axios from 'axios';

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
  console.log("login: ",login);
  
  axios.get(`http://localhost:3000/profile/getfreindUser/${login}`, {
      withCredentials: true,
        headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
      }).then((res)=>{
  console.log("res: ",res);
          getRes(res.data) 
      })
}