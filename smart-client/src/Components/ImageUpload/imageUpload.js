import React, { useState,useEffect } from 'react'
import './imageUpload.css'
import ImageDisplay from '../DisplayImage/imageDisplay'
import Clarifai from 'clarifai'
import {FormControl,Select,MenuItem} from '@material-ui/core'
import {imageDetect} from '../../utils/imageDetection'
import {useStateValue} from '../../Core/state';
import {toast} from 'react-toastify'
import useLoader from '../Loading&Notification/loadingHook.js'
import {imageEntries,clarifaiDropdown} from '../../API/image'
import RankEntries from '../RankEntries/rankEntries'


const ImageUpload = () => {

    const [{imageURL,userDetails},dispatch] = useStateValue();
    const [mValue,setMvalue] = useState('Choose Options');

    // Custom Hook
    const [loader,showLoader,hideLoader] = useLoader();
    // Clarifai.FACE_DETECT_MODEL,Clarifai.CELEBRITY_MODEL,
    // Clarifai.DEMOGRAPHICS_MODEL,Clarifai.FOOD_MODEL

    const [dropdownType,setDropdownType] = useState([]);
    const app = new Clarifai.App({
        apiKey: 'bdd12b71f8c149468592c8059018a545'
    })

    let userDetBool = false;
    (userDetails !== {}) ? (userDetBool = true) : (userDetBool = false);
    console.log(userDetBool);
    useEffect(() => {
        (async () => {
            setDropdownType(await clarifaiDropdown());           
        })();
       toast.success(`Welcome ${userDetails.name}`);
    },[])

    const onChange = (e) => {
        e.preventDefault();
        dispatch({
            type: 'IMAGE_URL',
            payload: e.target.value
        });
        dispatch({
            type:'EMPTY_VALUE'
        })
        setMvalue('Choose Options')
    }

    const onSubmit = (e) => {
        dispatch({
            type:'EMPTY_VALUE'
        })
        // set the dropdown value to state 'setMvalue'
        // get the image URL and send it to clarifai and get the response 
        // send the url to <ImageDisplay Component>
        if(!imageURL) {
            alert('Please add the Image URL and choose the options');
            setMvalue('Choose Options')
        } else {
            e.preventDefault()
            const dropdownValue = e.target.value;
            setMvalue(dropdownValue);
        }
        
    }

    const entriesCount = async(email,update) => {
      const count = await imageEntries(email,update);
      if(!count) {return};
      dispatch({
          type:'ENTRIESDETAILS',
          payload: count
      })  
    }

    useEffect(() => {
        if(mValue === 'Choose Options') {
            return;
        } else {

            switch (mValue) {
                case 1:
                    showLoader();
                   app.models.predict(
                       Clarifai.FACE_DETECT_MODEL,
                       imageURL
                   ).then((response) => {
                        const faceBox = imageDetect(response,mValue);
                        dispatch({
                            type:'BOUNDING_BOX',
                            payload: faceBox
                        })
                        entriesCount(userDetails.email,1);
                        hideLoader();   
                   }).catch((err) => {
                        hideLoader();
                       toast.error('Unable to Reach API');
                   })
                   break;
                case 2:
                    showLoader();
                    app.models.predict(
                        Clarifai.CELEBRITY_MODEL,
                        imageURL
                    ).then((response) => {
                         const {bounding_box1,celeb} = imageDetect(response,mValue);
                         dispatch({
                            type:'BOUNDING_BOX',
                            payload: bounding_box1
                        })
                         const {name} = celeb;
                         dispatch({
                             type:'CELEBIRITY',
                             payload:name
                         })
                         entriesCount(userDetails.email,1);
                         hideLoader();
                    }).catch((err) => {
                        hideLoader();
                        toast.error('Unable to Reach API');
                    })
                    break;
                case 3:
                    showLoader();
                    app.models.predict(
                        Clarifai.DEMOGRAPHICS_MODEL,
                        imageURL
                    ).then((response) => {
                         const {bounding_Box2,age,gender} = imageDetect(response,mValue);
                         const ageD = age[0].name;
                         const genderD = gender[0].name;

                         dispatch({
                             type:'BOUNDING_BOX',
                             payload: bounding_Box2
                         })
        
                         dispatch({
                             type:'DEMOGRAPHICS',                            
                             payload: {ageD,genderD}
                         })
                         entriesCount(userDetails.email,1);
                         hideLoader();
                    }).catch((err) => {
                        hideLoader();
                        toast.error('Unable to Reach API');
                    })
                    break;
                // case 4:
                //     app.models.predict(
                //         Clarifai.FOOD_MODEL,
                //         imageURL
                //     ).then((response) => {
                    
                //     }).catch((err) => {
                //         alert('Unable to Reach API');
                //         console.log(new Error(err));
                //     })
                //     break;
                default:
                    
                    break;
            }
    
        }
      
        
    },[mValue])

    return (
        <>
        <RankEntries/>
        <div>
             <p className='f3'>
               {'This Magic Brain will detect faces in your pictures. Git it a try.'}
            </p>
            <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' name='imageURL' onChange={(e) => {onChange(e)}} autoComplete="off" required/>
                {/* <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' type='submit' onClick={onSubmit}>Detect</button> */}
                <FormControl className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>
                    <Select variant='outlined' value={mValue} onChange={onSubmit}>
                        <MenuItem value='Choose Options'>Choose Options</MenuItem>
                        {
                            dropdownType?.map(({id,display,value}) => (
                                <MenuItem key={id} value={value}>{display}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            </div>
        </div>

        <ImageDisplay />
        {/* <RingLoader /> */}
        {loader}
        </>
    )
}


export default ImageUpload
