angular
.module("casserole")
.controller("EmpleadosCtrl", EmpleadosCtrl);
function EmpleadosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
	rc = $reactive(this).attach($scope);
  this.action = true;
	this.subscribe('empleados');
	this.empleado = {};
 
  this.helpers({
	  empleados : () => {
		  return Empleados.find();
	  },
  });
  
  this.nuevo = true;  
  this.nuevoEmpleado = function()
  {
		this.action = true;
    this.nuevo = !this.nuevo;
    this.empleado = {}; 
  };
 
	this.guardar = function(empleado)
	{		
		this.empleado.estatus = true;
		var empleado_id = Empleados.insert(this.empleado);
		Meteor.call("createUsuario", empleado, empleado_id, 'Staff');
		toastr.success('Empleado guardado.');
		empleado = {};
		$('.collapse').collapse('show');
		this.nuevo = true;
		$state.go('root.empleados');
	};
	
	this.editar = function(id)
	{
    this.empleado = Empleados.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(empleado)
	{
		console.log(empleado);
		var idTemp = empleado._id;
		delete empleado._id;		
		Empleados.update({_id:idTemp},{$set:empleado});
		Meteor.call("updateUsuario", empleado, idTemp, 'Staff');
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		var empleado = Empleados.findOne({_id:id});
		if(empleado.estatus == true)
			empleado.estatus = false;
		else
			empleado.estatus = true;
		
		Empleados.update({_id:id}, {$set : {estatus : empleado.estatus}});
	};

	 this.tomarFoto = function(empleado){
		$meteor.getPicture().then(function(data){
			empleado.fotografia = data;
		});
	};

/*
  this.tieneFoto = function(empleado){
		if (typeof empleado.fotografia !== "undefined")
			return true;
		else
			return false;
	}	
*/
};