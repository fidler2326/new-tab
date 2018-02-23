App.controller("TodoController", ['$scope', 'localStorageService', function($scope, localStorageService) {
// App.controller("TodoListController", function ($scope, localStorageService) {
  // Adds new items to the todo list
	$scope.addTodo = function () {
		$scope.todos.push({taskName : $scope.newTodo , isDone : false });
		$scope.newTodo = ""; // Reset the text field.
	};

  // Delete item
	$scope.deleteTodo = function  (index) {
		$scope.todos.splice(index, 1);
	};

	// Store todo items and position in list with local storage
	$scope.init = function  () {
		if (localStorageService.get("todoList")===null) {
			$scope.todos = [];
		} else {
			$scope.todos = localStorageService.get("todoList");
		}
	};

  // Check for changes to list and save
  $scope.$watch("todos",function  (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("todoList",angular.toJson(newVal));
		}
  },true);
}]);
