import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutActionCreator_info } from '../store/tokenReducer';
import { logoutActionCreator_token } from '../store/infoReducer';


function Header() {
    const token = useSelector(state => state.tokenReducer.token);
    const dispatch = useDispatch();
    const logout = async () => {
        await dispatch(logoutActionCreator_token());
        await dispatch(logoutActionCreator_info())
    }
    if (!token) {
        return (
            <div className="App-header ">
                <Link to="/" className="btn btn-primary" >Все посты</Link>
                <span >
                    <Link to="/register" className="btn btn-primary">Регистрация</Link>
                    <Link to="/login" className="btn btn-primary">Вход</Link>
                </span>
            </div>
        )
    } else {
        return (
            <div className="App-header ">
                <Link to="/" className="btn btn-primary" >Все посты</Link>
                <span >
                    <Link to="/addpost" className="btn btn-primary">Добавить пост</Link>
                    <button onClick={logout} className='btn btn-primary'>Выход</button>
                </span>
            </div>
        )
    }

}

export default Header;