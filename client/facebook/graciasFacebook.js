angular.module("casserole")
.controller("GraciasFacebookCtrl", GraciasFacebookCtrl);  
 function GraciasFacebookCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	rc = $reactive(this).attach($scope);
  
  this.subscribe('noticias'); 
  
  
  this.helpers({
	  noticias : () => {
		  return Noticias.find({});
	  },
  });
  
  this.fechaActual = new Date();  
		
};
