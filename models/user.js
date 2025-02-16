

const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs")
 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true ,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required : true,
    }
});

userSchema.pre("save", async function (next){
    const user = this;  

    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email})

    if(!user){
        throw new Error()
    }

    const isMatch = await bcrypt.compare (password, user.password)

    if(!isMatch){
        throw new Error()
    }

    return user; 

}

const User = mongoose.model("User", userSchema);

module.exports = User;
  