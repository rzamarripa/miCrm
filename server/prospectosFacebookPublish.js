Meteor.publish("prospectoFacebook", function(options){
	return ProspectosFacebook.find({_id:options.id});
});

Meteor.publish("prospectosFacebook",function(options){
	let selector = {
  	nombre: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' },
  	estatus: 1
	}	
	return ProspectosFacebook.find(selector, options.options);
});

Meteor.publish("prospectosFacebookStaff",function(options){
	let selector = {
  	nombre: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' },
  	estatus: options.where.estatus,
  	empleado_id: options.where.empleado_id
	}	
	return ProspectosFacebook.find(selector, options.options);
});

Meteor.publish("prospectosSeguimiento",function(options){
	let selector = {
  	nombre: { '$regex' : '.*' + options.where.nombre || '' + '.*', '$options' : 'i' }
	}	
	return ProspectosFacebook.find(selector, options.options);
});