const express = require("express");
const { sequelize } = require("../config/db_conn");
const Konsultasi = require("../models/konsul_models");
const router = express.Router();

const createConsult = async (
  id,
  nama,
  no_hp,
  jenis_kelamin,
  tanggal_lahir,
  alergi,
  alamat,
  keluhan
) => {
  sequelize
    .sync()
    .then(() => {
      console.log("1 Record Added!");

      Konsultasi.create({
        id,
        nama,
        no_hp,
        alergi,
        jenis_kelamin,
        keluhan,
        alamat,
        tanggal_lahir,
      });
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const readAllKonsul = async () => {
  try {
    const konsulFindAll = await Konsultasi.findAll();
    return konsulFindAll;
  } catch (error) {
    console.log(error);
  }
};

const checkKonsul = async (id) => {
  try {
    const konsulFindID = await Konsultasi.findOne({
      where: {
        id,
      },
    });
    return konsulFindID;
  } catch (error) {
    console.log(error);
  }
};

const readKonsul = async (id) => {
  try {
    const konsulFind = await Konsultasi.findOne({
      where: {
        id,
      },
    });
    return konsulFind;
  } catch (error) {
    console.log(error);
  }
};

const updateConsult = async (id, obat) => {
  try {
    const konsultasi = await Konsultasi.findOne({ where: { id } });
    if (konsultasi) {
      if (obat) {
        konsultasi.obat = obat;
      }
      await konsultasi.save();
      return konsultasi;
    } else {
      throw new Error("Konsultasi not found");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createConsult,
  readAllKonsul,
  readKonsul,
  updateConsult,
  checkKonsul,
};
