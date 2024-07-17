const express = require("express");
const { authenticateJWT, authorizeRole } = require("../middlewares/auth");
const {
  createAntrian,
  readSingleAntrian,
  readAllAntrian,
  readAntrianShiftDate,
  updateAntrianStatus,
} = require("../controllers/antrian_controller");

const router = express.Router();

router.post("/create_queue", async (req, res) => {
  let { id, nama, no_hp, email, jenis_kelamin, shift, tanggal } = req.body;

  // Tambahkan log untuk tanggal di backend
  console.log("Tanggal sebelum formatting: ", tanggal);

  // Konversi tanggal ke format yang benar jika perlu
  if (isNaN(Date.parse(tanggal))) {
    return res.status(400).send({ error: "Invalid date format" });
  }

  // Opsional: Format ulang tanggal ke YYYY-MM-DD jika perlu
  const formattedTanggal = new Date(tanggal).toISOString().split("T")[0];
  console.log("Formatted Tanggal: ", formattedTanggal);

  const antrianLength = await readAntrianShiftDate(shift, formattedTanggal);
  const antrianHandler = antrianLength < 1 ? 1 : antrianLength + 1;

  try {
    const newAntrian = await createAntrian(
      id,
      nama,
      no_hp,
      email,
      jenis_kelamin,
      shift,
      formattedTanggal,
      antrianHandler
    );
    res.status(201).send(newAntrian);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// router.post("/create_queue", async (req, res) => {
//   const { id, nama, no_hp, email, jenis_kelamin, shift, tanggal } = req.body;
//   const antrianLength = await readAntrianShiftDate(shift, tanggal);
//   const antrianHandler = antrianLength < 1 ? 1 : antrianLength + 1;

//   try {
//     const newAntrian = await createAntrian(
//       id,
//       nama,
//       no_hp,
//       email,
//       jenis_kelamin,
//       shift,
//       tanggal,
//       antrianHandler
//     );
//     res.status(201).send(newAntrian);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

router.get("/read_data/:id", async (req, res) => {
  try {
    const result = await readSingleAntrian(req.params.id);
    res.send([result]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

router.get(
  "/read_data",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const readsAntrian = await readAllAntrian();
      res.status(201).send(readsAntrian);
    } catch (error) {
      console.log(error);
    }
  }
);

// Tambahkan ini di antrian_router.js
router.put(
  "/update_status/:id",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log(status, id);

    try {
      const updatedAntrian = await updateAntrianStatus(id, status);
      res.status(200).send(updatedAntrian);
    } catch (error) {
      console.log("Error in route /update_status:", error);
      res.status(500).send({ error: error.message });
    }
  }
);

module.exports = router;
