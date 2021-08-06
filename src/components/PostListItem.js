import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export default class PostListItem extends React.Component {
    render() {
        const {label, onDelete, idEdit, textEdit} = this.props;
        let link = `/editpost/${idEdit}/${textEdit}`
        let classNames;
        if (localStorage.token !== undefined) {
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
            <button type="button" onClick={onDelete} className="btn-sm m-1">
                Удалить
            </button>
                <Link type="button" to={link} className="btn-sm m-1">
                Редактировать
            </Link>
        </div>
        </div>
        )
    }
}