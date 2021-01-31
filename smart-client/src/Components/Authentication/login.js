import React from 'react'
import './login.scss'
import { NavLink, withRouter, useHistory } from 'react-router-dom'
import { registerAPI, LoginAPI } from '../../API/auth'
import { useStateValue } from '../../Core/state'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import useLoader from '../Loading&Notification/loadingHook'


const Login = ({ location }) => {
  // location.pathname
  const history = useHistory();
  const {authDispatch} = useStateValue();

  const [loading,showLoading,hideLoading] = useLoader()
  const { register, handleSubmit, errors } = useForm();

  const onLogin = async (data) => {
    showLoading();
    const res = await LoginAPI(data);
    if (!res) {
      hideLoading();
      return;
    }
    authDispatch({type:'ISLOGGED'})
    authDispatch({
      type: 'USERDETAILS',
      payload: res
    });
    hideLoading();
    history.push('/home');
  }

  const onRegister = async (Rdata) => {
    showLoading();
    const data = await registerAPI(Rdata);
    if (!data) { hideLoading(); 
                return }

      authDispatch({
      type: 'USERDETAILS',
      payload: data
    });
    hideLoading();
    toast.success('User Registered, Please login');
    history.push('/login');
  }


  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className='navhead'>
            <NavLink exact to='/login' activeClassName='navbar--active' className="active1"> Sign In </NavLink>
            <NavLink exact to='/register' activeClassName='navbar--active' className="active1">Sign Up </NavLink>
          </div>
          <br />
          <div className="fadeIn first">
            <img className="lockImage" src="https://images.vexels.com/media/users/3/131263/isolated/preview/af6816ec67ec51da6b275a4aa08d236c-lock-circle-icon-by-vexels.png" id="icon" alt="User Icon" />
          </div>


          {
            location.pathname === '/login' ?
              <form onSubmit={handleSubmit(onLogin)}>
                <input type="text" id="login" className="fadeIn second" name="email" ref={register({
                  required: {
                    value:true,
                    message:'Email Must!'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "*Invalid email address"
                  }
                }
                )} placeholder="email" />
                {/* displaying error message */}
                {
                  errors.email && <div className='validationBox'>{errors.email.message}</div>
                }

                <input type="password" id="password" className="fadeIn third" name="password" ref={register({ required: { value: true, message: 'Password Must' } })} placeholder="password" />
                {
                  errors.password && <div className='validationBox'>{errors.password.message}</div>
                }
                <br/>
                <input type='submit' className="fadeIn button-space" value='LOGIN' />
              </form>
              :
              <form onSubmit={handleSubmit(onRegister)}>
                <input type="text" id="login" className="fadeIn second" name="username" ref={register({ required: true })} placeholder="username" />
                {
                  errors.username && <div className='validationBox'>Please Enter UserName</div>
                }
                <input type="password" id="password" className="fadeIn third" name="password" ref={register({ required: true })} placeholder="password" />
                {
                  errors.password && <div className='validationBox'>'Please Enter Password</div>
                }
                <input type="email" id="password" className="fadeIn" name="email" ref={register({
                  required: {
                    value: true,
                    message: 'Please Enter Email'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })} placeholder="e-mail" />
                {
                  errors.email && <div className='validationBox'>{errors.email.message}</div>
                }
                <br/>
                <input type='submit' className="fadeIn button-space" value='REGISTER' />
              </form>


          }

          {/* <input type="submit" className="fadeIn fourth" value="Log In"/> */}

          {/* <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                  </div> */}

        </div>
      </div>
      {loading}
    </>
  )
}

export default withRouter(Login);