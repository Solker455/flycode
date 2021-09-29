import { deletePostComment } from "../../../api/api";

export function deleteComment(idComment, token, load) {
    deletePostComment(idComment, token).then(() => {
      load(false)
        alert(`Комментарий удален!`);
    }).catch(error => {
      if(error.response.status === 403) {
        alert('Доступ запрещен')
      }
      if(error.response.status === 401) {
        alert('Вы не авторизованы')
      }
      if(error.response.status === 404) {
        alert('Комментарий не найден')
      }
    })
  }