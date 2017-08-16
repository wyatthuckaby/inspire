function TodoController() {

    var service = new TodoService();


    function drawTodo(items) {
        //draw todo list
        var template = ``;
        var templateChecked = ``;

        console.log(items);
        items.forEach((item) => {
            if (item.display) {
                if (item.checked) {
                    template += `
                        <h3> ${item.text} 
                        <input type="checkbox" name="${item._id}" onclick="app.controllers.todoController.toggle(this)" checked> 
                        <button class="form-control" name="${item._id}" onclick="app.controllers.todoController.deleteTodo(this)">Delete </button></h3>
                    `;
                } else {
                    template += `
                        <h3> ${item.text} <input type="checkbox" name="${item._id}" onclick="app.controllers.todoController.toggle(this)">
                        <button class="form-control" name="${item._id}" onclick="app.controllers.todoController.deleteTodo(this)">Delete </button></h3>
                    `;
                }

            }
        });


        document.getElementById("todoList").innerHTML = template;
        document.getElementById("todoListChecked").innerHTML = templateChecked;
    }


    this.toggle = function(box) {
        service.toggleTodoStatus(box.getAttribute("name"), drawTodo);
    }
    this.addTodo = function(e) {
        e.preventDefault();

        var form = e.target;
        var todo = {
            text: form.todoAddBox.value,
            checked: false,
            display: true
        }
        service.addTodo(todo, drawTodo);

    }
    this.deleteTodo = function(item) {
        service.removeTodo(item.getAttribute("name"), drawTodo);
    }


    service.getTodos(drawTodo)

}