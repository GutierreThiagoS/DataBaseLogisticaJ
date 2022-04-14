const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const OrderController = require("../controllers/OrderController");
const UserController = require("../controllers/UserController");
const ItemOrderController = require("../controllers/ItemOrderController");
const { token, tokenGa,  } = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
//router.post('/orderpicking/user', UserController.create)
router.post('/orderpicking/register_worker', tokenGa, UserController.create)

// router.post('/orderpicking/order', OrderController.create)
router.post('/orderpicking/create_order', tokenGa, OrderController.create)
router.post('/orderpicking/item_order', ItemOrderController.create)

router.post('/orderpicking/login', UserController.login)
router.post('/orderpicking/start_order', token, ItemOrderController.updateStartItem)
router.post('/orderpicking/confirm_tag', token, ItemOrderController.updateConfirmTag)
router.post('/orderpicking/collected_product', token, ItemOrderController.updateProductCollected)
router.post('/orderpicking/save_last_etiquette', token, ItemOrderController.updateLastEtiquette)

router.post('/orderpicking/gaLogin', UserController.gaLogin)
router.get('/orderpicking/ga_user_workers', tokenGa, UserController.getUsersWorkers)
router.get('/orderpicking/all_workers_to_order', tokenGa, UserController.getAllWorkersToGa)
router.get('/orderpicking/all_orders_to_items', tokenGa, OrderController.getAllOrderGa)

router.get('/orderpicking/workers', UserController.getWorkersStatistics)

router.get('/orderpicking/teste', ItemOrderController.getJsonItemsTeste)

module.exports = router;