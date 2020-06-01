var mongoose  =require("mongoose");
var passportLocalMoongoose =  require('passport-local-mongoose');
 


var UserSchema  = new mongoose.Schema({
    username : String,
    password: String
});



UserSchema.plugin(passportLocalMoongoose);


module.exports = mongoose.model("User",UserSchema);
 
