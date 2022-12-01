const {localStorage} = require("node-localstorage");
const router = require('express').Router();
//import todo model 
const todoItemsModel = require('../mongodb/todoTaks');
const bodyParser = require("body-parser")



//create first route --add Todo Item to database
router.post('/todos', async (req, res)=>{
  try{
    const newItem = new todoItemsModel({
      item: req.body.item,
      date: req.body.date,
      email: req.body.email
    })

    //save this item in database
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})

//create second route -- get data from database
router.get('/todos', async (req, res)=>{
  try{
    
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let current_date= month+"/"+ date + "/" + year
     console.log("EMAIL"+req.query.email)
    //console.log("EMAIL"+localStorage.getItem('email'))   
    const allTodoItems = await todoItemsModel.find({$and: [{'email':req.query.email,'date':current_date}]});
    
    console.log(allTodoItems)
// prints date & time in YYYY-MM-DD format
    //const allTodoItems =  todoItemsModel.find().populate({match: { date: "2022-11-21"}}).exec();  
    res.status(200).json(allTodoItems)
  }catch(err){
    res.json(err);
  }
})
router.get('/todostomorrow', async (req, res)=>{
  try{
    
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let current_date= month+"/"+ date + "/" + year
    const allTodoItems = await todoItemsModel.find({'email': req.query.email,"date":{$ne:current_date}}).sort({date:1});

// prints date & time in YYYY-MM-DD format
    //const allTodoItems =  todoItemsModel.find().populate({match: { date: "2022-11-21"}}).exec();    
    res.status(200).json(allTodoItems)
  }catch(err){
    res.json(err);
  }
})


//update item
router.put('/todos', async (req, res)=>{
  if(req.body.item!=null){

    todoItemsModel.findByIdAndUpdate(req.body.id,{$set: { "item": req.body.item,"date":req.body.date} }, function(err, result){

        if(err){
          console.log("ERROR")
            res.send(err)
        }
        else{
          console.log("CHECK DB")
            res.send(result)
        }

    })
  }
 
})
router.get('/todo/complete/:id', async (req, res) => {
	const todo = await todoItemsModel.findById(req.params.id);
  if(todo!=null){
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);

  }
	
})



//Delete item from database
router.delete('/todos/:id', async (req, res)=>{
  try{
    //find the item by its id and delete it
    console.log("IN DELETE ID IS "+req.params.id)
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  }catch(err){
    console.log("ERROR OCCURED IN DELETE")
    res.json(err);
  }
 
})


//export router
module.exports = router;