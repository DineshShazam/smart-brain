import React, { useState } from 'react'
import './login.scss'
import {NavLink,withRouter,useHistory} from 'react-router-dom'
import {registerAPI,loginAPI} from '../../API/auth'


const Login = ({location}) => {
  // location.pathname
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();

    const valueL = {
      email,
      password
    }
    const data = await loginAPI(valueL);
    const {name} = data;
    if(name) {
      history.push('/home');
    } else {
      return;
    }
  }

  const onRegister = (e) => {
    e.preventDefault();

    const valueR = {
      name,
      password,
      email
    }

    const data = registerAPI(valueR);
    console.log(data);
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
                    <img src="https://webstockreview.net/images/clipart-brain-animated-14.png" id="icon" alt="User Icon" />
                  </div>
                  <br/>
                
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