var conn = require('../db');
var Std = require('../model/student');
module.exports = {
    get_student: function (data, callback) {
        console.log('my kshdsd', data);

        console.log('gsggds', data);

        conn.query("Select * from student where usn = ? ", data.usn, function (err, res) {

            if (res.length == 0) {
                console.log("error: ", err);
                callback({
                    statuscode: 404,
                    msg: "student not found"

                });


            } else if (err) {
                callback({
                    statuscode: 500,
                    msg: "internal server error",


                });
            }
            // res.send(err)
            // else{
            // console.log('ppoopo',Std);
            //  res.send(Std);}
            else {
                console.log('respomse', res);
                callback({
                    statuscode: 200,
                    msg: "student detials",
                    data: res

                });



            }
        });

    },

    add_student: function (data, eventpath, callback) {
        conn.query("select usn from student", function (err, res) {
            console.log('inside the query');

            if (err) {
                callback({
                    msg: "Finding Student, Internal server error",
                    statuscode: 500
                });
            }
            else if (res.length != 0) {
                console.log('inside if', res[0].usn)
                for (var i = 0; i < res.length; i++) {
                    if (res[i].usn == data.usn) {
                        console.log(res[i].usn, 'result');
                        callback({
                            statuscode: 304,
                            msg: "Student already Registered",
                        });
                    }
                }
            }
        });

        if (eventpath) {
            console.log('image geting')
            var file = eventpath;
            data.image = file.name;

            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

                file.mv('./uploads/' + file.name, function (err) {

                    if (err) {
                        //return res.status(500).send(err);
                        callback({
                            statuscode: 400,
                            msg: "image upload failed",



                        });
                    }
                })
            }

        }


        conn.query("INSERT INTO student(usn,name,email,image,age,isactive) values(" + data.usn + ",'" + data.name + "','" + data.email + "','" + data.image + "'," + data.age + ",'true')", data, function (error, result) {

            if (error) {
                //console.log("error: ", err);
                callback({
                    statuscode: 500,
                    msg: "Internal server error!",


                });


            }
            else {

                console.log('usn', result);

                callback({
                    statuscode: 200,
                    msg: "student registered success",


                });
            }
        });
    },

    update_student: function (usn, data, callback) {

        console.log('contol to method', data);

        // var std=new Std();


        if (usn.usn != null) {
            //var status=0;

            console.log('inside ifff');

            if (data.name != null || data.name == "" || data.name != undefined) {


                conn.query("update student set name = ? where usn= ?", [data.name, usn.usn], function (err, res) {
                    if (err) {
                        callback({
                            statuscode: 500,
                            msg: "Internal server error"
                        })
                    }

                });
            }
            if (data.email != null || data.email == "" || data.email != undefined) {
                //std.email=data.email;
                conn.query("update student set email = ? where usn= ?", [data.email, usn.usn], function (err, res) {
                    if (err) {
                        callback({
                            statuscode: 500,
                            msg: "Internal server error"
                        })
                    }
                });
            }
            if (data.age != null || data.age == "" || data.age != undefined) {
                console.log("insidemeeeeee")
                conn.query("update student set age = ? where usn= ?", [data.age, usn.usn], function (err, res) {
                    if (err) {
                        callback({
                            statuscode: 500,
                            msg: "Internal server error"
                        })
                    }
                });
            }

            callback({
                statuscode: 200,
                msg: "updated successfully"
            })

        }
    },

    delete_student: function (data, callback) {
        console.log('there in delete');



        conn.query("update student set isactive = ? WHERE usn = ?", [data.status, data.usn], function (error, result) {

            if (error) {
                console.log("error: ", error);
                callback({
                    statuscode: 500,
                    msg: "internal server error",


                });
            }
            else {
                console.log('delete', result);

                callback({
                    statuscode: 200,
                    msg: "student deleted successfully",
                });

            }
        });
    },







    list_students: function (callback) {
        // var std=new Std();
        conn.query("Select * from student", function (err, res) {

            if (err) {
                console.log("error: ", err);
                callback({
                    statuscode: 500,
                    msg: "internal server error"
                })
            }
            if (res.length == 0) {
                callback({
                    statuscode: 404,
                    msg: "No students Found",
                    data: res
                })

            }
            else {
                console.log('students : ', res);

                callback({
                    statuscode: 200,
                    msg: "list students",
                    data: res
                })
            }
        });
    }





}






















