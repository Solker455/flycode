import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/login';
import Register from './components/register';
import PostList from './components/list-posts';
import AddPost from './components/addPost';
import Header from './components/header';
import Logout from './components/logout';
import EditPost from './components/editPost';
import { BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        data: {}, 
        isFetching: true
      }
      this.deleteItim = this.deleteItim.bind(this);
  }

  componentDidMount() {
    fetch('https://test.flcd.ru/api/post')
        .then(response => response.json())
        .then(result => this.setState({data: result, isFetching: false }))
}

async deleteItim(id) {
  this.setState({
    messeage: ''
  })
  const url = `https://test.flcd.ru/api/post/${id}`;
  let response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(`id: ${id}`),
    headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json'
    }
  });

if (response.ok) {
  if(response.status === 200) {
    alert('Пост удален!');
    this.componentDidMount()
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
  render() {
      const { data, isFetching } = this.state;
      if (isFetching) return <div>Загрузка страницы</div>;
      return (
        <Router>
        <div >
          <Header/>
          <div className="d-flex">
            <Route path="/editpost/:id/:text" exact render={
              ({match}) => { 
                return <EditPost id={match.params.id} text={match.params.text}/>}
            }/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/addpost" exact component={AddPost}/>
            <Route path="/logout" exact component={Logout}/>  
        </div>
            <Route path="/" exact render={
              () => <PostList posts={data} onDelete={this.deleteItim}/>
            }/>
        </div>
        </Router>
        );

  }


}