import React, {useEffect, useState} from 'react';
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from './TodoList.module.css'

/**
 * Component of TodoList
 * @param filter
 * @returns {JSX.Element}
 * @constructor
 */
export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(() => getStorageTodos());

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.warn('Error occur during parsing.', e.toString())
    }
  }, [todos])

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };
  const handleUpdate = (todo) => {
    setTodos(todos.map(item => item.id === todo.id ? todo : item));
  };
  const handleDelete = (todo) => {
    setTodos(todos.filter(item => item.id !== todo.id));
  };

  const filtered = getFilteredTodos(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map(item => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  )
}

/**
 * Return filtered todos list.
 * @param todos
 * @param filter
 * @returns {*}
 */
function getFilteredTodos(todos, filter) {
  if(filter === 'all') {
    return todos;
  }

  return todos.filter(todo => todo.status === filter)
}


/**
 * Return todos list saved in local storage.
 * @returns {any|*[]}
 */
function getStorageTodos() {
  const todos = localStorage.getItem('todos')
  try {
    return todos ? JSON.parse(todos) : []
  } catch (e) {
    console.warn('Error occur during parsing', e.toString())
  }
}
