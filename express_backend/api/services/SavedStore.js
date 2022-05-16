const store = require("./Store")

const SavedStore= function(){
    
}

SavedStore.prototype = Object.create(new store());

module.exports = SavedStore