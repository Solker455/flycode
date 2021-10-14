import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Helmet from 'react-helmet';
import { getPost } from '../../api/api';
import ListComments from './comments/listComments';
import { useSelector } from 'react-redux';
import { deletePost } from './deletePost';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

function Post() {
    let [post, setPost] = useState({}),
        [load, setLoad] = useState(false),
        title,
        classNames;
    const token = useSelector(state => state.tokenReducer.token),
        userInfo = useSelector(state => state.infoReducer.userInfo);
    let obj = useParams();
    useEffect(() => {
        getPost(obj.id).then(response => {
            setPost(response.data);
            setLoad(true)
        })
    }, [load])
    title = `Пост ${post.text}`;
    if (userInfo === post.user_id) {
        classNames = 'd-inline float-right'
    } else {
        classNames = 'd-none'
    }
    let linkEdit = `/editpost/${post.text}/${obj.id}`;
    if (load) {
        return (
            <div className="view-post">
                <Helmet title={title} />
                <div className="title-post">
                    <div className="text-title-post">{post.text}</div>
                    <div className={classNames}>
                        <img className='button-delete-post' title="Удалить" alt="Корзина удаления" onClick={() => deletePost(post.id, token, setLoad)} src="\png\delete.png" />
                        <Link to={linkEdit} >
                            <img className='button-edit-post' title="Редактировать" alt="Карандаш редактирования" src="\png\edit.png" />
                        </Link>
                    </div>
                </div>
                <div className="info-post">
                    <div>Дата создания: {moment(post.created_at).format('DD.MM.YYYY')}</div>
                    <div>Дата редактирования: {moment(post.update_at).format('DD.MM.YYYY')}</div>
                    <div>Автор ID: {post.user_id}</div>
                </div>
                <hr />
                <ListComments id={obj.id} />
            </div>
        )
    } else {
        return null
    }
}

export default Post;