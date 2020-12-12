import React,{useState} from 'react'
import {css} from "@emotion/core"
import {RingLoader} from 'react-spinners'

const useLoader = () => {
    
    const [loading,SetLoading] = useState(false);

    // const backgroundCSS = css`
    // position: fixed;
    // width: 100%;
    // height: 100%;
    // top: 0;
    // left: 0;
    // background: #f8f8f8ad;
    // `


    const loaderCSS = css`
    top: 30%;
    left: 48%;
    z-index: 1000;
    position: absolute;
`

    return [
        loading ? (<div style={{position:"fixed",width:'100%',height:'100%',top:0,left:0,background:'#f8f8f8ad'}}> <RingLoader loading={loading} css={loaderCSS} size={175} color='#ff66ff'/> </div>) : null ,
        () => SetLoading(true),
        () => SetLoading(false)
    ]
}

export default useLoader