import {connectToDB} from '@/dataBase/db'
import Prompt from '@/models/prompt';

export const GET = async({req})=>{
    try {
        await connectToDB();

        const prompts = await Prompt.findMany({}).populate('creator')

        return new Response(JSON.stringify(prompts),{status:200})

    } catch (error) {
         return new Response(JSON.stringify(error),{status:200})
        
    }
}