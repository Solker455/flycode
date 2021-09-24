import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';

function Logout() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"DELETE_TOKEN"})
    })
        return <Redirect to='/' />
}

export default Logout;