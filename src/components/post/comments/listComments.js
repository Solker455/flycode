import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { getComments } from "../../../api/api";
import AddComment from './addComment';
import { deleteComment } from "./deleteComment";
import { useSelector } from 'react-redux';

function ListComments(obj) {
    let [commentsArray, setCommentsArray] = useState([]),
    [load, setLoad] = useState(false),
    comments;
    const token = useSelector(state => state.tokenReducer.token);
       useEffect(() => {
                getComments(obj.id).then(response => {
                    setCommentsArray(response.data);
                    setLoad(true);
                })
       }, [load])
    if (load) {
        comments = commentsArray.map((item) => {
            return (
                <li key={item.id}>
                    {item.text} - <img className='button-delete-comment' title="Удалить" alt="Корзина удаления" onClick={() => deleteComment(item.id, token, setLoad)} src="\png\delete.png" />
                </li>
            )
        })
    }
    return (
        <div>
            Комментариев ({commentsArray.length}): 
        <ul>
            {comments}
        </ul>
        <AddComment id={obj.id} load={setLoad}/>
        </div>
    )
}

export default ListComments;