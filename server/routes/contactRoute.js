const express = require('express');

const {saveContact,getAllContacts,deleteContactById,downloadContactsPDF}=require('../controller/contactController')


//router onject
const router=express.Router()






//routing
router.post('/saveContact',saveContact)
router.get('/getAllContacts',getAllContacts)
router.delete('/deleteContactById/:id',deleteContactById)
router.get('/downloadContactsPdf',downloadContactsPDF)









module.exports=router