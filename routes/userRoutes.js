import express from "express";
import * as UC from '../controllers/userController.js';


router.post('/login',UC.login)
router.patch('/sendCode', UC.forgetPassword)
router.patch('/resetPassword', UC.resetPassword)

export default router