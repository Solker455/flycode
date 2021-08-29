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
import Helmet from 'react-helmet';

function App() {
  document.title = 'Список постов';
      return (
        <Router>
          <Helmet title="Список постов" />
        <div >
        <Header/>
          <div className="body">
            <Route path="/editpost/:id/:text" exact render={
              ({match}) => { 
                return <EditPost id={match.params.id} text={match.params.text}/>}
            }/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/addpost" exact component={AddPost}/>
            <Route path="/logout" exact component={Logout}/>
            <Route path="/" exact component={PostList}/>
        </div>
        </div>
        </Router>
        );

}

export default App;