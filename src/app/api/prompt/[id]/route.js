import {connectToDB} from '@/dataBase/db'
import Prompt from '@/models/prompt';
// --------------------get-----------------------
export const GET = async(req,{params})=>{
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt is not avaliable",{status:404});


        return new Response(JSON.stringify(prompt),{status:200})

    } catch (error) {
        return new Response("Failed to fetch the posts",error,{status:200})
        
    }
}

// -----------------------update-------------------------

export const PATCH = async(request,{params})=>{

    const {prompt,tag} = await request.json();
    try {
        await connectToDB();

        const Exisit = await Prompt.findById(params.id);
        if(!Exisit) return new Response("Prompt not found ",{status:404});
        
        Exisit.prompt = prompt;
        Exisit.tag = tag;
        await Exisit.save();

        return new Response(JSON.stringify(Exisit),{status:200});


    } catch (error) {
        return new Response("failed to update",{status:500});
    }
}

// ----------------------delete------------------------

export const DELETE = async(request,{params})=>{
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully",{status:200});


        
    } catch (error) {
        return new Response("unable to delete the post ",{status:500});
    }
}