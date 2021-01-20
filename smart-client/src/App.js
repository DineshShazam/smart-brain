import React,{useEffect} from 'react';
import './App.css';
import Navbar from './Components/Navigation/navbar';
import ImageUpload from './Components/ImageUpload/imageUpload'
import Login from './Components/Authentication/login'
import RankEntries from './Components/RankEntries/rankEntries'
import Particles from 'react-particles-js';
import {ToastContainer,Flip} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom'


function App({history}) {

  // Restricting back Navigation
  useEffect(() => {
    window.addEventListener("popstate", () => {
      history.go(1);
    });
  },[])

  const particlesOptions = {
    particles: {
      number: {
        value: 70,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }

  return (
    <div className="App">
      <Particles params={particlesOptions} className='particles'/>
      <Navbar />
      {/* <Logo /> */}
      {/* Rank Component */}
      <Switch>
        <Redirect exact from='/' to='/login' />
        <Route exact path='/home' render={() => 
          <>
            <RankEntries/>
            <ImageUpload/>
          </>
        }/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Login} />
        {/* <Route exact path='/login'><Login /></Route>
        <Route exact path='/register'><Login /></Route>
        <Route exact path='/home'><ImageUpload /></Route> */}
        
      </Switch>


      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      transition={Flip}
      />

    </div>
  );
}

export default withRouter(App);
