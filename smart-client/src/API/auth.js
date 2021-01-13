import axios from './smartBrain.endpoint';

export const registerAPI = (value) => {
    axios({
        url:'/register',
        data:value
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(`registerAPI error, ${error}`);
    })
}

export const loginAPI = async (value) => {
    try {
        const {data} = await axios({
            url:'/login',
            data:value
        });
        console.log(data);
        return data;      
    } catch (error) {
        console.log(`loginAPI, $${error}`);
    }
}