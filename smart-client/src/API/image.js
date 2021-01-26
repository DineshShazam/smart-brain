
import axios from './endPoint/smartBrain.endpoint';
import {toast} from 'react-toastify'

export const imageEntries =async(email,update) => {
    
    try {
        // const {data} = await axios({
        //                 url:'/imageEntries',
        //                 data:{
        //                     email,
        //                     update
        //                 }});

        const {data} = await axios().post('/imageEntries',{email,update})
        return data;
    } catch (error) {
        toast.error(error);
        return;
    }

}

export const clarifaiDropdown = async() => {
    
    try {
        const {data} = await axios().post('/clarifaiDropdown');
        return data;
    } catch (error) {
        toast.error(error);
        return;
    }

}