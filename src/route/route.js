const express = require('express');
const { transaction, ethereumPriceAndBalance, priceEvery10Min } = require('../controller/controller');
const router = express.Router();

router.get('/fetchTx/:address', transaction);
router.get('/ethereumPrice', priceEvery10Min);
router.get('/checkBalAndPrice/:address', ethereumPriceAndBalance);

module.exports = router;