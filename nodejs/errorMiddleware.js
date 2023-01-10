const errorHandler = (err,req,res,) => {
    const statuscode = res.statuscode ? res.statuscode:200;
    res.status(statuscode);

    res.json({
        messge: err.messge,
        stack:err.stack,
    });

};

module.exports = {
    errorHandler
}