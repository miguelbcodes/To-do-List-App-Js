// Show the existed todos when initialize the page
showTodos();

// Show todos in the page
function showTodos() {

  // Check whether the 'todos' item exist or not in the localStorage
  let todos = localStorage.getItem('todos');

  if (todos == null) {
    todos_obj = [];
  } else {
    todos_obj = JSON.parse(todos);
  }
  localStorage.setItem('todos', JSON.stringify(todos_obj));

  // Adding the todos into a variable
  let html = '';
  todos_obj.forEach(function(element, index) {
    html += `
      <li id="todo-${index}" class="todo">
        <div id="todo-text-container-${index}" class="todo-text-container">
          <input
            id="check-todo-btn-${index}"
            class="check-todo-btn"
            onclick="doneTodo(${index})"
            type="checkbox">
          <input
            id="todo-text-${index}"
            class="todo-text"
            readonly
            type="text"
            value="${element}">
        </div>
        <div
          id="btn-container-${index}"
          class="btn-container">
          <button
            id="delete-todo-btn-${index}"
            class="delete-todo-btn"
            onclick="deleteTodo(${index})">
            <img
              src="./assets/delete-button.svg"
              alt="Delete todo icon"
              width="20"
              height="20">
          </button>
        <button
          id="edit-todo-btn-${index}"
          class="edit-todo-btn"
          onclick="editTodo(${index})">
          <img
            id="edit-icon-${index}"
            src="./assets/edit-button.svg"
            alt="Edit todo icon"
            width="20"
            height="20">
        </button>
      </li>
    `
  });

  // Check whether the todos item is empty or not and put them into the DOM
  let todos_list_el = document.getElementById('todos-list');
  if (todos_obj.length != 0) {
    todos_list_el.innerHTML = html;
  } else {
    todos_list_el.innerHTML = "";
  }

}

// Add todos into the localStorage
const add_todo_btn = document.getElementById('add-todo-btn');
add_todo_btn.addEventListener('click', function(){

  // Check whether the item exist or not in the localStorage
  let todos = localStorage.getItem('todos');

  if (todos == null) {
    todos_obj = [];
  } else {
    todos_obj = JSON.parse(todos);
  }

  // Add the input content to the localStorage
  let input_todo_el = document.getElementById('input-todo');
  todos_obj.push(input_todo_el.value);
  localStorage.setItem('todos', JSON.stringify(todos_obj));
  input_todo_el.value = '';
  showTodos();
});

// When the edit button is cicked
function editTodo(index){

  let edit_todo_btn = document.getElementById(`edit-todo-btn-${index}`)
  // Make the text editable
  const todo_text_el = document.getElementById(`todo-text-${index}`);
  todo_text_el.removeAttribute('readonly')
  todo_text_el.style.color = '#EB4764';
  const end_text = todo_text_el.value.length;
  todo_text_el.setSelectionRange(0, end_text);
  todo_text_el.focus();

  // Remove edit button from the DOM
  let btn_container_el = document.getElementById(`btn-container-${index}`);
  btn_container_el.removeChild(edit_todo_btn);

  // Add confirm edit button to the DOM
  let confirm_edit_btn = document.createElement('button');
  confirm_edit_btn.setAttribute('id', `confirm-edit-btn-${index}`);
  confirm_edit_btn.setAttribute('class', 'confirm-edit-btn');
  confirm_edit_btn.innerHTML = `
    <img
      id="confirm-edit-icon"
      src="./assets/confirm-edit-button.svg"
      alt="Confirm edition icon"
      width="20"
      height="20">
  `;
  btn_container_el.appendChild(confirm_edit_btn);

  // When the confirm edit button is clicked
  confirm_edit_btn.addEventListener('click', function(){
    // TODO: Update the new todo-text in the localStorage
    let todos = localStorage.getItem('todos');

    if (todos == null) {
      todos_obj = [];
    } else {
      todos_obj = JSON.parse(todos);
    }
    todos_obj[index] = todo_text_el.value;
    localStorage.setItem('todos', JSON.stringify(todos_obj));

    todo_text_el.setAttribute('readonly','');
    btn_container_el.removeChild(confirm_edit_btn);
    btn_container_el.appendChild(edit_todo_btn);
    showTodos();
  });
};

// TODO: When the delete button is clicked
function deleteTodo(index) {
  // Check whether the item exist or not in the localStorage
  let todos = localStorage.getItem('todos');

  if (todos == null) {
    todos_obj = [];
  } else {
    todos_obj = JSON.parse(todos);
  }
  todos_obj.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos_obj))
  showTodos();
};

// TODO: When the checkbox is clicked
function doneTodo(index) {
  let check_todo_btn = document.getElementById(`check-todo-btn-${index}`)
  if (check_todo_btn.checked) {
    let current_todo = document.getElementById(`todo-text-${index}`);
    current_todo.setAttribute('disabled','');
  } else {
    let current_todo = document.getElementById(`todo-text-${index}`);
    current_todo.removeAttribute('disabled');
  }

}