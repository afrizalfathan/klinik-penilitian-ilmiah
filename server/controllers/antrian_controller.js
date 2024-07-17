const { sequelize } = require("../config/db_conn");
const Antrian = require("../models/antrian_models");

async function readAntrianShiftDate(shift, tanggal) {
  try {
    const result = await Antrian.findAll({
      where: [
        {
          shift: shift,
          tanggal: tanggal,
        },
      ],
    });
    return result.length;
  } catch (error) {
    console.log(error);
  }
}

async function readAllAntrian() {
  try {
    const antrianFindAll = await Antrian.findAll();
    return antrianFindAll;
  } catch (error) {
    console.log(error);
  }
}

const createAntrian = async (
  id,
  nama,
  no_hp,
  email,
  jenis_kelamin,
  shift,
  tanggal,
  antrian
) => {
  sequelize
    .sync()
    .then(() => {
      console.log("1 Record Added!");

      Antrian.create({
        id,
        nama,
        no_hp,
        email,
        jenis_kelamin,
        shift,
        tanggal,
        antrian,
        status: "N",
      });
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

async function readSingleAntrian(id) {
  try {
    const result = await Antrian.findOne({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateAntrianStatus(id, status) {
  try {
    const antrian = await Antrian.findOne({ where: { id } });
    antrian.status = status;
    await antrian.save();
  } catch (error) {
    console.log("Error updating status:", error);
    throw error;
  }
}
module.exports = {
  createAntrian,
  readSingleAntrian,
  readAllAntrian,
  readAntrianShiftDate,
  updateAntrianStatus,
};
