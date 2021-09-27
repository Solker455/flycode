import React, {useState}from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { editPost } from '../api/api';

function EditPost(obj) {
    let [text, setText] = useState(''),
    [message, setMessage] = useState(''),
    [classMessage, setClassMessage] = useState('');
    const token = useSelector(state => state.tokenReducer.token)

function onSubmitEdit() {
    editPost(text, token, obj.id).then(response => {
        setMessage('Пост изменен');
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
        return(
            <div className="edit-form">
                <Helmet title="Редактировать пост" />
            <textarea defaultValue={obj.text} onChange={(event) => setText(event.target.value)} className="form-control" />
            <button className="btn btn-primary" type="submit" onClick={onSubmitEdit}>Изменить</button>
            <div className={classMessage}>{message}</div>
            </div>
        )
}

export default EditPost;