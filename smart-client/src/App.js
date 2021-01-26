import React,{useEffect} from 'react';
import './App.css';
import Navbar from './Components/Navigation/navbar';
// import RankEntries from './Components/RankEntries/rankEntries'
import Particles from 'react-particles-js';
import {ToastContainer,Flip} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Route,Switch,useHistory,Redirect,withRouter} from 'react-router-dom'
import routes from './routes';


const RenderRoute = (route) => {
  const history = useHistory();
  console.log(route.component);
  console.log(route);

  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} />}
    ></Route>
  )

}

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
        {
          routes?.map((route,index) => (
              <RenderRoute {...route} key={index} />
          ))
        }
        
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
