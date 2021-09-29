import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { addPost } from '../../api/api';

function AddPost() {
  let [text, setText] = useState(''),
  [message, setMessage] = useState(''),
  [classMessage, setClassMessage] = useState('');
  const token = useSelector(state => state.tokenReducer.token)
      function onAddPost(e) {
        e.preventDefault();
        addPost(text, token).then(() => {
          setMessage(`Пост '${text}' добавлен`);
          setClassMessage('alert-success');
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
        if (token !== undefined) {
        return (
            <form className='add-form' onSubmit={onAddPost}>
              <Helmet title="Добавить поста" />
                <textarea onChange={(event) => setText(event.target.value)} className="form-control" type="text" placeholder="Введите текст поста"></textarea>
                <button className="btn btn-primary" type="submit">Добавить</button>
                <div className={classMessage}>{message}</div>
            </form>
        )
    }else{ return <Redirect to='/'/>}

}

export default AddPost;