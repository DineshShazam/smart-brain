
import axios from './endPoint/smartBrain.endpoint';

export const imageEntries =async(email,update) => {
    
    try {
        const {data} = await axios({
                        url:'/imageEntries',
                        data:{
                            email,
                            update
                        }});
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }

}

export const clarifaiDropdown = async() => {
    // axios({url:'/clarifaiDropdown'}).then(({data}) => {
    //     console.log(data);
    //     return data;
    // }).catch((err) => console.log(err));
    
    try {
        const {data} = await axios({url:'/clarifaiDropdown'});
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }

}