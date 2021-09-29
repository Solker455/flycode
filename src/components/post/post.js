import React, {useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Helmet from 'react-helmet';
import { getPost } from '../../api/api';
import ListComments from './comments/listComments';

function Post(obj) {
    let [post, setPost] = useState({}),
    [load, setLoad] = useState(false),
    title;

   useEffect(() => {
        getPost(obj.id).then(response => {
            setPost(response.data);
            setLoad(true)
        })
    }, [load])
    title = `Пост ${post.text}`;
    
    return (
        <div>
        <Helmet title={title} />
    <div>{post.text}</div>
    <div>Дата создания: {post.created_at}</div>
    <div>Дата редактирования: {post.updated_at}</div>
    <div>Автор ID: {post.user_id}</div>
    <ListComments id={obj.id}/>
    </div>
    )
}

export default Post;