const { sequelize, DataTypes } = require("../config/db_conn");

const Antrian = sequelize.define("antrian_pasien", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  no_hp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jenis_kelamin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shift: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  antrian: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Y", "N"),
    allowNull: false,
  },
});

module.exports = Antrian;

// const createAntrian = (id, nama, no_hp, email, jenis_kelamin) => {
//     const sql = `INSERT INTO antrian_pasien (id,nama, no_hp, email, jenis_kelamin) VALUES (?, ?, ?, ?, ?)`
//     db.query(sql, [id, nama, no_hp, email, jenis_kelamin], (err, result) => {
//         if (err) throw err
//         console.log("1 Record Added")
//     })
// }

// const readAllAntrian = async () => {
//     return new Promise((resolve, reject) => {
//         const sql = `SELECT * FROM antrian_pasien`
//         db.query(sql, (err, result) => {
//             if (err) throw err
//             resolve(result)
//         })
//     })
// }

// const readAntrian = async (nama) => {
//     return new Promise((resolve, reject) => {
//         const decodedNama = decodeURIComponent(nama)

//         const sql = `SELECT * FROM antrian_pasien WHERE nama = ${db.escape(
//             decodedNama
//         )}`
//         console.log(decodedNama)
//         db.query(sql, (err, result) => {
//             if (err) throw err
//             resolve(result)
//         })
//     })
// }

// module.exports = { createAntrian, readAllAntrian, readAntrian }
