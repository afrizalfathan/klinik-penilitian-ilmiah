const { sequelize, DataTypes } = require("../config/db_conn");

const Konsultasi = sequelize.define("pesanan_konsultasi", {
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
  jenis_kelamin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  alergi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  keluhan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  obat: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Konsultasi;
