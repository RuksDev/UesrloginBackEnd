const express = require("express")
const router = express.Router();
const User = require("../models/user")

router.post("/users/login", async (req,res) => {
    try {
       const user = User.findByCredentials(req.body.email, req.body.password)
       res.send(user)
    } catch (error) {
       res.status(401).send() 
    }
})


router.post('/users', async (req, res) => {

    console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// get all users (end point)
//methoed diffarance then can use same raouting path 

router.get("/users", async (req, res)=> {

    try {
        const users = await User.find({}) // can use to find name:sumudu , email:sumudu@gmail.com like this 
        res.status(200).send(users) //sucssessfull     
    } catch (error) {
        res.status(400).send(error)
    }
}) 

//localjost:4005/users/13912839283409jsoijasojjasw8ruwe89ru (id)
router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    
    try {
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send()
        }

            res.status(200).send(user)

    } catch (error) {
            res.status(400).send(error)
    }
    
})

router.patch ("/users/:id", async (req, res) => {
        const _id = req.params.id;

        try {
            const updatedUser = await User.findByIdAndUpdate(_id, req.body, {new:true})

            if (!updatedUser){

                return res.status(404).send()

            }

                res.status(200).send(updatedUser)
        } catch (error) {
                res.status(400).send(error)
            
        }

})

router.delete("/users/:id", async (req,res) => {
        const _id = req.params.id;

        try {
            const deletedUser = await User.findByIdAndDelete(_id)

            if (!deletedUser){

                return res.status(404).send() 
            }

                res.status(200).send(deletedUser)
        } catch (error) {

                res.status(400).send(error)
            
        }
})
module.exports = router;