angular.module("casserole")
.controller("UsuariosCtrl", UsuariosCtrl);  
 function UsuariosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $rootScope){
 	let rc =$reactive(this).attach($scope);
    this.action = true;
    
    
    this.subscribe('usuarios',()=>{
		return [{estatus:true}]
	});

	

	this.helpers({
	  usuarios : () => {
		  return Usuarios.find();
	  },
	 

  });
  	  
  this.nuevo = true;	  
  this.nuevoUsuario = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    rc.usuario = {};		
  };
  
  
this.guardar = function(usuario)
	{		
		rc.usuario.estatus = true;
		var empleado_id = Usuarios.insert(rc.usuario);
		Meteor.call("createUsuario", rc.usuario, empleado_id, 'administrador');
		toastr.success('Admin guardado.');
		usuario = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.usuarios');
	};

	
	this.editar = function(id)
	{
    this.usuario = Usuarios.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	
		this.actualizar = function(usuario)
	{
		var idTemp = usuario._id;
		delete usuario._id;
		console.log(usuario);		


		Usuarios.update({_id:idTemp},{$set:usuario});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var usuario = Usuarios.findOne({_id:id});
		if(usuario.estatus == true)
			usuario.estatus = false;
		else
			usuario.estatus = true;
		
		Usuarios.update({_id: id},{$set :  {estatus : usuario.estatus}});
		
    };
    
     this.tomarFoto = function(usuario){
		 $meteor.getPicture().then(function(data){
			usuario.fotografia = data;
		});
	};
    
    };