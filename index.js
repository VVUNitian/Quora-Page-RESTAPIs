const express= require("express");
const app=express();
const port=8080;
const path=require("path");
const  methodOverride = require('method-override');//always include these...require and

 app.use(methodOverride('_method'));//app.use for every package imported.
const { v4: uuidv4 } = require('uuid');//uuid ko require karne ke liye....
app.use(express.urlencoded({extended: true}));//used to parse urlencoded data...
let posts=[
    {id:uuidv4(),username:"@apnacollege",
    content:"This is nice restful api project..."}
,   {id:uuidv4(),username:"@bibhunitian",
    content:"Eagerly lookin forward to get my internship in 2nd year"},
    {id:uuidv4(),username:"@vvu",content:"I have done specialization in Backend development..."} ];

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

app.listen(port,()=>{
    console.log("Listening on port 8080");
});

// app.get("/",(req,res)=>{
//     console.log("Server working perfectly..");
//     res.send("Hello this is my webserver");
// });

app.get("/posts",(req,res)=>{
    res.render("app.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("newpost.ejs");
});

app.post("/posts", (req,res) => {
    let {username, content}=req.body ;
    posts.push({id :uuidv4(),username , content}) ;
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params ;
    console.log(id);
    //console.log(posts);
    let postid=posts.find((p)=>{return id === p.id ;});//find function important....//error line...
    //console.log(postid);
    res.render("detailedshow.ejs",{ postid });
});

app.get("/newposts/:id",(req,res)=>{
    let {id}=req.params ;
    let postid=posts.find((p)=>{return id === p.id ;});
    res.render("updateroute.ejs",{postid});
});

app.patch("/posts/:id", (req,res) => {
    let {id}=req.params;//important very very very...not req.body but req.params..
    let postid=posts.find((p)=>{return id === p.id ;});
    let newposts=req.body.content;//very important..
    postid.content=newposts;//very important...
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params ;
    console.log(id);
    posts=posts.filter((p)=>(id !== p.id));
    console.log(posts);
    //res.render("app.ejs",{posts}); unnessecary not needed....
    res.redirect("/posts");
});
