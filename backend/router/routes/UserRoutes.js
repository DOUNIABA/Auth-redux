const router= require('express').Router();
const {GetAllUsers , CreateLiv, Ban}=require('../../controller/UserController')
const verification=require('../middelwares/token_verification')
const {tryCatch}=require('../middelwares/errorHandler/tryCatch')
const errorHandler=require('../middelwares/errorHandler/errorhandler')

router.get('/allUsers',GetAllUsers)
router.post('/create',tryCatch(CreateLiv))
router.post('/Ban',tryCatch(Ban))

router.use(errorHandler)

module.exports= router;