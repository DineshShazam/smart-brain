import axios from 'axios'
import {toast} from 'react-toastify'
// import {useHistory} from 'react-router-dom'

const AxiosInstance = () => {

    // const history = useHistory();

    const APItoken = localStorage.getItem('token');
    let token;
    if(APItoken) {
        token = APItoken;
    } else {
        token = null;
    }

    const baseUrl = 'https://smart-server-v1.herokuapp.com';

    // const baseUrl = 'http://localhost:4041'

    // creating Instance
    const Ainstance = axios.create({
        baseURL:baseUrl,
        method:'post',
    })

    // default API headers
    Ainstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Ainstance.defaults.headers.post['Content-Type'] = 'application/json';

    // request Interceptor
    Ainstance.interceptors.request.use((request) => {
        return request;
    },error => {
        return Promise.reject(error);
    });

    // response Interceptor
  Ainstance.interceptors.response.use(
      (response) => {
          return Promise.resolve(response);
      } ,
      (error) => {
          // client side error 
          if(!error.response) {
              return Promise.reject(error);
          }

          if(error.response.status === 401 || error.response.status === 403  || error.response.status === 500) {
                localStorage.removeItem('token');
                toast.error('Missing authorization');
                window.location = '/login';
          } else {
              return Promise.reject(error.response.data);
          }
      }
  )

  return Ainstance;

}





export default AxiosInstance