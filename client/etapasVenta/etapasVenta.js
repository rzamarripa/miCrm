angular
.module("casserole")
.controller("EtapasVentaCtrl", EtapasVentaCtrl);
function EtapasVentaCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('etapasVenta');
	this.etapaVenta = {};
 
  this.helpers({
	  etapasVenta : () => {
		  return EtapasVenta.find();
	  },
  });
  
  this.nuevo = true;  
  this.nuevaEtapaVenta = function()
  {
		this.action = true;
    this.nuevo = !this.nuevo;
    this.etapaVenta = {}; 
  };
 
	this.guardar = function(etapaVenta)
	{		
		this.etapaVenta.estatus = true;
		console.log(this.etapaVenta);
		EtapasVenta.insert(this.etapaVenta);
		toastr.success('Etapa de venta guardada.');
		this.etapaVenta = {};
		$('.collapse').collapse('show');
		this.nuevo = true;
		$state.go('root.etapasVenta');
	};
	
	this.editar = function(id)
	{
    this.etapaVenta = EtapasVenta.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(etapaVenta)
	{
		var idTemp = etapaVenta._id;
		delete etapaVenta._id;		
		EtapasVenta.update({_id:idTemp},{$set:etapaVenta});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		var etapaVenta = EtapasVenta.findOne({_id:id});
		if(etapaVenta.estatus == true)
			etapaVenta.estatus = false;
		else
			etapaVenta.estatus = true;
		
		EtapasVenta.update({_id:id}, {$set : {estatus : etapaVenta.estatus}});
	};
};