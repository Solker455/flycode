import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            messeage: '',
            auth: localStorage.token
        }
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }
    onLoginChange(e) {
        this.setState({
          email: e.target.value
        })
      }
      onPassChange(e) {
        this.setState({
          password: e.target.value
        })
      }
      async onSubmitLogin() {
              this.setState({
                messeage: ''
              })
              const url = 'https://test.flcd.ru/api/token';
              let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
              });

let result = await response.json();
if (response.ok) {
  this.setState({
    messeage: 'You have successfully logged in',
    classMesseage: 'alert-success'
  })
  localStorage.token = result.token;
  this.setState ({
    auth: localStorage.token
  })
} else {
    if (result.errors) {
    this.setState({
        messeage: result.errors,
        classMesseage: 'alert-danger'
      })
    }else{
        this.setState({
            messeage: result.message,
            classMesseage: 'alert-danger'
          })
    }
}
      }
    render() {
        if (this.state.auth === undefined) {
        return (
            <div className='form login'>
                <input onChange={this.onLoginChange} className="form-control" type="email" placeholder="Почта" required></input>
                <input onChange={this.onPassChange} className="form-control" type="password" placeholder="Пароль" required></input>
                <button className="btn btn-primary" type="submit" onClick={this.onSubmitLogin}>Вход</button>
                <div className={this.state.classMesseage}>{this.state.messeage}</div>
            </div>
        )
    }else{ return <Redirect to='/' />}
}
}