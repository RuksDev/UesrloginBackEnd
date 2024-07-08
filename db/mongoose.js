const mongoose = require("mongoose")

const mongoDBURL = "mongodb+srv://kasunrukshan0:UzuDgOtysR8jpVKX@cluster0.syjscbf.mongodb.net/mydatabase"
mongoose.connect(mongoDBURL, {

    useNewUrlParser :true,
    useUnifiedTopology:true,
})

mongoose.connection.once ("open", ()=> {

    console.log("MongoDB Connceted")
})

