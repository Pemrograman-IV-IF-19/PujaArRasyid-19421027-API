const express = require ('express')
const app = express()
const port = 8080
const mongoose = require('mongoose')
const dbConfig = require('./config/DbConfig')


app.use(express.json())
app.use(express.urlencoded({ extended:true }))

mongoose.connect(dbConfig.mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("Connect mongodb")
}).catch(err =>{
    console.log("Unconnect mongodb")
    console.log(err)
})

app.get("/", (req, res) =>{
    res.json({
        msg: "Selamat Datang di API"
    })
})

app.use('/gambar-barang', express.static('public/images'))
app.use('/users', require('./routes/userRoutes'))
app.use('/kategori', require('./routes/kategoriRoutes'))
app.use('/barang', require('./routes/barangRoutes'))
app.use('/keranjang', require('./routes/keranjangRoutes'))
app.use('/transaksi', require('./routes/TransaksiRoutes'))

// app.get("/data-mhs", (req, res) =>{
//     res.json({
//         npm: "19421058",
//         nama: "Afandi Akbar"
//     })
// })

// app.get("/data-mhs/:npm/:nama", (req, res) =>{
//     res.json({
//         npm: req.params.npm,
//         nama: req.params.nama
//     })
// })

// app.get("/data-mhs/dengan-query", (req, res) =>{
//     res.json({
//         npm: req.query.npm,
//         nama: req.query.nama
//     })
// })

// app.post("/data-mhs/dengan-body", (req, res) =>{
//     res.json({
//         npm: req.body.npm,
//         nama: req.body.nama
//     })
// })

// app.get("/biodata/:npm/:nama", (req, res) =>{
//     res.json({
//         npm: req.params.npm,
//         nama: req.params.nama,
//         tglLahir: req.params.tglLahir,
//         alamat: req.params.alamat,
//         kelamin: req.params.kelamin,
//         kewarganegaraan: req.params.kewarganegaraan
//     })
// })

// app.get("/biodata/dengan-query", (req, res) =>{
//     res.json({
//         npm: req.query.npm,
//         nama: req.query.nama,
//         tglLahir: req.query.tglLahir,
//         alamat: req.query.alamat,
//         kelamin: req.query.kelamin,
//         kewarganegaraan: req.query.kewarganegaraan
//     })
// })

// app.post("/biodata/dengan-body", (req, res) =>{
//     res.json({
//         npm: req.body.npm,
//         nama: req.body.nama,
//         tglLahir: req.body.tglLahir,
//         alamat: req.body.alamat,
//         kelamin: req.body.kelamin,
//         kewarganegaraan: req.body.kewarganegaraan
//     })
// })

app.listen(port, () => {
    console.log("server berjalan di port "+ port)
})