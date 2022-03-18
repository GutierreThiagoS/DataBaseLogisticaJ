const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const OrderController = require("../controllers/OrderController");
const UserController = require("../controllers/UserController");
const ItemOrderController = require("../controllers/ItemOrderController");

router.get('/', HomeController.index);
router.post('/orderpicking/user', UserController.create)
router.post('/orderpicking/login', UserController.login)
router.post('/orderpicking/order', OrderController.create)
router.post('/orderpicking/item_order', ItemOrderController.create)
router.post('/orderpicking/start_order', ItemOrderController.updateStartItem)
router.post('/orderpicking/confirm_tag', ItemOrderController.updateConfirmTag)

module.exports = router;