const { Schema, model } =require( "mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  role:{
    type:String,
    default:"user"
  }
});
const user = model("User", userSchema);
module.exports = user;
