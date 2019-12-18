const express = require("express");
const router = express.Router();

const { create, read, update, remove, list, categoryById } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create); 
router.get('/category/:categoryId', read);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin,update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin,remove);
router.get('/categories', list);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;  