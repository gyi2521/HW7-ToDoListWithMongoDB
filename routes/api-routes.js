const toDoList = require('../models/toDoList.js');
let nextId = 0;

module.exports = function (app) {

    app.get('/api/toDo', function (req, res) {
        console.log(toDoList);
        return res.json(toDoList);       
    });

    app.post('/api/toDo', function (req, res) {

        toDoList.push({itemId: nextId, done: false, task: req.body.task});
        nextId++;
        const confirmation = {success: true}
        
        return res.json(confirmation);
    });

    app.delete('/api/toDo/:index', function (req, res) {
        console.log(req.params.index);
        let taskLoc = toDoList.findIndex(e => e.itemId == req.params.index);
        console.log(taskLoc);
        
        let confirmation = {success: false};
        if (taskLoc > -1){
            toDoList.splice(taskLoc,1);
            confirmation = {success: true};
         } 
         console.log(confirmation);
        return res.json(confirmation); 
        
    });

    app.put('/api/toDo', function (req, res) {
        let foundTask = toDoList.find(e => e.itemId == req.body.itemId);
        if (foundTask != null) { 
            if(req.body.done == 'false')
                foundTask.done = false;
            else
                foundTask.done = true;
            const confirmation = {success: true};
            return res.json(confirmation);
        }else{
            const confirmation = {success: false};
            return res.json(confirmation);
        }
    });
}