import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/login';
import Register from './components/register';
import PostList from './components/post/listPosts';
import AddPost from './components/post/addPost';
import Header from './components/header';
import Logout from './components/logout';
import EditPost from './components/post/editPost';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Helmet from 'react-helmet';
import Post from './components/post/post';

function App() {
  document.title = 'Список постов';
      return (
        <Router>
          <Helmet title="Список постов" />
        <div >
        <Header/>
          <div className="body">
            <Route path="/post/:id"><Post/></Route>
            <Route path="/editpost/:text/:id/"><EditPost/></Route>
            <Route path="/register"><Register/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/addpost"><AddPost/></Route>
            <Route path="/logout"><Logout/></Route>
            <Route path="/" exact><PostList/></Route>
        </div>
        </div>
        </Router>
        );

}

export default App;