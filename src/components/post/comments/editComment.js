import { editPostComment } from "../../../api/api";

export function editComment(idComment, text, token, load) {
  let textPrompt = prompt('Редактирования комментария', text);
  while (textPrompt.length > 150) {
    alert("Введите текст не более 150 символов")
    textPrompt = prompt('Редактирования комментария', text);
  }
  editPostComment(idComment, textPrompt, token).then(() => {
    load(false)
  }).catch(error => {
    if (error.response.status === 403) {
      alert('Доступ запрещен')
    }
    if (error.response.status === 401) {
      alert('Вы не авторизованы')
    }
    if (error.response.status === 404) {
      alert('Комментарий не найден')
    }
  })
}