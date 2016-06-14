angular.module("casserole").controller("RootCtrl", ['$scope', '$meteor', function ($scope, $meteor)
{
  $scope.isLoggedIn = function(){
	  return Meteor.user();
  } 
  
  $scope.isAdmin = function(){
	  if(Meteor.user()){
		  if(Meteor.user().roles[0] != 'Staff'){
			  return true;
		  }else{
			  return false;
		  }
	  }	  
  }
}]);