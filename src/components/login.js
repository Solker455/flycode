import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { login } from '../api/api';
import { getUser } from '../api/api';

function Login() {
  let [email, setEmail] = useState(''),
  [password, setPassword] = useState(''),
  [message, setMessage] = useState(''),
  [classMessage, setClassMessage] = useState('')
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token)

      function onSubmitLogin(e) {
        e.preventDefault();
        login(email, password).then(response => {
        dispatch({type:"ADD_TOKEN", token: response.data.token});
        getUser(response.data.token).then(response => {
          dispatch({type:"ADD_INFO", userInfo: response.data.id});
        })
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
            <form className='form' onSubmit={onSubmitLogin}>
              <Helmet title="Форма входа" />
                <input onChange={(event) => setEmail(event.target.value)} className="form-control" type="email" placeholder="Почта" required></input>
                <input onChange={(event) => setPassword(event.target.value)} className="form-control" type="password" placeholder="Пароль" required></input>
                <button className="btn btn-primary" type="submit">Вход</button>
                <div className={classMessage}>{message}</div>
            </form>
        )
    }else{ return <Redirect to='/'/>}
}

export default Login;