Meteor.methods({
  createUsuario: function (usuario, empleado_id, rol) {
	  console.log(usuario);
		var usuario_id = Accounts.createUser({
			username: usuario.nombreUsuario,
			password: usuario.contrasena,			
			profile: {
				empleado_id: empleado_id,
				email: usuario.correo,
				nombre: usuario.nombre,
				apellidos: usuario.apPaterno + " " + usuario.apMaterno,
				nombreCompleto : usuario.nombre  + " " + usuario.apPaterno + " " + usuario.apMaterno,
				fotografia : usuario.fotografia
			}
		});
		
		Roles.addUsersToRoles(usuario_id, rol);
		
	},
	userIsInRole: function(usuario, rol, grupo, vista){
		if (!Roles.userIsInRole(usuario, rol, grupo)) {
	    throw new Meteor.Error(403, "Usted no tiene permiso para entrar a " + vista);
	  }
	},
	updateUsuario: function (usuario, id, rol) {
		console.log(id);
	  console.log(usuario.password);
	  Meteor.users.update({_id: id}, {$set:{
			username: usuario.nombreUsuario,
			profile: {
				email: usuario.correo,
				nombre: usuario.nombre,
				apellidos: usuario.apPaterno + " " + usuario.apMaterno,
				nombreCompleto : usuario.nombre  + " " + usuario.apPaterno + " " + usuario.apMaterno,
				fotografia : usuario.fotografia
			}
		}});
		
		Accounts.setPassword(id, usuario.contrasena, {logout: false});		
	}
});