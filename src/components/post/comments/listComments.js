import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { getComments } from "../../../api/api";
import AddComment from './addComment';
import { deleteComment } from "./deleteComment";
import { useSelector } from 'react-redux';
import { editComment } from "./editComment";

function ListComments(obj) {
    let [commentsArray, setCommentsArray] = useState([]),
    [load, setLoad] = useState(false),
    comments, classForm;
    const token = useSelector(state => state.tokenReducer.token);
    const userInfo = useSelector(state => state.infoReducer.userInfo);
       useEffect(() => {
                getComments(obj.id).then(response => {
                    setCommentsArray(response.data);
                    setLoad(true);
                })
       }, [load])
    if (load) {
        comments = commentsArray.map((item) => {
            if (userInfo === item.user_id) {
                classForm = 'd-block'
            }else{
                classForm = 'd-none'
            }
            return (
                <li key={item.id} className="d-flex">
                    <div className=" view-comment title-comment">{item.text}</div>
                    <div className={classForm}>
                        <img className="button-delete-comment" title="Удалить" alt="Корзина удаления" onClick={() => deleteComment(item.id, token, setLoad)} src="\png\delete.png" />
                        <img className="button-edit-comment" title="Редактировать" alt="Карандаш редактирования" onClick={() => editComment(item.id, item.text, token, setLoad)} src="\png\edit.png" />
                    </div>
                </li>
            )
        })
    }
    return (
        <div className="view-comments-post">
            Комментариев ({commentsArray.length}): 
        <ul>
            {comments}
        </ul>
        <hr/>
        <AddComment id={obj.id} load={setLoad}/>
        </div>
    )
}

export default ListComments;