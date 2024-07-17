import { useState } from "react";
import Axios from "axios";
import FormConsult from "../components/FormConsult";
import { useNavigate } from "react-router-dom";

function CreateConsult() {
  const [nama, setNama] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [alergi, setAlergi] = useState("");
  const [alamat, setAlamat] = useState("");

  const navigate = useNavigate();
  function idKey() {
    return Date.now();
  }

  const createConsultHandler = async (e) => {
    e.preventDefault();
    const idHandler = idKey();
    try {
      await Axios.post("http://localhost:3000/konsul/create_consult", {
        id: idHandler,
        nama,
        no_hp,
        jenis_kelamin,
        tanggal_lahir: tanggalLahir,
        keluhan,
        alergi,
        alamat,
      });
      navigate(`/konsul/details/${idHandler}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormConsult
      setAlergi={setAlergi}
      setKeluhan={setKeluhan}
      setJenis_kelamin={setJenis_kelamin}
      setNama={setNama}
      setNo_hp={setNo_hp}
      setAlamat={setAlamat}
      setTanggalLahir={setTanggalLahir}
      createConsultHandler={createConsultHandler}
    />
  );
}

export default CreateConsult;
