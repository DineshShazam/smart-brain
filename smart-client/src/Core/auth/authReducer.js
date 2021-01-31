import isAuth from '../../utils/isAuth'

export const AuthinitState = {
    token: null,
    userDetails: {},
    email: '',
    isLogged:false
}

const authReducer = (state=AuthinitState,action) => {

    switch(action.type) {
        case 'USERDETAILS' :
            return {
                ...state,
                userDetails: action.payload
            }

        case 'ISLOGGED' :
            const {isLogged} = isAuth();
            return {
                ...state,
                isLogged:isLogged
            }
        
        case 'GETTOKEN' :
            const {APItoken} = isAuth();
            return {
                ...state,
                token:APItoken
            }

        default :
            return state
    }
   
}

export default authReducer