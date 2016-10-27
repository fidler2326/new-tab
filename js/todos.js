App.controller("TodoCtrl", function ($scope, localStorageService) {
  
  // Adds default values to todo list (don't really need this, but 
  // it might be useful for other things like the list of bookmarks)
	// $scope.todos = [
	// 	{ taskName : "Write an Angular js Tutorial for Todo-List" , isDone : false },
	// 	{ taskName : "Update jquer.in" , isDone : false },
	// 	{ taskName : "Create a brand-new Resume" , isDone : false }
	// ];

  // Adds new items to the todo list
	$scope.addTodo = function () {
		$scope.todos.push({taskName : $scope.newTodo , isDone : false });
		$scope.newTodo = "";//Reset the text field.    
	};

  // Delete item
  $scope.deleteTodo = function  (index) {
   $scope.todos.splice(index, 1);
  };

  // Make todo list sortable with drag and drop
  $scope.todoSortable = {
    containment : "parent",//Dont let the user drag outside the parent
    cursor : "move",//Change the cursor icon on drag
    tolerance : "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
  };

  // Store todo items and position in list with local storage
  $scope.init = function  () {
   if (localStorageService.get("todoList")===null) {
    $scope.todos = [
      // { taskName : "Write an Angular js Tutorial for Todo-List" , isDone : false },
      // { taskName : "Update jquer.in" , isDone : false },
      // { taskName : "Create a brand-new Resume" , isDone : false }
    ];
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

  // Edit item name in place
  // App.directive( 'editInPlace', function() {
  //   return {
  //     restrict: 'E',
  //     scope: { value: '=' },
  //     template: '<input class="todoField" type="text" />;',
  //     link: function ( $scope, element, attrs ) {
  //       // Let's get a reference to the input element, as we'll want to reference it.
  //       var inputElement = angular.element( element.children()[1] );

  //       // This directive should have a set class so we can style it.
  //       element.addClass( 'edit-in-place' );

  //       // Initially, we're not editing.
  //       $scope.editing = false;

  //       // ng-dblclick handler to activate edit-in-place
  //       $scope.edit = function () {
  //         $scope.editing = true;

  //         // We control display through a class on the directive itself. See the CSS.
  //         element.addClass( 'active' );

  //         // And we must focus the element.
  //         // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
  //         // we have to reference the first element in the array.
  //         inputElement.focus();
  //       };

  //       // When we leave the input, we're done editing.
  //       inputElement.on("blur",function  () {
  //         $scope.editing = false;
  //         element.removeClass( 'active' );
  //       });

  //     }
  //   };
  // });

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


