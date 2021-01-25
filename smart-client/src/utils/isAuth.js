const isAuth = () => {
    const APItoken = localStorage.getItem('token');

    if(APItoken) {
        return true;
    } else {
        return false;
    }
}

export default isAuth;