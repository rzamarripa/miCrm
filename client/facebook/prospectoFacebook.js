angular.module("casserole")
.controller("ProspectoFacebookCtrl", ProspectoFacebookCtrl);  
 function ProspectoFacebookCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	rc = $reactive(this).attach($scope);
  
  this.subscribe('prospectoFacebook', () => {
	  console.log($stateParams.id);
    return [{
	    id : $stateParams.id
    }];
  });
  
  this.subscribe('etapasVenta');
  
  this.subscribe('llamadas', () => {
    return [{
	    id : $stateParams.id
    }];
  });
  
  this.subscribe('reuniones', () => {
    return [{
	    id : $stateParams.id
    }];
  });
  
  this.subscribe('tareas', () => {
    return [{
	    id : $stateParams.id
    }];
  });
  
  this.helpers({
	  prospecto : () => {
		  return ProspectosFacebook.findOne({});
	  },
	  llamadas : () => {
		  return Llamadas.find();
	  },
	  reuniones : () => {
		  return Reuniones.find();
	  },
	  tareas : () => {
		  return Tareas.find();
	  },
	  etapasVenta : () => {
		  return EtapasVenta.find();
	  }
  });
  
  this.nuevaLlamada = true;
  this.llamada = {};
  this.reunion = {};
  this.Tarea = {};
  this.fechaActual = new Date();
  this.actionLlamada = true;
  this.actionReunion = true;
  this.actionTarea = true;
  
  this.tipoComidas = [
    'Comida Mexicana',
    'Comida Mediterranea',
    'Comida Oriental',
    'Comida Internacional', 
    'Comida Vegetariana',
    'Repostería',
    'Enología y Coctelería'
  ]; 
    
  // Prospecto
	
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

	this.cambiarEstatus = function(id)
	{
		var prospecto = prospectos.findOne({_id:id});
		if(prospecto.estatus == true)
			prospecto.estatus = false;
		else
			prospecto.estatus = true;
		
		ProspectosFacebook.update({_id: id},{$set :  {estatus : prospecto.estatus}});
  };  
  
  this.tomarFoto = function () {
		$meteor.getPicture().then(function(data){			
			rc.prospecto.fotografia = data;
		})
	};
	
	this.cambiarEtapaVenta = function(etapaVenta){
		console.log(etapaVenta);
	}
  
  // Llamadas
  
  this.guardarLlamada = function(llamada){
	  llamada.prospecto_id = $stateParams.id;
	  Llamadas.insert(llamada);
	  this.llamada = {};
	  $('.collapseLlamada').collapse('hide');
  };
  
  this.editarLlamada = function(llamada)
	{
    this.llamada = llamada
    this.actionLlamada = false;
		$('.collapseLlamada').collapse('show');
	};
	
	this.actualizarLlamada = function(llamada)
	{
		var idTemp = llamada._id;
		delete llamada._id;	
		delete llamada.$$hashKey;	
		Llamadas.update({_id:idTemp},{$set:llamada});
		$('.collapseLlamada').collapse('hide');
		this.actionLlamada = true;
	};
  
  // Reuniones
  
  this.guardarReunion = function(reunion){
	  reunion.prospecto_id = $stateParams.id;
	  Reuniones.insert(reunion);
	  this.reunion = {};
	  $('.collapseReunion').collapse('hide');
  }
  
  this.editarReunion = function(reunion)
	{
    this.reunion = reunion;
    this.actionReunion = false;
		$('.collapseReunion').collapse('show');
	};
	
	this.actualizarReunion = function(reunion)
	{
		var idTemp = reunion._id;
		delete reunion._id;		
		delete reunion.$$hashKey;	
		Reuniones.update({_id:idTemp},{$set:reunion});
		$('.collapseReunion').collapse('hide');
		this.actionReunion = true;
	};
  
  // Tareas
  
  this.guardarTarea = function(tarea){
	  tarea.prospecto_id = $stateParams.id;
	  Tareas.insert(tarea);
	  this.tarea = {};
	  $('.collapseTarea').collapse('hide');
  }
  
  this.editarTarea = function(tarea)
	{
    this.tarea = tarea
    this.actionTarea = false;
		$('.collapseTarea').collapse('show');
    this.actionTarea = false;
	};
	
	this.actualizarTarea = function(tarea)
	{
		var idTemp = tarea._id;
		delete tarea._id;		
		delete tarea.$$hashKey;	
		Tareas.update({_id:idTemp},{$set:tarea});
		$('.collapseTarea').collapse('hide');
		this.actionTarea = true;
	};
		
};
