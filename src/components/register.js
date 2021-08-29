import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

function Register() {

  let [name, setName] = useState(''),
  [email, setEmail] = useState(''),
  [password, setPassword] = useState(''),
  [passwordConfirmation, setPasswordConfirmation] = useState(''),
  [messeage, setMesseage] = useState(''),
  [classMesseage, setClassMessage] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.token)

  async function onSubmit() {
    let body = {'name': name,
                'email':email,
                'password': password,
                'password_confirmation': passwordConfirmation}
    const url = 'https://test.flcd.ru/api/register';
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json'
      }
    });
let result = await response.json();
if (response.ok) {
setMesseage(
  messeage = 'You have registered!'
)
setClassMessage(
  classMesseage = 'alert-success'
)
dispatch({type:"ADD_TOKEN", load: result.token})
} else {
  if (result.errors) {
    setMesseage(
        messeage = result.errors
      )
      setClassMessage(
        classMesseage = 'alert-danger'
      )
    }else{
      setMesseage(
        messeage = result.message
      )
      setClassMessage(
        classMesseage = 'alert-danger'
      )
    }
}
}
    if (token === undefined) {
  return ( 
      <div className="form">
        <Helmet title="Форма регистрации" />
        <input onChange={(event) => setName(name = event.target.value)} className="form-control" type="text" placeholder="Имя" required></input>
        <input onChange={(event) => setEmail(email = event.target.value)} className="form-control" type="email" placeholder="Почта" required></input>
        <input onChange={(event) => setPassword(password = event.target.value)} className="form-control" type="password" placeholder="Пароль" required></input>
        <input onChange={(event) => setPasswordConfirmation(passwordConfirmation = event.target.value)} className="form-control" type="password" placeholder="Подтверждение пароля" required></input>
        <button className="btn btn-primary" type="submit" onClick={onSubmit}>Зарегистрироваться</button>
        <div className={classMesseage}>{messeage}</div>
      </div>
  );
    }else {return <Redirect to='/' />}
}

export default Register;