import axios from './endPoint/smartBrain.endpoint';
import {toast} from 'react-toastify';

export const registerAPI = async (value) => {

    // console.error("Error response:");
    // console.error(err.response.data); 
    // console.error(err.response.status);  
    // console.error(err.response.headers); 

    try {
       const res = await axios().post('/register',value);
       return res.data;
    } catch (error) {
      toast.error(error);
      return;
    }  
        
}

export const LoginAPI = async (value) => {
 
    try {
         const res = await axios().post('/login',value);
         if(res.data.token) {
             localStorage.setItem('token', res.data.token);
             return res.data;
         } else {
             toast.error('Missing Token');
             return;
         }

    } catch (error) {
        toast.error(error);
        return;
        // const err = error.response.data;
        // if(err) {
        //     toast.error(err);
        //     return; 
        // }
        // return;
    }
}


// await axios({
//     url:'/register',
//     data:value
// }).then((result) => {
//     console.log(result);
//     return result.data;
// }).catch((error) =>{
//     console.log(error.response.data);
//     return error.response;
// });