import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';

function AddPost() {
  let [text, setText] = useState(''),
  [messeage, setMesseage] = useState(''),
  [classMesseage, setClassMesseage] = useState('');
  const token = useSelector(state => state.token)
      async function onAddPost() {
        let body = {'text': text};
              const url = 'https://test.flcd.ru/api/post';
              let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
              });

let result = await response.json();
if (response.ok) {
  setMesseage(messeage = `'${body.text}' успешно добавлен`);
  setClassMesseage(classMesseage = 'alert-success');
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

        if (token !== undefined) {
        return (
            <div className='add-form'>
              <Helmet title="Добавить поста" />
                <textarea onChange={(event) => setText(text = event.target.value)} className="form-control" type="text" placeholder="Введите текст поста" required></textarea>
                <button className="btn btn-primary" type="submit" onClick={onAddPost}>Добавить</button>
                <div className={classMesseage}>{messeage}</div>
            </div>
        )
    }else{ return <Redirect to='/'/>}

}

export default AddPost;