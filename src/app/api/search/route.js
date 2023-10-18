import Prompt from "@/models/prompt";
import {connectToDB} from '@/dataBase/db'
export const POST=async (req,res)=>{
    try {
        connectToDB();

        const {tag} = await req.json();
        if(!tag){
            return new Response("Empty Field....")
        }
        const search = await Prompt.find({tag}).populate('creator')
        return new Response(JSON.stringify(search),{status:200})
    } catch (error) {
        console.log("Error in serach route")
    }
}