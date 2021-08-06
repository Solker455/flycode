import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        let classNames1, classNames2;
        if (localStorage.token === undefined) {
            classNames1 = 'd-flex';
            classNames2 = 'd-none';
        }else{
            classNames1 = 'd-none';
            classNames2 = 'd-flex';
        }
        return(
            <div className="d-flex">
                <Link to="/" className="btn btn-primary" >Все посты</Link>
                    <span className={classNames1}>
                    
                <Link to="/register" className="btn btn-primary">Регистрация</Link>   

                <Link to="/login" className="btn btn-primary">Вход</Link> 
                    </span>
                    <span className={classNames2}>

                <Link to="/addpost" className="btn btn-primary">Добавить пост</Link>

                <Link to="/logout" className="btn btn-primary">Выход</Link>   
                    </span>  
            </div>
        )
    }
}