const UserModel=require("../apis/User/UserModel")
const bcryptjs=require("bcryptjs")
UserModel.findOne({email:"admin@gmail.com"})
.then((userData)=>{
    if(!userData){
        let userObj=new UserModel()

        userObj.autoId=1
        userObj.name="admin"
        userObj.email="admin@gmail.com"
        userObj.password=bcryptjs.hashSync("123",10)
        userObj.userType=1
        userObj.save()
        .then((userData)=>{
            console.log("admin seeded succesfully")
        })
        .catch((err)=>{
            console.log("Error while seeding admin", err);
        })
    }else{
        console.log("Admin already exists!!");
    }
})
.catch((err)=>{
    console.log("Error while seeding admin",err);
})