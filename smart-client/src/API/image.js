
import axios from './endPoint/smartBrain.endpoint';
import {toast} from 'react-toastify'

export const imageEntries =async(email,update) => {
    
    try {
        const {data} = await axios({
                        url:'/imageEntries',
                        data:{
                            email,
                            update
                        }});
        return data;
    } catch (error) {
        const err = error.response.data;
        if(err) {
            toast.error(err);
            return
        }
    }

}

export const clarifaiDropdown = async() => {
    
    try {
        const {data} = await axios({url:'/clarifaiDropdown'});
        return data;
    } catch (error) {
        const err = error.response.data;
        if(err) {
            toast.error(err);
            return
        }
    }

}