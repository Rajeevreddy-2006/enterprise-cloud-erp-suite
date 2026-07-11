import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

api.interceptors.response.use(

response=>response,

async(error)=>{

const originalRequest=

error.config;

if(

error.response?.status===401 &&

!originalRequest._retry

){

originalRequest._retry=true;

try{

console.log(

"Refreshing..."

);

const refreshToken=

localStorage.getItem(

"refreshToken"

);

const response=

await axios.post(

`${import.meta.env.VITE_API_URL}/auth/refresh`,

{

refreshToken

}

);

const accessToken=

response.data

.data

.accessToken;

console.log(

"new token"

);

localStorage.setItem(

"accessToken",

accessToken

);

originalRequest.headers.Authorization=

`Bearer ${accessToken}`;

return api(

originalRequest

);

}

catch(err){

console.log(

"refresh failed"

);

console.log(

err

);

localStorage.clear();

window.location.href=

"/login";

}

}

return Promise.reject(error);

}

);

export default api;