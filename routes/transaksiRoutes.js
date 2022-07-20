const controllerTransaksi = require('../controller/transaksiController')
const router = require('express').Router()


router.post('/input-transaksi', (req, res) => {
    controllerTransaksi.inputTransaksi(req.body)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.get('/get-transaksi', (req, res) => {
    controllerTransaksi.getAllTransaksi()
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})


router.get('/get-transaksi-id/:idTransaksi', (req, res) => {
    controllerTransaksi.getTransaksiById(req.params.idTransaksi)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.get('/get-transaksi-idUser/:idUser', (req, res) => {
    controllerTransaksi.getTransaksiByIdUser(req.params.idUser)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})


router.delete('/delete-transaksi/:idTransaksi', (req, res) => {
    controllerTransaksi.deleteTransaksi(req.params.idTransaksi)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

module.exports = router