var Store = function () {
  
  this.values = []
   
};

Store.prototype.add = function (value) {
  if (value !== undefined) {
    this.values.push(value);
  }
}

Store.prototype.find =  function (filterFunc) {
  var result = this.values.filter((val) => filterFunc(val));

  return result;
}

Store.prototype.get =  function () {
  return this.values;
}

Store.prototype.delete =  function (deleteCallback) {
  var index = values.findIndex((value) => {
    return deleteCallback(value);
  });

  if (index !== -1) {
    this.values.splice(index, 1);
  }
}


module.exports = Store;
