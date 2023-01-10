const express = require("express");
const router = express.Router();

const{getTools,setTools,updateTools,deleteTools} = require('./controller')

router.route('/').get(getTools).post(setTools);
router.route('/:id').put(updateTools).delete(deleteTools);

module.exports = router;
