import express from "express";
import * as UC from '../controllers/userController.js'


const router = express.Router()

router.post('/signup',UC.signUp)
router.get('/confirmEmail/:token', UC.confirmEmail)
router.get('/' , UC.getUsers)




export default router