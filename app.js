        var express  = require("express"),
        app          =         express();
        var mongoose =require("mongoose");
        var passport = require("passport"),
        bodyParser= require("body-parser"),
        LocalStrategy =  require("passport-local"),
        passportLocalManager =  require("passport-local-mongoose");

  var User = require("./models/user");
 mongoose.connect("mongodb://localhost/auth_demo");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
      


                  

     
     app.use(require("express-session")({

    secret:"Rusty is the best dog", 
    resave: false,
    saveUnintialised : false


     })) ;   
              

     app.use(passport.initialize());  //intializing passsport
     app.use(passport.session());    //passport session
     passport.use(new LocalStrategy (User.authenticate));

   

     passport.serializeUser(User.serializeUser());
     passport.deserializeUser(User.deserializeUser());


//routes 
app.get("/",(req,res)=>{
    res.render("home");
    });


app.get("/register",(req,res)=>{
 
res.render("register");


});

app.post("/register",(req,res)=>{

  
user1 =req.body.username;
pass   = req.body.password;

User.register(new User({username:user1}),pass,(err,user)=>{
if(err)
{
    console.log(err);
    return res.render("register");
}

passport.authenticate("local")(req,res ,function(){
res.redirect("/seceret");

});

});
    
    
    });



app.get("/login",(req,res)=>{

res.render("login");

});



app.post("/login",passport.authenticate("local",{
    successRedirect:"/seceret",
    failureRedirect:"/login"
}),(req,res)=>{

    
    });

app.get("/logout",(req,res)=>{
res.logout();
res.redirect("/");


});






    
                           

                            app.get("/seceret",(req,res)=>{


                            res.render("seceret");
                            });

   function isLoggedIn(req,res,next){

    if(req.isAuthenticated()){


        return next();
    }
res.redirect('/login');


   };





                        app.listen("5000",()=>{
                        console.log("APP STARTED");
                        });