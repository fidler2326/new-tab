angular.module('newtab', []).controller('TodoListController', function() {
    var todoList = this;
    console.log(JSON.parse(localStorage.getItem('todoItem')));
    todoList.todos = [

    ];

    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});

      var todoItems = todoList.todos;
      console.log(todoItems)

      localStorage.setItem('todoItem', JSON.stringify(todoItems));
      console.log(localStorage.getItem('todoItem'));
      todoList.todoText = '';
    };

    // todoList.remaining = function() {
    //   var count = 0;
    //   angular.forEach(todoList.todos, function(todo) {
    //     count += todo.done ? 0 : 1;
    //   });
    //   return count;
    // };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });
