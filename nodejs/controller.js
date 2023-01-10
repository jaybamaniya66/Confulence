const getTools = (req,res)=>{
    res.status(200).json({message:"hello guys"});
}

const setTools = (req,res)=>{
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add the text')
    }
    res.status(200).json({message:"set guys"});
}

const updateTools = (req,res)=>{
    res.status(200).json({message: `update this guys ${req.params.id}`});
}

const deleteTools = () => {
    res.status(200).json({message: `delete guys ${req.params.id}`});
}

module.exports = {
    getTools,
    setTools,
    updateTools,
    deleteTools
}

