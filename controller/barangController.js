const { model } = require('mongoose')
const barangModel = require('../model/barangModel')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId


exports.inputBarang = (data) =>
    new Promise(async(resolve, reject) => {
        await barangModel.create(data)
            .then(() => {
                resolve ({
                    status: true,
                    msg: 'Berhasil Membuat Barang'
                })
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan pada Server'
                })
            })
    })

exports.getAllBarang = () =>
    new Promise(async(resolve, reject) => {
        barangModel.aggregate([
            {
                $lookup:
                  {
                    from: "kategoris",
                    localField: "idKategori",
                    foreignField: "_id",
                    as: "kategoriBarang"
                  }
             },
             {$unwind: "$kategoriBarang"}
        ])
            .then(dataBarang => {
                if (dataBarang.length > 0) {
                    resolve({
                        status: true,
                        msg: 'Berhasil Memuat Data',
                        data: dataBarang
                    })
                }else{
                    reject({
                        status: false,
                        msg: 'Tidak Ada Barang'
                    })
                }
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Pada Server'
                })
            })
    })

exports.getBarangByName = (name) =>
    new Promise(async(resolve, reject) => {
        barangModel.aggregate([ 
        { $match: {namaBarang: name }},
        {
            $lookup:
              {
                from: "kategoris",
                localField: "idKategori",
                foreignField: "_id",
                as: "kategoriBarang"
              }
         },
         {$unwind: "$kategoriBarang"}
        ])
            .then(dataBarang => {
                if (dataBarang) {
                    resolve({
                        status: true,
                        msg: 'Berhasil Memuat Data',
                        data: dataBarang
                    })
                }else{
                    reject({
                        status: false,
                        msg: 'Tidak Ada Barang' + name
                    })
                }
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Pada Server'
                })
            })
})

exports.getBarangById = (id) =>
    new Promise(async(resolve, reject) => {
        barangModel.aggregate([ 
            { $match: {_id: objectId(id) }},
            {
                $lookup:
                  {
                    from: "kategoris",
                    localField: "idKategori",
                    foreignField: "_id",
                    as: "kategoriBarang"
                  }
             },
             {$unwind: "$kategoriBarang"}
        ])
            .then(dataBarang => {
                if (dataBarang) {
                    resolve({
                        status: true,
                        msg: 'Berhasil Memuat Data',
                        data: dataBarang
                    })
                }else{
                    reject({
                        status: false,
                        msg: 'Tidak Ada Barang' + id
                    })
                }
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Pada Server'
                })
            })
})


exports.updateBarang = (id, data) =>
    new Promise(async(resolve, reject) => {
        barangModel.updateOne({ _id: objectId(id) }, data)
            .then(() => {
                resolve ({
                    status: true,
                    msg: 'Berhasil Merubah data'
                })
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan pada Server'
                })
            })
    })

exports.updateGambar = (id, gambar) =>
new Promise(async(resolve, reject) => {
    barangModel.updateOne({ _id: objectId(id) }, {$set: { gambar: gambar} })
        .then(() => {
            resolve ({
                status: true,
                msg: 'Berhasil Merubah gambar'
            })
        }).catch(err => {
            reject({
                status: false,
                msg: 'Terjadi Kesalahan pada Server'
            })
        })
})

exports.deleteBarang = (id) =>
    new Promise(async(resolve, reject) => {
        barangModel.deleteOne({ _id: objectId(id) })
            .then(() => {
                resolve ({
                    status: true,
                    msg: 'Berhasil Menghapus data'
                })
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan pada Server'
                })
            })
    })