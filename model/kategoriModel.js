const mongoose = require ('mongoose')

const kategoriModel = new mongoose.Schema({
    namaKategori: {
        type: String
    },
    keterangan:{
        type: String
    }
})

module.exports = mongoose.model('kategori', kategoriModel)