const express = require('express');
const router = express.Router();
const apiAuthCheck = require('../middlewares/apiAuthCheck');
const WalletController = require('../controllers/wallet');
const TransctionController = require('../controllers/transaction');


/** insert api authentication middleware */
router.use(apiAuthCheck);

router.post('/wallets', WalletController.create);
router.get('/wallets', WalletController.all);
router.get('/wallets/:id', WalletController.getById);
router.delete('/wallets/:id', WalletController.delete);

router.post('/wallets/:id/debit/init', TransctionController.initDebit);
router.post('/wallets/:id/credit', TransctionController.credit);
router.delete('/wallets/:id/transactions/:txnid/release', TransctionController.release);
router.patch('/wallets/:id/transactions/:txnid/complete', TransctionController.complete);
router.get('/wallets/:id/transactions', TransctionController.all);
router.get('/wallets/:id/transactions/:txnid', TransctionController.getById);
router.patch('/wallets/:id/transactions/:txnid', TransctionController.update);
// router.get('/wallets/:id:/transactions/reference/:ref', TransctionController.getByReference);



module.exports = {
  prefix: '/api/v1/',
  router
};