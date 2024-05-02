const express = require('express');

const {registerController,loginController}=require('../controller/userContactController')


//router onject
const router=express.Router()






//routing
router.post('/registerController',registerController)
router.post('/loginController',loginController)










module.exports=router