const router= require('express').Router();
const {AjouterCommand,UpdateCommand,DeletCommand,AllCommand,commandClient,CountCommandbyclient,Profil,updateProfil}=require("../../controller/CommandController")
const verification=require('../middelwares/token_verification')
const {tryCatch}=require('../middelwares/errorHandler/tryCatch')
const errorHandler=require('../middelwares/errorHandler/errorhandler')
tryCatch()
router.post('/ajouterCommand',tryCatch(AjouterCommand))
router.put('/updateCommand/:id',tryCatch(UpdateCommand))
router.delete('/deletCommand/:id',tryCatch(DeletCommand))
router.get('/allCommand',tryCatch(AllCommand))
router.get('/commandClient',tryCatch(commandClient))
router.get('/Profil',tryCatch(Profil))
router.put('/updateProfil',tryCatch(updateProfil))
router.get('/CountCommandbyclient',tryCatch(CountCommandbyclient))


router.use(errorHandler)

module.exports = router;
