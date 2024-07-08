const express = require("express")
const router = express.Router();
const Task = require("../models/task");
const { isValidObjectId } = require("mongoose");


router.post('/tasks', async (req, res) => {
    const task = new Task({
        ...req.body,
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/tasks/:id", async (req,res) =>{

    try {
        const tasks = await Task.find({owner: req.params.id});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/tasks/single/:id", async (req, res) => {
    const _id = req.params.id;
    console.log(_id);

    try {
        const task = await Task.findOne({ _id });
        //should check owener id also 
        if(!task){
            return res.status(404).send();
        }
        res.send(task);

    } catch (error) {
        res.status(500).send();
        
    }
});

router.patch("/tasks/:id", async (req,res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    });

    if(!isValidOperation) { 
        res.send ({Error : "INVALID OPERATION!"});
    }

    try {
        //Should chekc owner id also
         const task = await Task.findbyIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!task) {
            return res.status(404).send();
        }
    } catch (error) {
            res.status(500).send();
        }
});


router.delete("/tasks/:id", async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id:req.params.id,
        })

        if (!task) {
            return res.status(404).send();
            
        }
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});
module.exports = router;