angular.module("casserole")
.controller("ProspectosFacebookCtrl", ProspectosFacebookCtrl);  
 function ProspectosFacebookCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope); 	
 	
  this.action = true;
  
  this.prospecto = {};
  
  this.prospecto.tipoComidasSeleccionadas = [];
  
  this.tipoComidas = [
    'Comida Mexicana',
    'Comida Mediterranea',
    'Comida Oriental',
    'Comida Internacional', 
    'Comida Vegetariana',
    'Repostería',
    'Enología y Coctelería'
  ];  
  
  
  this.buscar = {};
  this.buscar.nombre = '';

	this.subscribe('prospectosFacebook', () => {
    return [{
	    options : { limit: 10 },
	    where : { nombre : this.getReactively('buscar.nombre'), estatus : 2 }
    }] ;
  });
  
  this.subscribe("empleados");
  
  this.subscribe("etapaVenta", () =>{
	  return [{orden : "1", estatus : true}]
  });
  
  this.subscribe('prospectoFacebook', () => {
    return [{
	    id : $stateParams.id
    }];
  });
  
  this.helpers({
	  prospectosFacebook : () => {
		  return ProspectosFacebook.find();
	  },
	  empleados : () => {
		  return Empleados.find();
	  },
	  etapaVenta : () => {
		  return EtapasVenta.findOne();
	  }
  });
//   esp_casserole@hotmail.com
  this.guardar = function(prospecto)
	{
		console.log('mlp')
		Meteor.call('sendEmail',
            'juancarlos_r11@hotmail.com',
            'carlos.masoft@gmail.com',
            'Prospecto Casserole CRM',
            '<h1>Prospecto Casserole CRM</h1><br/>'+
            '<p>¿Cual es tu objetivo en Casserole?</p>'+
            '<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.prospecto.quieroSer+'</h3>'+
            '<p>¿Que te gustaria aprender?</p>'+
            '<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.prospecto.tipoComidasSeleccionadas+'</h3>'+
            '<p>Quieres estudiar ...</p>'+
            '<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.prospecto.estudioInteres+'</h3>'+
            '<p>Informacion Adicional</p>'+
            '<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.prospecto.informacion+'</h3>'+
            '<p>Nombre del contacto</p>'+
            '<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.prospecto.nombre+'</h3>'+
            '<p>Fecha de Nacimiento</p>'+
            '<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.prospecto.fechaNac+'</h3>'+
            '<p>Correo</p>'+
            '<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.prospecto.correo+'</h3>'+
            '<p>Teléfono</p>'+
            '<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.prospecto.telefono+'</h3>'
            );
		this.prospecto.estatus = 1;
		this.prospecto.fecha = new Date();
		this.prospecto.etapaVenta_id = this.etapaVenta._id;
		ProspectosFacebook.insert(this.prospecto);
		toastr.success('prospecto guardado.');
		this.prospecto = {}; 
		$('.collapse').collapse('hide');
		$state.go('anon.graciasFacebook');
	};
	
	this.asignar = function(prospecto, empleado_id) {
    ProspectosFacebook.update({ _id: prospecto._id }, { $set : { empleado_id : empleado_id, estatus : 2 } } );
	}
	
	this.editar = function(id)
	{
    this.prospecto = ProspectosFacebook.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(prospecto)
	{
		var idTemp = prospecto._id;
		delete prospecto._id;		
		ProspectosFacebook.update({_id:idTemp},{$set:prospecto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.eliminar = function(prospecto){
		ProspectosFacebook.remove({_id : prospecto._id});		
	}

	this.cambiarEstatus = function(id)
	{
		var prospecto = prospectos.findOne({_id:id});
		if(prospecto.estatus == true)
			prospecto.estatus = false;
		else
			prospecto.estatus = true;
		
		ProspectosFacebook.update({_id: id},{$set :  {estatus : prospecto.estatus}});
  };		
};

