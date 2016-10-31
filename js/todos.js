App.controller("TodoListController", function ($scope, localStorageService) {

  // Adds new items to the todo list
	$scope.addTodo = function () {
		$scope.todos.push({taskName : $scope.newTodo , isDone : false });
		$scope.newTodo = ""; // Reset the text field.
	};

  // Delete item
  $scope.deleteTodo = function  (index) {
   $scope.todos.splice(index, 1);
  };

  // Make todo list sortable with drag and drop
  $scope.todoSortable = {
    containment : "parent", // Dont let the user drag outside the parent
    cursor : "move", // Change the cursor icon on drag
    tolerance : "pointer" // Read http://api.jqueryui.com/sortable/#option-tolerance
  };

  // Store todo items and position in list with local storage
  $scope.init = function  () {
   if (localStorageService.get("todoList")===null) {
    $scope.todos = [];
   }else{
     $scope.todos = localStorageService.get("todoList");
   }
  };
  // Check for changes to list and save
  $scope.$watch("todos",function  (newVal,oldVal) {
   if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
    localStorageService.add("todoList",angular.toJson(newVal));
   }
    isChecked();
    notChecked();
  },true);

});

function isChecked() {
  if($('input.todo-checkbox:checked').is(':checked')) {
    $('input.todo-checkbox:checked').parent('li').css('text-decoration','line-through');
    $('input.todo-checkbox:checked').next('label').addClass('active');
  }
}

function notChecked() {
  $('input.todo-checkbox').not(':checked').parent('li').css('text-decoration','none');
  $('input.todo-checkbox').not(':checked').next('label').removeClass('active');
}

$(document).ready(function(){
  // Check to do checkboxes
  isChecked();
  notChecked();

  $('input.todo-checkbox').change(function(){
    isChecked();
    notChecked();
  });
});
