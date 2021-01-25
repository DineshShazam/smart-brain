import React, { useState } from 'react'
import './login.scss'
import {NavLink,withRouter,useHistory} from 'react-router-dom'
import {registerAPI,LoginAPI} from '../../API/auth'
import { useStateValue } from '../../Core/state'


const Login = ({location}) => {
  // location.pathname
  const history = useHistory();
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  

  const [state,dispatch] = useStateValue();

  const onLogin = async (e) => {
    e.preventDefault();

    const valueL = {
      email,
      password
    }
  
    const res = await LoginAPI(valueL);
    if(!res) {
      return;
    }

    dispatch({
      type: 'USERDETAILS',
      payload: res
    });

    history.push('/home');  
  }

  const onRegister = async (e) => {
    e.preventDefault();

    const valueR = {
      name,
      password,
      email
    }

    const data = await registerAPI(valueR);
    if(!data) { return }

      dispatch({
        type:'USERDETAILS',
        payload: data
      });
      history.push('/home');    
  }


    return (
        <>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                  <div className='navhead'>
                    <NavLink exact to='/login' activeClassName='navbar--active' className="active1"> Sign In </NavLink>
                    <NavLink exact to='/register' activeClassName='navbar--active' className="active1">Sign Up </NavLink>
                  </div>
                  <br/>
                  <div className="fadeIn first">
                    <img className="lockImage" src="https://images.vexels.com/media/users/3/131263/isolated/preview/af6816ec67ec51da6b275a4aa08d236c-lock-circle-icon-by-vexels.png" id="icon" alt="User Icon" />
                  </div>
                  
                  <form>
                    {
                      location.pathname === '/login' ? 
                      <> 
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="email" onChange={(e) => {setEmail(e.target.value)}} required/>
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}} required/>
                        <button type='submit' className="fadeIn button-space" onClick={onLogin}>LOGIN</button>
                      </> 
                      : 
                      <>
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="username" onChange={(e) => {setName(e.target.value)}} required/>
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="password"  onChange={(e) => {setPassword(e.target.value)}} required/>
                        <input type="email" id="password" className="fadeIn" name="email" placeholder="e-mail"  onChange={(e) => {setEmail(e.target.value)}} required/>
                        <button type='submit' className="fadeIn button-space" onClick={onRegister}>REGISTER</button>
                      </>

                      
                    }
                    
                    {/* <input type="submit" className="fadeIn fourth" value="Log In"/> */}
                  </form>


                  {/* <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                  </div> */}

                </div>
            </div>

        </>
    )
}

export default withRouter(Login);