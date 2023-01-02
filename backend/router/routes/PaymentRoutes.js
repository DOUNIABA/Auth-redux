const router= require('express').Router();
const {GetAllPayments, createCheckoutSession}=require('../../controller/paymentController')
const verification=require('../middelwares/token_verification')
const {tryCatch}=require('../middelwares/errorHandler/tryCatch')
const errorHandler=require('../middelwares/errorHandler/errorhandler')

router.get('/allpayments',GetAllPayments)

router.post('/create-checkout-session', createCheckoutSession)

router.use(errorHandler)

module.exports= router;