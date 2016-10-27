App.controller("BookmarkCtrl", function ($scope, localStorageService) {
  
  // Adds default values to todo list (don't really need this, but 
  // it might be useful for other things like the list of bookmarks)
  // $scope.bookmarks = [
  //   { bookmarkName : "Write an Angular js Tutorial for Todo-List", bookmarkUrl : "www.exampleurl.co.uk" },
  //   { bookmarkName : "Update jquer.in", bookmarkUrl : "www.exampleurl.co.uk" },
  //   { bookmarkName : "Create a brand-new Resume", bookmarkUrl : "www.exampleurl.co.uk" }
  // ];

  // Adds new items to the todo list
  $scope.addBookmark = function () {
    $scope.bookmarks.push({bookmarkName : $scope.newBookmarkName, bookmarkUrl : $scope.newBookmarkUrl });
    $scope.newBookmarkName = "";//Reset the text field.
    $scope.newBookmarkUrl = "";//Reset the text field.
  };

  // Delete item
  $scope.deleteBookmark = function  (index) {
   $scope.bookmarks.splice(index, 1);
  };

  // Store todo items and position in list with local storage
  $scope.init = function  () {
   if (localStorageService.get("bookmarkList")===null) {
    $scope.bookmarks = [
      // { bookmarkName : "Write an Angular js Tutorial for Todo-List", bookmarkUrl : "www.exampleurl.co.uk" },
      // { bookmarkName : "Update jquer.in", bookmarkUrl : "www.exampleurl.co.uk" },
      // { bookmarkName : "Create a brand-new Resume", bookmarkUrl : "www.exampleurl.co.uk" }
    ];
   }else{
     $scope.bookmarks = localStorageService.get("bookmarkList");
   }
  };
  // Check for changes to list and save
  $scope.$watch("bookmarks",function  (newVal,oldVal) {
   if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
    localStorageService.add("bookmarkList",angular.toJson(newVal));
   }
  },true);

});