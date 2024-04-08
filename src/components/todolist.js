import React from 'react';

const TodoList = ({ todo, handleStatus, deleteTodo }) => {
    return (
        <>
            <div className="row" id="todo-container">
                <div className="col col-12 p-2 todo-item" todo-id={todo.id}>
                    <div className="input-group mb-3">
                        <div className="input-group-text">
                            <input
                                className="form-check-input mt-0"
                                onChange={() => handleStatus(todo.id)}
                                type="checkbox"
                                value=""
                                aria-label="Checkbox for following text input"
                                checked={todo.completed}
                            />
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            readOnly={true}
                            aria-label="Text input with checkbox"
                            value={todo.title}
                        />
                        <button
                            todo-id={todo.id}
                            className="btn btn-outline-secondary bg-danger text-white todo-done"
                            type="button"
                            onClick={() => deleteTodo(todo.id)}
                            id="button-addon2"
                        >
                            X
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoList;
