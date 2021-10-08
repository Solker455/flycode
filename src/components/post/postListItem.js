import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostListItem({label, comments, onDelete, id, textEdit, userId}) {
        let linkEdit = `/editpost/${textEdit}/${id}`,
        linkPost = `/post/${id}`,
        classNames;
        const userInfo = useSelector(state => state.infoReducer.userInfo);
        if (userInfo === userId) {
            classNames = 'd-flex'
        }else{
            classNames = 'd-none'
        }
        return (
            <div className="app-list-item d-flex justify-content-between"> 
            <span>
                <Link className="app-list-item-label" to={linkPost} >
                    {label}        
                </Link>
                <div className="comments-item">Комментариев: {comments}</div>
            </span>
        <div className={classNames}>
                <img className='button-delete-post' title="Удалить" alt="Корзина удаления" onClick={onDelete} src="\png\delete.png" />
            <Link to={linkEdit} >
                <img className='button-edit-post' title="Редактировать" alt="Карандаш редактирования" src="\png\edit.png" />
            </Link>
        </div>
        </div>
        )
}
export default PostListItem;