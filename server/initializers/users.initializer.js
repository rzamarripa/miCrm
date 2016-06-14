Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    var usuario_id = Accounts.createUser({
      username: 'zama',
      password: '123',
      profile: {
	      nombre:"Administrador"	      
      }
    });
    
    Roles.addUsersToRoles(usuario_id, "Admin");
  }
});
