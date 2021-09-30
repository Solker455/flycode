import React, {useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Helmet from 'react-helmet';
import { getPost } from '../../api/api';
import ListComments from './comments/listComments';
import { useSelector } from 'react-redux';
import { deletePost } from './deletePost';
import { Link } from 'react-router-dom';

function Post(obj) {
    let [post, setPost] = useState({}),
    [load, setLoad] = useState(false),
    title,
    classNames;
    const token = useSelector(state => state.tokenReducer.token)

   useEffect(() => {
        getPost(obj.id).then(response => {
            setPost(response.data);
            setLoad(true)
        })
    }, [load])
    title = `Пост ${post.text}`;
    if (token !== undefined) {
        classNames = 'd-inline'
    }else{
        classNames = 'd-none'
    }
    let linkEdit = `/editpost/${obj.id}/${post.text}`;
    return (
        <div>
        <Helmet title={title} />
    <div>{post.text} <div className={classNames}>
                        <img className='button-delete-post' title="Удалить" alt="Корзина удаления" onClick={() => deletePost(post.id, token, setLoad)} src="\png\delete.png" />
                            <Link to={linkEdit} >
                                <img className='button-edit-post' title="Редактировать" alt="Карандаш редактирования" src="\png\edit.png" />
                            </Link>
                    </div>
        </div>
    <div>Дата создания: {post.created_at}</div>
    <div>Дата редактирования: {post.updated_at}</div>
    <div>Автор ID: {post.user_id}</div>
    <ListComments id={obj.id}/>
    </div>
    )
}

export default Post;