import React, {useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PostListItem from './postListItem';
import { withRouter } from 'react-router';
import { getPosts } from '../../api/api';
import { useSelector } from 'react-redux';
import { deletePost } from './deletePost';

function PostList () {
  const token = useSelector(state => state.tokenReducer.token);
    let [data, setData] = useState([]),
    [load, setLoad] = useState(false);
    useEffect (() => {getPosts().then(response => {
      setData(response.data);
      setLoad(true);
    });
        }, [load]);

    const elements = data.reverse().map((item) => {
        return (
            <li key={item.id} className="list-group-item">
                <PostListItem 
                label={item.text}
                comments={item.comments.length}
                id={item.id}
                onDelete={() => deletePost(item.id, token, setLoad)}
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