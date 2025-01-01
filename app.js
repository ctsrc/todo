const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load saved TODOs
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
savedTodos.forEach(addTodo);

// Add new TODO
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    addTodoToStorage(text);
    addTodo(text);
    input.value = '';
  }
});

// Add TODO to UI
function addTodo(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', () => {
    removeTodoFromStorage(text);
    li.remove();
  });

  li.appendChild(button);
  list.appendChild(li);
}

// Save TODO to localStorage
function addTodoToStorage(text) {
  savedTodos.push(text);
  localStorage.setItem('todos', JSON.stringify(savedTodos));
}

// Remove TODO from localStorage
function removeTodoFromStorage(text) {
  const index = savedTodos.indexOf(text);
  if (index > -1) {
    savedTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch((err) => console.error('Service Worker Registration Failed:', err));
}
