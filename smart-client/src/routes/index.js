// import {lazy} from 'react'
import Login from "../Components/Authentication/login";
import ImageUpload from "../Components/ImageUpload/imageUpload"
import RankEntries from "../Components/RankEntries/rankEntries"
// lazy loading import
// const LazyImageUpload = lazy(() => import("../Components/ImageUpload/imageUpload"));
// const LazyRankEntries = lazy(() => import("../Components/RankEntries/rankEntries"));

const routes = [
    {
        path:'/login', 
        component: Login,
        title: 'Login',
        needsAuth:false
    },
    { 
        path:'/register',
        component:Login,
        title: 'Register',
        needsAuth:false
    },
    { 
        path:'/home',
        component:ImageUpload,
        title: 'Home',
        needsAuth:true
    }
]

export default routes;