const express = require("express");
const { authenticateJWT, authorizeRole } = require("../middlewares/auth");
const {
  createConsult,
  readAllKonsul,
  readKonsul,
  updateConsult,
  checkKonsul,
} = require("../controllers/konsul_controller");
const router = express.Router();

// Router membuat konsul baru
router.post("/create_consult", async (req, res) => {
  try {
    const {
      id,
      nama,
      no_hp,
      jenis_kelamin,
      tanggal_lahir,
      alergi,
      alamat,
      keluhan,
    } = req.body;

    console.log(
      id,
      nama,
      no_hp,
      jenis_kelamin,
      tanggal_lahir,
      alergi,
      alamat,
      keluhan
    );

    const newConsult = await createConsult(
      id,
      nama,
      no_hp,
      jenis_kelamin,
      tanggal_lahir,
      alergi,
      alamat,
      keluhan
    );

    res.status(201).send(newConsult);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Router membaca data konsul
router.get(
  "/read_all_konsul",
  authenticateJWT,
  authorizeRole("doctor"),
  async (req, res) => {
    try {
      const readKonsul = await readAllKonsul();
      res.status(201).send(readKonsul);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }
);

// Router membaca konsul menggunakan id di admin
router.get(
  "/konsul_details/:id",
  authenticateJWT,
  authorizeRole("doctor"),
  async (req, res) => {
    try {
      const getIdKonsul = req.params.id;
      const konsulData = await readKonsul(getIdKonsul);
      if (konsulData) {
        res.status(200).send([konsulData]);
      } else {
        res.status(404).send({ message: "Consultation not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  }
);

// Router cek konsul menggunakan id
router.get("/read_data/:id", async (req, res) => {
  try {
    const result = await checkKonsul(req.params.id);
    res.send([result]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Router update obat di konsul
router.put(
  "/konsul_details/update/:id",
  authenticateJWT,
  authorizeRole("doctor"),
  async (req, res) => {
    const { id } = req.params;
    const { obat } = req.body;

    try {
      const updatedKonsultasi = await updateConsult(id, obat);
      res.status(200).json(updatedKonsultasi);
    } catch (error) {
      res.status(500).json({ message: "Error updating konsultasi", error });
    }
  }
);

module.exports = router;
