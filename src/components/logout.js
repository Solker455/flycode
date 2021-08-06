import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';

export default class Logout extends React.Component {
    constructor() {
        super()
        this.state = {
            auth: localStorage.token
        }
    }

    componentDidMount() {
        localStorage.clear();
        this.setState ({
            auth: localStorage.token
        })
    }
    render() {
        return (<Redirect to='/'/>)
    }
}