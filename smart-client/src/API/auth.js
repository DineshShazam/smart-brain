import axios from './endPoint/smartBrain.endpoint';
import {toast} from 'react-toastify';

// export const UserLoad = () => {
//     // set localStorage
// }

export const registerAPI = async (value) => {

    // console.error("Error response:");
    // console.error(err.response.data); 
    // console.error(err.response.status);  
    // console.error(err.response.headers); 

    try {
       const res = await axios({url:'/register',data:value});
       return res.data;
    } catch (error) {
       const err = error.response.data;
       if(err) {
           toast.error(err);
           return;
       } 
       console.error(`Register Error,${error}`)
    }  
        
}

export const LoginAPI = async (value) => {
      
    try {
        
         const res = await axios.post('/login',value); 
         return res.data;

    } catch (error) {
        const err = error.response.data;
        if(err) {
            toast.error(err);
            return; 
        }
        return;
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