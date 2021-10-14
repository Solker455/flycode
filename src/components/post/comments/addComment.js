import React, { useState } from "react";
import { addPostComment } from "../../../api/api";
import { useSelector } from 'react-redux';

function AddComment(obj) {
    let [message, setMessage] = useState(''),
        [classMessage, setClassMessage] = useState(''),
        [text, setText] = useState(''),
        classForm;
    const token = useSelector(state => state.tokenReducer.token);

    function postAddComment(event) {
        event.preventDefault();
        addPostComment(text, token, obj.id).then(() => {
            setMessage(`Комментарий отправлен`);
            setClassMessage('alert-success message');
            obj.load(false);
        }).catch(error => {
            if (error.response.data.errors) {
                setMessage(error.response.data.errors);
            }
            if (error.response.data.message) {
                setMessage(error.response.data.message);
            }
            setClassMessage('alert-danger message');
        })
    }

    if (token) {
        classForm = 'd-flex'
    } else {
        classForm = 'd-none'
    }
    return (
        <div>
            <form className={classForm} onSubmit={postAddComment}>
                <input type="text" className="form-control form-comment" maxLength="150" onChange={(event) => setText(event.target.value)} placeholder="Введите текст комментария"></input>
                <button className="btn btn-primary" type="submit">Отправить</button>
            </form>
            <div className={classMessage}>{message}</div>
        </div>
    )
}

export default AddComment;