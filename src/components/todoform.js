const TodoForm = ({addTodo}) => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        addTodo(data)
        e.target.reset()
    };
    
    return (
        <div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className="row justify-content-between text-white p-2">
                        <div className="form-group flex-fill mb-2">
                            <input id="todo-input" type="text" name = "todo"className="form-control" required />
                        </div>
                        <button type="submit" onClick={() => {}} className="btn btn-primary mb-2 ml-2">Add todo</button>
                    </div>
            </form>
        </div>
    );
}

export default TodoForm;