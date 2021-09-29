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
            setClassMessage('alert-success');
            obj.load(false);
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
        classForm = 'd-block'
    }else{
        classForm = 'd-none'
    }
    return (
        <form className={classForm} onSubmit={postAddComment}>
            <input type="text" onChange={(event) => setText(event.target.value)} placeholder="Введите текст комментария"></input>
            <button type="submit">Отправить</button>
            <div className={classMessage}>{message}</div>
        </form>
    )
}

export default AddComment;