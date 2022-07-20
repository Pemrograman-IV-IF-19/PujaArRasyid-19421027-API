const controllerKategori = require('../controller/kategoriController')
const router = require('express').Router()


router.post('/input-kategori', (req, res) => {
    controllerKategori.inputKategori(req.body)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.get('/get-kategori', (req, res) => {
    controllerKategori.getAllKategori()
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.get('/get-kategori/:namaKategori', (req, res) => {
    controllerKategori.getKategoriByName(req.params.namaKategori)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.put('/update-kategori/:id', (req, res) => {
    controllerKategori.updateKategori(req.params.id, req.body)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.delete('/delete-kategori/:id', (req, res) => {
    controllerKategori.deleteKategori(req.params.id)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

module.exports = router