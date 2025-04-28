const API_URL = 'http://localhost:3000/todos';

async function fetchTodos() {
  const res = await fetch(API_URL);
  return res.json();
}

async function addTodo(title) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  return res.json();
}

async function toggleTodo(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed })
  });
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

function render(todos) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t.title;
    li.className = t.completed ? 'completed' : '';
    li.onclick = async () => {
      await toggleTodo(t.id, t.completed);
      loadAndRender();
    };
    li.oncontextmenu = async e => {
      e.preventDefault();
      await deleteTodo(t.id);
      loadAndRender();
    };
    list.append(li);
  });
}

async function loadAndRender() {
  const todos = await fetchTodos();
  render(todos);
}

document.getElementById('todo-form').onsubmit = async e => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  await addTodo(input.value);
  input.value = '';
  loadAndRender();
};

// initial load
loadAndRender();

