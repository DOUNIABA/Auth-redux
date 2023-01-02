const router= require('express').Router();
const {GetAllcategories, CreateCat, RemoveCat}=require('../../controller/categorieController')
const verification=require('../middelwares/token_verification')
const {tryCatch}=require('../middelwares/errorHandler/tryCatch')
const errorHandler=require('../middelwares/errorHandler/errorhandler')

router.get('/allcategories',GetAllcategories)
router.post('/create',tryCatch(CreateCat))
router.post('/remove',tryCatch(RemoveCat))

router.use(errorHandler)

module.exports= router;