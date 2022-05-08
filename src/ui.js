
const renderTweet = ({id, title, date}) => {
  return (
    `
    <div class="card-panel todo white row data-id=${id}">
      <div class="todo-content">
        <div class="todo-title">${title}</div>
        <div class="todo-date">${date}</div>
      </div>
    
      <div class="todo-edit sidenav-trigger" data-target="side-form-edit">
        <i class="material-icons">edit_outline</i>
      </div>
      <div class="todo-delete">
        <i class="material-icons">delete_outline</i>
      </div>
      
    </div>
    `
  )
}

export const showNotification = (title, options) => {
  if (Notification.permission==='granted') {
    const notification = new Notification(title,options)
  }
}


$(document).ready(function(){
  // add todo
  const forms = $('.side-form');
  const edit = $('.side-form-edit')
  M.Sidenav.init(forms, {edge: 'left'});
  M.Sidenav.init(edit, {edge: 'left'});
  //$('.datepicker').datepicker();
});

