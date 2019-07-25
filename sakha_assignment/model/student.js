var Student = function(data){
    this.usn=data.usn;
    this.name=data.name;
    this.email=data.email;
    this.image=data.image;
    this.age=data.age;
    //this.status = data.status;
    this.created_at = new Date()
}
module.exports=Student;