import React, { useEffect, useReducer } from 'react';
import TodoForm from './todoform';
import TodoList from './todolist';
import "bootstrap/dist/css/bootstrap.min.css";

// Reducer function
const todoReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_TODOS':
            return { ...state, todos: action.payload };
        case 'ADD_TODO':
            return { ...state, todos: [action.payload, ...state.todos] };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                )
            };
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
        default:
            return state;
    }
};

const Todo = () => {
    const [state, dispatch] = useReducer(todoReducer, { todos: [] });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => dispatch({ type: 'FETCH_TODOS', payload: json }))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const handleStatus = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: !state.todos.find(todo => todo.id === id).completed }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update todo item');
                }
                dispatch({ type: 'TOGGLE_TODO', payload: id });
            })
            .catch(error => console.error('Error updating todo item:', error));
    };

    const deleteTodo = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' })
            .then(() => dispatch({ type: 'DELETE_TODO', payload: id }))
            .catch(error => console.error('Error deleting todo item:', error));
    };

    const addTodo = (data) => {

        const newdata = {
            id: state.todos.length + 1,
            title: data.todo,
            body: "",
            userId: 1,
        }
        fetch("https://jsonplaceholder.typicode.com/todos", {
            method: 'POST',
            body: JSON.stringify({
                id: state.todos.length + 1,
                title: data.todo,
                body: "",
                userId: 1,
            }),
        })
            .then(response => response.json())
            .then(json => {
                dispatch({ type: 'ADD_TODO', payload: newdata });
            })
            .catch(error => console.error('Error adding todo:', error));
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col shadow bg-white">
                    <div className="row bg-primary text-white">
                        <div className="col  p-2">
                            <h4>Todo App</h4>
                        </div>
                    </div>
                    <TodoForm addTodo={addTodo}></TodoForm>
                    {state.todos.map((todo) => (
                        <TodoList key={todo.id} todo={todo} handleStatus={handleStatus} deleteTodo={deleteTodo}></TodoList>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todo;
