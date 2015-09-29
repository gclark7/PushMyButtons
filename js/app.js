/*(function() {
    angular.module("cookbook").controller("maincontroller", maincontroller);

    maincontroller.$inject = ["$scope"];


    function maincontroller($scope) {
    	$scope.buttons = [{'msg':'hello'},{'msg':'friend'},{'msg':'family'},{'msg':'love'}];
    	var myDataRef = new Firebase('https://torrid-fire-4757.firebaseio.com/');

		$scope.message = "hello"
		//myDataRef.update({'User':"Theresa",' connected ': "First connection"});

    }
})();*/
'use strict';
console.log('hello Developer');
console.log('hello again');
function mainController($scope, $timeout, $http) {

  //  var myDataRef = new Firebase('https://torrid-fire-4757.firebaseio.com/');
    //var dataButtons = myDataRef.child('buttons');
    //var dataButtons = myDataRef.orderByValue('postNumber');

    var DEFAULT_MESSAGE = 'button';
    var clickCount = 0;

    $scope.message = "Welcome to Push My Buttons: post counts = ";
    $scope.btnMessage = '';
    $scope.clicked = clickCount;
    $scope.addButtonMessage = 'post message';
    $scope.messageClass = 'message';
    $scope.userIconSelection = 'glyphicon glyphicon-user';
    $scope.userIconOptions = [{ 'user': 'generic', 'glyph': 'glyphicon glyphicon-user' }, { 'user': 'plus', 'glyph': 'glyphicon glyphicon-plus' }, { 'user': 'heart', 'glyph': 'glyphicon glyphicon-heart' }];
    $scope.userName = 'anonymous';
    $scope.snapShot = '';
    $scope.postNumber = '';
    $scope.foods = '';
    $scope.selectFoodGroup = '';
    $scope.selectedFoodGroup = '';


    $http.get('http://api.nal.usda.gov/ndb/list?format=json&lt=g&sort=n&api_key=URK4b3LIekz0xGW573lsOiJkpkQsnCB4G1xyeUDE')
    .success(function(response){ $scope.selectFoodGroup = response.list.item;console.log(response.list.item); });

    $http.get('http://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&api_key=URK4b3LIekz0xGW573lsOiJkpkQsnCB4G1xyeUDE')
    .success(function(response){ $scope.foods = response; });

    $scope.selectionMade = function(){
      console.log($scope.selectedFoodGroup);
      console.log('http://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&max=1000&fg='+$scope.selectedFoodGroup+'&api_key=URK4b3LIekz0xGW573lsOiJkpkQsnCB4G1xyeUDE');
      $http.get('http://api.nal.usda.gov/ndb/list?format=json&lt=f&fg='+ $scope.selectedFoodGroup +'&sort=n&max=1000&api_key=URK4b3LIekz0xGW573lsOiJkpkQsnCB4G1xyeUDE')
      .success(function(response){ $scope.foods = response; });
    }
}
