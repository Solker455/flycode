import { deleteItem } from "../api/api";

export async function deletePost(idItem, token, load) {
    deleteItem(idItem, token).then(response => {
      load(false)
        alert(`Пост удален!`);
    }).catch(error => {
      if(error.response.status === 403) {
        alert('Доступ запрещен')
      }
      if(error.response.status === 401) {
        alert('Вы не авторизованы')
      }
      if(error.response.status === 404) {
        alert('Пост не найден')
      }
    })
  }