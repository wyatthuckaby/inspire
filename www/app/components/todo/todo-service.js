function TodoService() {
    // A local copy of your todos
    var todoList = []

    function logError(err) {
        console.error('UMM SOMETHING BROKE: ', err)
    }

    this.getTodos = function(draw) {
        // You probably don't need to change anything in this function.....
        $.get('/api/todo')
            .then((todos) => {
                todoList = todos // <-- WHY IS THIS IMPORTANT????
                draw(todoList) // <-- WHERE DOES THIS DRAW FUNCTION COME FROM???
            })
            .fail(logError)
    }

    this.addTodo = function(todo, draw) {
        // WHAT IS THIS FOR???
        $.post('/api/todo', todo)
            .then(this.getTodos(draw)) // <-- DO NOT CHANGE THIS IT WORKS BUT DO YOU KNOW WHY?
            .fail(logError)
    }

    this.toggleTodoStatus = function(todoId, draw) {
        // MAKE SURE WE THINK THIS ONE THROUGH
        var todo = {};
        todoList.forEach((item) => {
            if (item._id === todoId) {
                todo.id = item._id;
                todo.edit = {
                    text: item.text,
                    checked: !item.checked,
                    display: item.display
                };
            }
        });

        console.log(todo);

        //STEP 3: Here is that weird Ajax request because $.put doesn't exist
        $.ajax({
                method: 'PUT',
                contentType: 'application/json',
                url: '/api/todo',
                data: JSON.stringify(todo)
            })
            .then(this.getTodos(draw))
            .fail(logError)
    }

    this.removeTodo = function(todoId, draw) {
        // Umm this one is on you to write.... It's also unique, the method is a DELETE
        var todo = {
            id: todoId
        };


        $.ajax({
            method: 'DELETE',
            contentType: 'application/json',
            url: '/api/todo',
            data: JSON.stringify(todo)
        }).then(this.getTodos(draw));
    }



}