
const router= require('express').Router();
const {GetAllachats,Updatestatus}=require('../../controller/AchatController')
const verification=require('../middelwares/token_verification')
const {tryCatch}=require('../middelwares/errorHandler/tryCatch')
const errorHandler=require('../middelwares/errorHandler/errorhandler')

router.get('/allachats',GetAllachats)
router.post('/Updatestatus',Updatestatus)

router.use(errorHandler)

module.exports= router;
