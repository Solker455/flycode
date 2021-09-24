import React, {useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PostListItem from './PostListItem';
import { withRouter } from 'react-router';
import { getPost } from '../api/api';
import { useSelector } from 'react-redux';
import { deleteItim } from '../components/deletePost';

function PostList () {
  const token = useSelector(state => state.token);
    let [data, setData] = useState([]),
    [load, setLoad] = useState(false);
    useEffect (() => {getPost().then(response => {
      const allPost = response.data;
      setData(allPost);
      setLoad(true);
    });
        }, [load]);


    const elements = data.map((item) => {
        return (
            <li key={item.id} className="list-group-item">
                <PostListItem 
                label={item.text}
                idEdit={item.id}
                onDelete={() => deleteItim(item.id, token)}
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