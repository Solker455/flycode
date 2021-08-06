import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PostListItem from './PostListItem';
import { withRouter } from 'react-router';

const PostList = ({posts, onDelete}) => {

    const elements = posts.map((item) => {
        return (
            <li key={item.id} className="list-group-item">
                <PostListItem 
                label={item.text}
                onDelete={() => onDelete(item.id)}
                idEdit={item.id}
                textEdit={item.text}
                />
            </li>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}      
        </ul>
    )
}

export default withRouter(PostList);