Empleados 						= new Mongo.Collection("empleados");
Empleados.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});