import axios from './endPoint/smartBrain.endpoint';

export const registerAPI = async (value) => {

    try {
      const {data} = await axios({
            url:'/register',
            data:value
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log(`RegisterAPI, $${error}`);
    }
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