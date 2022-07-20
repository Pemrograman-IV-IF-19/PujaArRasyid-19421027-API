const { model } = require('mongoose')
const kategoriModel = require('../model/kategoriModel')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

exports.inputKategori = (data) =>
    new Promise(async(resolve, reject) => {
        await kategoriModel.create(data)
            .then(() => {
                resolve ({
                    status: true,
                    msg: 'Berhasil Membuat Kategori'
                })
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan pada Server'
                })
            })
    })

exports.getAllKategori = () =>
    new Promise(async(resolve, reject) => {
        kategoriModel.find({})
            .then(dataKategori => {
                if (dataKategori.length > 0) {
                    resolve({
                        status: true,
                        msg: 'Berhasil Memuat Data',
                        data: dataKategori
                    })
                }else{
                    reject({
                        status: false,
                        msg: 'Tidak Ada Kategori'
                    })
                }
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Pada Server'
                })
            })
    })

exports.getKategoriByName = (name) =>
    new Promise(async(resolve, reject) => {
        kategoriModel.findOne({ namaKategori: name })
            .then(dataKategori => {
                if (dataKategori) {
                    resolve({
                        status: true,
                        msg: 'Berhasil Memuat Data',
                        data: dataKategori
                    })
                }else{
                    reject({
                        status: false,
                        msg: 'Tidak Ada Kategori' + name
                    })
                }
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Pada Server'
                })
            })
})


exports.updateKategori = (id, data) =>
    new Promise(async(resolve, reject) => {
        kategoriModel.updateOne({ _id: objectId(id) }, data)
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

exports.deleteKategori = (id) =>
    new Promise(async(resolve, reject) => {
        kategoriModel.deleteOne({ _id: objectId(id) })
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