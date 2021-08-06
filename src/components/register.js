import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      messeage: '',
      classMesseage: '',
      auth: localStorage.token
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmationChange = this.onPasswordConfirmationChange.bind(this);
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  onEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  onPasswordConfirmationChange(e) {
    this.setState({
      password_confirmation: e.target.value
    })
  }

  async onSubmit() {
    const url = 'https://test.flcd.ru/api/register';
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
  messeage: 'You have registered!',
  classMesseage: 'alert-success'
})
localStorage.token = result.token
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
      <div className="form register">
        <input onChange={this.onNameChange} className="form-control" type="text" placeholder="Имя" required></input>
        <input onChange={this.onEmailChange} className="form-control" type="email" placeholder="Почта" required></input>
        <input onChange={this.onPasswordChange} className="form-control" type="password" placeholder="Пароль" required></input>
        <input onChange={this.onPasswordConfirmationChange} className="form-control" type="password" placeholder="Подтверждение пароля" required></input>
        <button className="btn btn-primary" type="submit" onClick={this.onSubmit}>Зарегистрироваться</button>
        <div className={this.state.classMesseage}>{this.state.messeage}</div>
      </div>
  );
    }else {return <Redirect to='/' />}
  }
}