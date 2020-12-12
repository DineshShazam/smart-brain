import React from 'react'
import {toast} from 'react-toastify'

const useNotification = () => {

    return [
        (msg) => toast.success(msg),
        (msg) => toast.error(msg),
        (msg) => toast(msg)
    ]
}

export default useNotification