import React from 'react'
import { useStateValue } from '../../Core/state';
import './imageDisplay.css'

const ImageDisplay = () => {

    const {state:{imageURL,imageBox,Celeb,DemoGraph}} = useStateValue();
    const {genderD,ageD} = DemoGraph;
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageURL} alt='' width='500px' height='auto' />
                {
                    (imageBox !== undefined) ? <div className='bounding-box' style={{top: imageBox?.top, right: imageBox?.right, bottom: imageBox?.bottom, left: imageBox?.left}}></div> : <></>
                }

                {
                    (Celeb !== '') ? <div className='celeb' style={{top: imageBox.top}}> <span>{Celeb.toUpperCase()}</span> </div> : <div></div>
                }

                {
                    (Object.keys(DemoGraph).length !== 0) ? <div className='celeb1' style={{top: imageBox.top}}> <span> {`${genderD.toUpperCase()},${ageD}`} </span> </div> : <div></div>
                }
            </div>
        </div>
    )
}

export default ImageDisplay


