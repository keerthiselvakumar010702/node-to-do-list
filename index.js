const express = require("express");
const app = express();
const port = 3000;

const {signUp,login,create}=require("../js-task-2/controllers/userController");
const {getme}=require("./middleware/authenticate");
const {todocreate,todoupdate,todoread,tododelete}=require("./controllers/todoController");
const { validateTodo, validateUser } = require("./middleware/validate");
const { errorHandler } = require("./middleware/errorHandler");

app.use(express.json());


app.post("/signUp", validateUser, signUp, create);
app.post("/login", login);
app.post("/create", validateUser, create);

app.post("/todocreate",validateTodo,getme,todocreate);
app.get("/todoread/:todo_id",getme,todoread);
app.delete("/tododelete/:todo_id",validateTodo,getme,tododelete);
app.put("/todoupdate/:todo_id",validateTodo,getme,todoupdate);

app.listen(port, () => console.log(`Listening on port ${port}..`));