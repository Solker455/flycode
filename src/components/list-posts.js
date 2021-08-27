import React, {useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PostListItem from './PostListItem';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

function PostList () {
    let [data, setData] = useState([]),
    [load, setLoad] = useState(false);
    const token = useSelector(state => state.token)
    useEffect (() => {fetch('https://test.flcd.ru/api/post')
          .then(response => response.json())
          .then((result) => {setData(result);setLoad(true)})
        }, [load]);
        async function deleteItim(id) {
            const url = `https://test.flcd.ru/api/post/${id}`;
            let response = await fetch(url, {
              method: 'DELETE',
              body: JSON.stringify(`id: ${id}`),
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
            });
          
          if (response.ok) {
            if(response.status === 200) {
              alert('Пост удален!');
              setLoad(false)
            }
          } else {
            if(response.status === 403) {
              alert('Доступ запрещен')
            }
            if(response.status === 401) {
              alert('Вы не авторизованы')
            }
            if(response.status === 404) {
              alert('Пост не найден')
            }
          }
          }

    const elements = data.map((item) => {
        return (
            <li key={item.id} className="list-group-item">
                <PostListItem 
                label={item.text}
                idEdit={item.id}
                onDelete={() => deleteItim(item.id)}
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