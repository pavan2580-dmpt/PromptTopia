import mongoose from "mongoose"
let isConnected = false;
export const connectToDB = async()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("connected to the db..");
        return ;
    }
    try {
        await mongoose.connect('mongodb+srv://pavanganesh:pavanganesh@cluster0.axrs7n2.mongodb.net/prompttopia?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true },{
            dbName:'propmpttopia'
        })  
        isConnected = true;
        console.log('mongoDb connected') 
    } catch (error) {
       console.log( error)

        
    }

}
