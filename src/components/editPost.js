import React, {useState}from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';

function EditPost(obj) {
    let [text, setText] = useState(''),
    [messeage, setMesseage] = useState(''),
    [classMesseage, setClassMesseage] = useState('');
    const token = useSelector(state => state.token)
async function onSubmitEdit() {
    let body = {'text': text}
    const url = `https://test.flcd.ru/api/post/${obj.id}`;
    let response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }
    });
let result = await response.json();
if (response.ok) {
    setMesseage(messeage = 'Пост изменен');
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
        return(
            <div className="edit">
            <input defaultValue={obj.text} type="text" onChange={(event) => setText(text = event.target.value)} className="form-control" />
            <button className="btn btn-primary" type="submit" onClick={onSubmitEdit}>Изменить</button>
            <div className={classMesseage}>{messeage}</div>
            </div>
        )
}

export default EditPost;