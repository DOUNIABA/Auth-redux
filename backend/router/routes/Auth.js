
const router= require('express').Router();
const auth=require('../../controller/auth')
const user=require('../../controller/UserController')
const {DashboardStat}=require('../../controller/statisticController')
const verification=require('../middelwares/token_verification')
const verfemail=require('../middelwares/veirfy_email')
const {tryCatch}=require('../middelwares/errorHandler/tryCatch')
const errorHandler=require('../middelwares/errorHandler/errorhandler')
    
router.post('/register',verification.postverif,tryCatch(auth.register))
router.post('/login',tryCatch(verification.postverif),tryCatch(auth.login))
router.post('/forgotpassword',tryCatch(auth.forgotpassword))
router.post('/forgetpasschange',tryCatch(verfemail.forgetpasschange))
router.post('/resetpassword',verification.verify(["manager","client","livreur"]),tryCatch(auth.resetpassword))
router.get('/logout',verification.verify(["manager","admin","client","livreur"]),tryCatch(auth.logout))
router.get('/confirmation/:email_token',verfemail.confirm)
router.post('/forgetconfirmdata',verfemail.forgetconfirmdata)


router.get('/allUsers',user.GetAllUsers)
router.post('/decrypt',auth.decrpttoken)


router.post('/switchtoliv',verification.verify(["manager"]),auth.switchto)



router.use(errorHandler)

module.exports= router;