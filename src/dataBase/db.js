import mongoose from "mongoose"
let isConnected = false;
export const connectToDB = async()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("connected to the db..");
        return ;
    }
    try {
        await mongoose.connect(process.env.MOGO,{ useNewUrlParser: true, useUnifiedTopology: true },{
            dbName:'propmpttopia'
        })  
        isConnected = true;
        console.log('mongoDb connected') 
    } catch (error) {
       console.log( error)

        
    }

}
