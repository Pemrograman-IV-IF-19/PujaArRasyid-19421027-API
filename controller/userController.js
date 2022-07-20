const userModel = require("../model/userModel")
const bCrypt = require('bcrypt')

exports.registrasiUser = (data) =>
new Promise(async(resolve, reject) => {
    const salt = bCrypt.genSaltSync(10)
    const encrypt = await bCrypt.hashSync(data.password, salt)
    Object.assign(data,{
        password: encrypt
    })
    await userModel.findOne({
        userName: data.userName
    }).then(async(dataUser) =>{
        if (dataUser) {
            reject({
                status: false,
                msg: "Gagal Registrasi, Username sudah terdaftar"
            })
        } else {
            await userModel.create(data)
            .then(() =>{
                resolve({
                    status: true,
                    msg: "Berhasil Registrasi"
                })
            }).catch(err =>{
                reject({
                    status: false,
                    msg: "Gagal Registrasi"
                })
            })
        }
    })
   
})

exports.loginUser = (data) => 
    new Promise(async (resolve, reject) => {
        userModel.findOne({
            userName: data.userName
        }).then(async (dataUser) => {
            if (dataUser) {
                if (await bCrypt.compare(data.password, dataUser.password)) {
                    resolve({
                        status: true,
                        msg: "Berhasil Login",
                        data: dataUser
                    })
                } else {
                    reject({
                        status: false,
                        msg: "Password Anda Salah"
                    })
                }
            } else {
                reject({
                    status: false,
                    msg: "Username Tidak Terdaftar"
                })
            }
        })
})

