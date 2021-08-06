import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class EditPost extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        text: this.props.text,
    }
    this.onSubmitEdit = this.onSubmitEdit.bind(this)
    this.onChangeEditText = this.onChangeEditText.bind(this)
}

onChangeEditText(e) {
    this.setState ({
        text: e.target.value
    })
}

async onSubmitEdit(e) {
    e.preventDefault()
    const url = `https://test.flcd.ru/api/post/${this.props.id}`;
    let response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(this.state),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`,
      }
    });
let result = await response.json();
if (response.ok) {
this.setState({
  messeage: 'Пост изменен',
  classMesseage: 'alert-success'
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
        return(
            <div className="edit">
            <input defaultValue={this.props.text} type="text" onChange={this.onChangeEditText} className="form-control" />
            <button className="btn btn-primary" type="submit" onClick={this.onSubmitEdit}>Изменить</button>
            <div className={this.state.classMesseage}>{this.state.messeage}</div>
            </div>
        )
    }
}