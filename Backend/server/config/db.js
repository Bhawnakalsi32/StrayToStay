const mongoose=require("mongoose")

// mongoose.connect("mongodb://127.0.0.1:27017/strayToStayDb")
mongoose.connect("mongodb+srv://bhawnakalsi4:wZWJpM745K3fMoHo@cluster0.we9tivn.mongodb.net/strayToStayDb")
.then(()=>{
    console.log("Database is connected!!");
})
.catch((error)=>{
    console.log("Error while connecting database", error);
})