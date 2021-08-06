import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


export default class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onAddPost = this.onAddPost.bind(this);
    }
    onTextChange(e) {
        this.setState({
          text: e.target.value
        })
      }
      async onAddPost() {
              this.setState({
                messeage: ''
              })
              const url = 'https://test.flcd.ru/api/post';
              let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                    'Content-Type': 'application/json'
                }
              });

let result = await response.json();
if (response.ok) {
  this.setState({
    messeage: 'Post added',
    classMesseage: 'alert-success',
  })
} else {
    if (result.errors) {
    this.setState({
        messeage: result.errors,
        classMesseage: 'alert-danger'
      })
    }else{
        this.setState({
            messeage: result.message,
            classMesseage: 'alert-danger'
          })
    }
}
      }

    render() {
        if (localStorage.token !== undefined) {
        return (
            <div className='form'>
                <input onChange={this.onTextChange} value={this.state.text} className="form-control" type="text" placeholder="Введите текст поста" required></input>
                <button className="btn btn-primary" type="submit" onClick={this.onAddPost}>Добавить</button>
                <div className={this.state.classMesseage}>{this.state.messeage}</div>
            </div>
        )
    }else{ return null}
}
}