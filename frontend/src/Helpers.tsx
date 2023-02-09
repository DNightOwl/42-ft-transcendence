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

export function getProfile(getRes:any){
    axios.get("http://localhost:3000/profile", {
        withCredentials: true,
          headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
        }).then((res)=>{
            getRes(res.data) 
        })
}