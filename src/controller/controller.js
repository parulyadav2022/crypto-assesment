const tx = require('../model/txModel');
const axios = require('axios');
const balAndPriceModel = require('../model/balAndPriceModel');

//todo Task 1
const transaction = async (req, res) => {
    try {
        const { address } = req.params;

        const data = await tx.findOne({ address });

        //todo fetch transaction from DB first;
        if (data) {
            console.log('DB');
            res.status(201).send({ status: true, data: data });
        } else {
            //todo fetch transaction from axios if not available in database;
            console.log('axios');
            const userTx = await axios.post(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=QXHGPPVAHSFKWZCH5TZ17D9EIYQB8GPTE6`)
                .catch((err) => {
                    res.status(500).send({ status: false, message: err.message });
                });

            const saveTx = await tx.create({ address, transactions: userTx.data.result });
            res.status(201).send({ status: true, data: saveTx });
        }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

//todo Task 2
const priceEvery10Min = async (req, res) => {
    try {
        // //! option 1;
        // setInterval(async () => {
        //     const etherPrice = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
        //         .catch((err) => {
        //             res.status(500).send({ status: false, message: err.message });
        //         });
        //     console.log(etherPrice.data);
        // }, 1000 * 60 * 10);

        //! option 2 call this every ten minute using setInterval in frontend;
        const etherPrice = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
            .catch((err) => {
                res.status(500).send({ status: false, message: err.message });
            });
        res.status(201).send({ status: true, data: etherPrice.data });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


//todo Task 3
const ethereumPriceAndBalance = async (req, res) => {
    try {
        const { address } = req.params;
        const etherBalance = await axios.post(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=QXHGPPVAHSFKWZCH5TZ17D9EIYQB8GPTE6`)
            .catch((err) => {
                res.status(500).send({ status: false, message: err.message });
            });

        const etherPrice = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
            .catch((err) => {
                res.status(500).send({ status: false, message: err.message });
            });

        const data = {
            balance: etherBalance.data.result,
            price: etherPrice.data.ethereum.inr
        }

        const currBalAndPrice = await balAndPriceModel.create(data);
        res.status(201).send({ status: true, data: currBalAndPrice });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { transaction, priceEvery10Min, ethereumPriceAndBalance };