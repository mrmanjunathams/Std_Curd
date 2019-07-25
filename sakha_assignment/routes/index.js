var express = require('express');
var app=express();

var router = express.Router();
var Std=require('../model/student');
//var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });



StudentHandler=require("../handler/StudentHandler");

var Std=require('../model/student');
router.get('/', function(req, res) {
    console.log('inside get');
	// render to views/index.ejs template file
	res.render('index', {title: 'Student database'})
})
    //console.log('welcomwhwjhkjh');
    router.get('/list_students',function (req, res) {
        console.log('welcomwhwjhkjh');
        //var data = new Std();
        StudentHandler.list_students(function (response) {
            
            res.json(response);
            // console.log('datacoming',response);
            // res.render('user/list', {
            //     title: 'student List', 
            //     data: response.data
            // })
            
        });
    });

     router.get('/add', function(req, res, next){	
         // render to views/user/add.ejs
         res.render('user/add', {
             title: 'Add New student',
             usn: '',
         name: '',
            email: '',
            image:'',
            age:	''	
         })
     })
    router.post('/add_student',function (req, res) {
        console.log(req.body,'data from frontend');      
        var data=req.body;
        if(req.files!=null||req.file!=undefined||req.files==''){

        var eventpath=req.files.image;}
        StudentHandler.add_student(data,eventpath,function (response) {
        res.json(response);
        });
    });
    router.get('/get_student/(:id)',  function (req, res) {
        console.log('welcomeeeeeee');
        var data = { usn: req.params.id };
        console.log('data',data)
        StudentHandler.get_student(data,function(response){
            console.log(response.data[0].usn,'opopo');
            // res.render('user/edit', {title: 'Student database',
            // //data: rows[0],
            // usn: response.data[0].usn,
            // name: response.data[0].name,
            // email: response.data[0].email,
            // age: response.data[0].age})
        })
            res.json(response);
           
        });
    
    router.delete('/delete_student/(:id)/(:status)', function (req, res) {
        var data = { usn: req.params.id,status:req.params.status };
        console.log(data,"llll");
        StudentHandler.delete_student(data, function (response) {
            //req.flash('success', 'Data added successfully!')
            res.json(response);
         
        });
    });
    
    router.post('/update_student/(:id)',  function (req, res) {
        console.log('welomeee')
        var usn={ usn: req.params.id }
        var data=new Std(req.body)
        console.log('usn coming',usn,'lsa',data);
        
        StudentHandler.update_student(usn,data,function (response) {
           
            res.json(response);
        });
    });

    
    
    module.exports= router;

