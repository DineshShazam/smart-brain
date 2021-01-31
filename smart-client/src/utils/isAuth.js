const isAuth = () => {
    const APItoken = localStorage.getItem('token');
    console.log(APItoken);
    if(APItoken) {
        return {
            APItoken,
            isLogged:true
        };
    } else {
        return {
            APItoken:null,
            isLogged:false
        };
    }
}

export default isAuth;