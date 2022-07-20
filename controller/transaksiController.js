const { model } = require('mongoose')
const transaksiModel = require('../model/transaksiModel')
const mongoose = require('mongoose')
const barangModel = require('../model/barangModel')
const keranjangModel = require('../model/keranjangModel')
const objectId = mongoose.Types.ObjectId


exports.inputTransaksi = (data) =>
    new Promise(async(resolve, reject) => {
        transaksiModel.create(data)
            .then(async() => {
                const { detailTransaksi } = data;
                for (let i = 0; i < detailTransaksi.length; i++){
                    await barangModel.updateOne(
                        {_id: detailTransaksi[i].idBarang},
                        {$inc: {stok: -Number(detailTransaksi[i].jumlahBeli)}},
                    );

                    await keranjangModel.deleteOne(
                        {_id: objectId(detailTransaksi[i]._id)},
                    );
                }
                resolve ({
                    status: true,
                    msg: 'Transaksi Berhasil'
                })
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Saat Transaksi'
                })
            })
    })

exports.getAllTransaksi = () =>
    new Promise(async(resolve, reject) => {
        transaksiModel.aggregate([
            {
                $lookup:
                  {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user"
                  }
            },
             {$unwind: "$user"}
        ])
            .then((data) => {
                if (data.length > 0) {
                    resolve({
                        status: true,
                        msg: 'Berhasil Memuat Data',
                        data: data
                    })
                }else{
                    reject({
                        status: false,
                        msg: 'Tidak Ada Data'
                    })
                }
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Server'
                })
            })
    })


exports.getTransaksiById = (idTransaksi) =>
    new Promise(async(resolve, reject) => {
        transaksiModel.aggregate([ 
            { $match: {_id: objectId(idTransaksi) }},
            {
                $lookup:
                  {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user"
                  }
            },
             {$unwind: "$user"},
        ])
            .then(data => {
                if (data.length > 0) {
                    resolve({
                        status: true,
                        msg: 'Berhasil Memuat Data',
                        data: data
                    })
                }else{
                    reject({
                        status: false,
                        msg: 'Tidak Ada Data'
                    })
                }
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Server'
                })
            })
})

exports.getTransaksiByIdUser = (idUser) =>
    new Promise(async(resolve, reject) => {
        transaksiModel.aggregate([ 
            { $match: { idUser: objectId(idUser) }},
            {
                $lookup:
                  {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user"
                  }
            },
             {$unwind: "$user"},
        ])
            .then(data => {
                if (data.length > 0) {
                    resolve({
                        status: true,
                        msg: 'Berhasil Memuat Data',
                        data: data
                    })
                }else{
                    reject({
                        status: false,
                        msg: 'Tidak Ada Data'
                    })
                }
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Server'
                })
            })
})


exports.deleteTransaksi = (idTransaksi) =>
    new Promise(async(resolve, reject) => {
        transaksiModel.deleteOne({ _id: objectId(idTransaksi) })
            .then(() => {
                resolve ({
                    status: true,
                    msg: 'Berhasil Menghapus Data'
                })
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Server'
                })
            })
    })