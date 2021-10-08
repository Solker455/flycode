import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { editPost } from '../../api/api';
import { useRouteMatch } from 'react-router';

function EditPost() {
    let [text, setText] = useState(''),
    [message, setMessage] = useState(''),
    [classMessage, setClassMessage] = useState('');
    const token = useSelector(state => state.tokenReducer.token);
    let obj = useRouteMatch();

function onSubmitEdit(e) {
    e.preventDefault();
    editPost(text, token, obj.params.id).then(() => {
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
            <form className="edit-form" onSubmit={onSubmitEdit}>
                <Helmet title="Редактировать пост" />
            <textarea defaultValue={obj.params.text} onChange={(event) => setText(event.target.value)} className="form-control" />
            <button className="btn btn-primary" type="submit">Изменить</button>
            <div className={classMessage}>{message}</div>
            </form>
        )
}

export default EditPost;