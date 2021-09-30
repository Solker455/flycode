import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const token = useSelector(state => state.tokenReducer.token);
        if (token===undefined) {
            return(
                <div className="App-header ">
                    <Link to="/" className="btn btn-primary" >Все посты</Link>
                        <span >
                        
                    <Link to="/register" className="btn btn-primary">Регистрация</Link>   
    
                    <Link to="/login" className="btn btn-primary">Вход</Link> 
                        </span> 
                </div>
            )
        }else{
            return (
            <div className="App-header ">
                    <Link to="/" className="btn btn-primary" >Все посты</Link>
            <span >
                    <Link to="/addpost" className="btn btn-primary">Добавить пост</Link>
                    <Link to="/logout" className="btn btn-primary">Выход</Link>
                        </span> 
                        </div>
            )
        }
        
}

export default Header;