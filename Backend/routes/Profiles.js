var express = require('express');
const {addProfiles, getProfileDetails, deleteProfile} = require('../controller/profiles');
const {isSignedIn,isAuthenticated,getUserById} = require('../controller/user')
const router = express.Router();
router.param('userId',getUserById);



router.post("/:userId",isSignedIn,isAuthenticated,getUserById,addProfiles);
router.get("/getProfiles/:userId",isSignedIn,isAuthenticated,getUserById,getProfileDetails);
router.post("/delete/:userId/:login_name",isSignedIn,isAuthenticated,getUserById,deleteProfile);
module.exports = router;