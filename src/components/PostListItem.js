import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostListItem({label, onDelete, idEdit, textEdit}) {
        let link = `/editpost/${idEdit}/${textEdit}`
        let classNames;
        const token = useSelector(state => state.tokenReducer.token)
        if (token !== undefined) {
            classNames = 'd-flex'
        }else{
            classNames = 'd-none'
        }
        return (
            <div className="app-list-item d-flex justify-content-between"> 
            <span className="app-list-item-label">
                {label}
            </span>
        
        <div className={classNames}>
            <button className='button' onClick={onDelete} >
                Удалить
            </button>
            <button className='button'>
            <Link to={link} >
                Редактировать
            </Link>
            </button>
        </div>
        </div>
        )
}
export default PostListItem;