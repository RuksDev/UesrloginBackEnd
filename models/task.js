//description : "String "
//complete or not : boolean 

const mongoose = require("monggose");
const Schema = mongoose.Schema
const taskSchema = new Schema ({
    description: {
        type : String,
        status: boolean, 
    }
});



const Task = mongoose.model("Task", taskSchema);

module.exports = Task;