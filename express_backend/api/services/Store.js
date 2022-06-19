/*
InMemory data store
*/
var Store = function () {
  
  this.values = []
   
};

Store.prototype.add = function (value) {

  for (var i = 0; i < arguments.length; i++) {
    if(arguments[i] !== undefined && arguments[i]!== null){
      this.values.push(arguments[i]);
    }
  }

}

Store.prototype.find =  function (filterFunc) {
  var result = this.values.filter((val) => filterFunc(val));

  return result;
}

Store.prototype.getAll =  function () {
  return Array.from(this.values);
}



Store.prototype.delete =  function (filterFunc) {
  var index = this.values.findIndex((value) => {
    return filterFunc(value);
  });

  if (index === -1) {
   return
  }

  this.values.splice(index, 1);
}


module.exports = Store;
