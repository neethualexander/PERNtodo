const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors()); 
app.use(express.json());

const port = 3001;

// Create a todo
app.post('/todos', async (req, res) => {
  try {
    const  {description}  = req.body;
    console.log(req.body);

    console.log(description);
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
}); 

// Get all todos (Placeholder - You need to implement this route)
app.get("/todos",async(req,res)=>{
  try{
    const allTodos=await pool.query("SELECT * FROM todo");
  res.json(allTodos.rows);
  }catch(err){
    console.error(err.message);
  }
})

// Get a todo by ID (Placeholder - You need to implement this route)

app.get("/todos/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const todo= await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
          res.json(todo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

// Update a todo by ID (Placeholder - You need to implement this route)
app.put("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {description}=req.body;
        const updateTodo=await pool.query("UPDATE todo SET description = $1 where todo_id=$2",
        [description,id])
    res.json("TODO was updated");}
    catch{
        console.error(err.message)
    }
})
// Delete a todo by ID (Placeholder - You need to implement this route
app.delete("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteTodo=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id] )
        res.json("TODO was deleted");}
        catch{
            console.error(err.message)
}})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 