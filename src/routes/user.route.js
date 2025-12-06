import express from 'express'
import verifyToken from '../middleware/auth.middleware.js'
import { getUserProfile, updateUserProfile, followRequest, unfollowUser, getFollowers, getFollowings } from '../controller/user.controller.js'

const router = express.Router()


router.get('/profile/:userName', getUserProfile)

router.put('/profile', verifyToken, updateUserProfile)

router.put('/follow/:_id', verifyToken, followRequest)
router.put('/unfollow/:_id', verifyToken, unfollowUser)

router.get('/followers/:userId', getFollowers)
router.get('/following/:userId', getFollowings)

export default router

