const mongoose = require ('mongoose')
const objectId = mongoose.Types.ObjectId

const transaksiModel = new mongoose.Schema({
    idUser: {
        type: objectId
    },
    grandTotal:{
        type: Number
    },
    detailTransaksi: JSON
})

module.exports = mongoose.model('transaksi', transaksiModel)