const express = require('express')
const router = express.Router()
const User = require('../models/Mng')
const passport = require('passport')
const multer = require("multer")
const roles = require('../middleware/roles')
const Roles = require('../middleware/roles') 

// configure multer 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png') 
    }
  })
  
  var upload = multer({ storage: storage })
// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}
//  login user view 
router.get('/login', (req,res)=> {
    res.render('user/login', {
        error: req.flash('error')
    })
})

// login post request 
router.post('/login',
  passport.authenticate('local.login', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/login',
      failureFlash: true })
      )


// sign up form 
router.get('/signup', (req,res)=> {
    res.render('user/signup', {
        error: req.flash('error')
    })
})

// sign up post request

router.post('/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/signup',
      failureFlash: true })
      )

// progile 
router.get('/profile',isAuthenticated, (req,res)=> {

res.render('user/profile', {
    success: req.flash('success')
})
  

})

//upload user avatar

router.post('/uploadAvatar', upload.single('avatar'), (req,res)=> {
    
    let newFields = {
        avatar: req.file.filename
    }
    User.updateOne( {_id: req.user._id}, newFields, (err)=> {
        if (!err) {
            res.redirect('/users/profile')
        }

    } )
})

// logout user

router.get('/logout', (req,res)=> {
    req.logout();
    res.redirect('/users/login');
})

//get create user
router.get('/emps_list',isAuthenticated,Roles.admin ,async (req,res)=> {
    let emps = await User.find({})
    console.log(emps)
    res.render('user/emps_list', {
        emps: emps,
        error: req.flash('error')
    })
})

router.get('/showEmp/:id',isAuthenticated,Roles.admin ,async (req,res)=> {
    try{

        let emp = await User.find({'_id' : req.params.id})
        console.log(emp)
        res.render('user/show_emp.ejs', {
            emp: emp,
            error: req.flash('error')
        })
    }catch(err){
        res.json(err)
    }
})

router.post('/updateEmp',Roles.admin ,async (req,res)=> {
    try{
        let newUser = new User()
        // without password change 
        if(req.body.old_password == "" && req.body.new_password == ""){
            object = {
                email : req.body.email,
                role : req.body.role
            }           
                await User.findOneAndUpdate({_id : req.body.emp_id} , object)
            
        }else{
            let user =  await User.findOne({_id: req.body.emp_id})

            if (user.comparePasswords(req.body.old_password, user.password)) {

                object = {
                    email : req.body.email,
                    password : newUser.hashPassword(req.body.new_password),
                    role : req.body.role
                }
                await User.findOneAndUpdate({_id : req.body.emp_id} , object)
                 res.redirect('/users/emps_list')
            } else{
                res.json("error not the same password ")
            }
            
            
        }
    }catch(err){
        console.log(err)
    }
    
})

router.get('/deleteEmp/:id',isAuthenticated,Roles.admin ,async (req,res)=> {
    try{

         await User.findOneAndDelete({'_id' : req.params.id})
        
        
         res.redirect('/users/emps_list')
    }catch(err){
        res.json(err)
    }
})
module.exports = router