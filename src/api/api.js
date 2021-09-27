import axios from 'axios';

export function getPosts() {
const url = 'http://test.flcd.ru/api/post';
    return axios.get(url)
}

export function deleteItem(idItem, token) {
    const url = `https://test.flcd.ru/api/post/${idItem}`;
    return axios.delete(url, {
        id: idItem,
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
}

export function login(emailInput, passwordInput) {
    const url = 'https://test.flcd.ru/api/token';
        return axios.post(url, {
            email:emailInput,
            password: passwordInput
        })
    }

export function register(nameInput, emailInput, passwordInput, passwordConfirmationInput) {
    const url = 'https://test.flcd.ru/api/register';
        return axios.post(url, {
            name:nameInput,
            email:emailInput,
            password: passwordInput,
            password_confirmation: passwordConfirmationInput
        })
    }

export function editPost(textInput, token, obj) {
    const url = `https://test.flcd.ru/api/post/${obj}`;
    return axios.patch(url,
        {text: textInput},
        {headers: {
          'Authorization': `Bearer ${token}`,
        }
    })
}

export function addPost(textInput, token) {
    const url = `https://test.flcd.ru/api/post`;
    return axios.post(url,
        {text: textInput},
        {headers: {
          'Authorization': `Bearer ${token}`,
        }
    })
}