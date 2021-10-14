import { deleteItem } from "../../api/api";

export function deletePost(idItem, token, load) {
  deleteItem(idItem, token).then(() => {
    alert(`Пост удален!`);
    load(false);
  }).catch(error => {
    if (error.response.status === 403) {
      alert('Доступ запрещен')
    }
    if (error.response.status === 401) {
      alert('Вы не авторизованы')
    }
    if (error.response.status === 404) {
      alert('Пост не найден')
    }
  })
}