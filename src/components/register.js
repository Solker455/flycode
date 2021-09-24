import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { register } from '../api/api';

function Register() {
  let [name, setName] = useState(''),
  [email, setEmail] = useState(''),
  [password, setPassword] = useState(''),
  [passwordConfirmation, setPasswordConfirmation] = useState(''),
  [message, setMessage] = useState(''),
  [classMessage, setClassMessage] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token)

  async function onSubmit() {
    register(name, email, password, passwordConfirmation).then(response => {
      dispatch({type:"ADD_TOKEN", token: response.data.token});
    }).catch(error => {
      if (error.response.data.errors){
        setMessage(error.response.data.errors);
        }
        if (error.response.data.message) {
        setMessage(error.response.data.message);
        }
        setClassMessage('alert-danger');
    })

}
    if (token === undefined) {
  return ( 
      <div className="form">
        <Helmet title="Форма регистрации" />
        <input onChange={(event) => setName(event.target.value)} className="form-control" type="text" placeholder="Имя"></input>
        <input onChange={(event) => setEmail(event.target.value)} className="form-control" type="email" placeholder="Почта"></input>
        <input onChange={(event) => setPassword(event.target.value)} className="form-control" type="password" placeholder="Пароль"></input>
        <input onChange={(event) => setPasswordConfirmation(event.target.value)} className="form-control" type="password" placeholder="Подтверждение пароля"></input>
        <button className="btn btn-primary" type="submit" onClick={onSubmit}>Зарегистрироваться</button>
        <div className={classMessage}>{message}</div>
      </div>
  );
    }else {return <Redirect to='/' />}
}

export default Register;