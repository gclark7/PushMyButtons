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

function mainController($scope, $timeout) {
    var myDataRef = new Firebase('https://torrid-fire-4757.firebaseio.com/');
    var dataButtons = myDataRef.child('buttons');
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
    //$scope.postNumber = '';

    //an initial button
    $scope.buttons = [//need to read in firebase data but this is text for now
    { '-staticStartingButton': { 'button': { 'userName': 'moderator', 'glyph': 'glyphicon glyphicon-user', 'msg': 'your button', 'drag': 'true' } } }
    /*{'msg':'hello','glyph':'glyphicon glyphicon-user'},
    {'msg':'friend','glyph':'glyphicon glyphicon-user'},
    {'msg':'family','glyph':'glyphicon glyphicon-user'},
    {'msg':'love','glyph':'glyphicon glyphicon-user'}
    */
    ];

    //new data to database
    $scope.addButton = function () {
        $scope.clicked = ++clickCount;
        //var x = clickCount;
        // $scope.buttons.push({'msg':'added','glyph':'glyphicon glyphicon-plus'});
        //myDataRef.update({'buttons':{'button':{'msg':'addedeed','glyph':'glyphicon glyphicon-plus'}}});
        //$scope.buttons =
        //dataButtons.push(
        //dataButtons.push({ 'button': { 'msg': $scope.btnMessage, 'glyph': 'glyphicon glyphicon-plus', 'drag': 'true' } });
        dataButtons.push({ 'button':
            {
                'userName': $scope.userName,
                'msg': $scope.btnMessage,
                'glyph': $scope.userIconSelection,
                'drag': 'true',
                'postNumber': Firebase.ServerValue.TIMESTAMP //$postNumber
            }
        });


        //myDataRef.update('User ' + "Greg" + ' First ' + "connection");
    };

    //this block did not update the view with the new post
    /*myDataRef.on("child_added", function(snapshot,prevChildKey) {
    // dataButtons.on("child_added", function(snapshot,prevChildKey) {
        //$scope.snapShot = snapshot.val();
        //$scope.buttons = dataButtons; //justAdded.buttons;
        //$scope.buttons = [snapshot.val()];
        $scope.buttons = [snapshot.val()];
    });*/

    //this block updates local user's view with the change, but does not update other users
    myDataRef.on("value", function (snapshot) {
    //dataButtons.on("value", function (snapshot) {
        console.log(snapshot.val());
        //$scope.snapShot = myDataRef.limitToLast(1);
        //$scope.snapShot = dataButtons.limitToLast(1);
        $timeout(function () {
            $scope.buttons = snapshot.val() // works to post buttons
            $scope.btnMessage = '';
            window.location.hash = '#notREal';
            window.location.hash = '#lastPost'
            document.getElementById('btnMessage').focus();

            //$scope.buttons = snapshot.val().child('buttons');
            //$scope.buttons = myDataRef.child('buttons');
            //document.getElementById('lastPost').focus();
        }, 0);
        //$scope.buttons = snapshot.name();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        $scope.message = 'Data failed to load ' + errorObject.code;
    });
}
