import {connectToDB} from '@/dataBase/db'
import Prompt from '@/models/prompt';
export const POST = async(req)=>{
    
        const {userId,prompt,tag} = await req.json();
        try {
            await connectToDB();
            const newPrompt = new Prompt({
                creator : userId,
                prompt,
                tag
            })
            await newPrompt.save();

            return new Response(JSON.stringify(newPrompt),{status:201})
        } catch (error) {
            return new Response(JSON.stringify("failed to create a post for you..."))
        }


}
