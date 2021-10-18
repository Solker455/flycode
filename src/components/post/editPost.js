import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { editPost } from '../../api/api';
import { useParams } from 'react-router';

function EditPost() {
    const token = useSelector(state => state.tokenReducer.token),
        obj = useParams();
    let [text, setText] = useState(obj.text),
        [message, setMessage] = useState(''),
        [classMessage, setClassMessage] = useState('');


    function onSubmitEdit(e) {
        e.preventDefault();
        editPost(text, token, obj.id).then(() => {
            setMessage('Пост изменен');
            setClassMessage('alert-success');
        }).catch(error => {
            if (error.response.data.errors) {
                setMessage(error.response.data.errors);
            }
            if (error.response.data.message) {
                setMessage(error.response.data.message);
            }
            setClassMessage('alert-danger');
        })
    }
    return (
        <form className="edit-form" onSubmit={onSubmitEdit}>
            <Helmet title="Редактировать пост" />
            <textarea value={text} onChange={(event) => setText(event.target.value)} className="form-control" />
            <button className="btn btn-primary" type="submit">Изменить</button>
            <div className={classMessage}>{message}</div>
        </form>
    )
}

export default EditPost;