import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  let [email, setEmail] = useState(''),
  [password, setPassword] = useState(''),
  [messeage, setMesseage] = useState(''),
  [classMesseage, setClassMesseage] = useState('')
  const dispatch = useDispatch();
  const token = useSelector(state => state.token)

      async function onSubmitLogin() {
        let body = {'email':email,
        'password': password}
              const url = 'https://test.flcd.ru/api/token';
              let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
              });

let result = await response.json();
if (response.ok) {
  setMesseage(messeage = 'You have successfully logged in');
  setClassMesseage(classMesseage = 'alert-success');
  dispatch({type:"ADD_TOKEN", load: result.token})
} else {
    if (result.errors) {
      setMesseage(messeage = result.errors);
      setClassMesseage(classMesseage = 'alert-danger');
    }else{
          setMesseage(messeage = result.message);
      setClassMesseage(classMesseage = 'alert-danger');
    }
}
      }
        if (token === undefined) {
        return (
          <div>
            <div className='form login'>
                <input onChange={(event) => setEmail(email = event.target.value)} className="form-control" type="email" placeholder="Почта" required></input>
                <input onChange={(event) => setPassword(password = event.target.value)} className="form-control" type="password" placeholder="Пароль" required></input>
                <button className="btn btn-primary" onClick={onSubmitLogin} type="submit">Вход</button>
                <div className={classMesseage}>{messeage}</div>
            </div>
            </div>
        )
    }else{ return <Redirect to='/'/>}
}

export default Login;