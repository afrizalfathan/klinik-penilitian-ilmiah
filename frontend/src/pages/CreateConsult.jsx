import { useState } from "react";
import Axios from "axios";
import FormConsult from "../components/FormConsult";
import { useNavigate } from "react-router-dom";
import otpHandler from "../components/otpHandler";

function CreateConsult() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [alergi, setAlergi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [otp, setOtp] = useState(0);
  const [otpGenerator, setOtpGenerator] = useState("");
  const [otpValidasi, setOtpValidasi] = useState(true);

  const navigate = useNavigate();
  function idKey() {
    return Date.now();
  }

  const createConsultHandler = async (e) => {
    e.preventDefault();
    const idHandler = idKey();
    if (parseInt(otp) === otpGenerator) {
      try {
        await Axios.post("http://localhost:3000/konsul/create_consult", {
          id: idHandler,
          nama,
          no_hp,
          jenis_kelamin,
          tanggal_lahir: tanggalLahir,
          keluhan,
          alergi,
          email,
          alamat,
        });
        navigate(`/konsul/details/${idHandler}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      setOtpValidasi(false);
    }
  };

  return (
    <FormConsult
      setAlergi={setAlergi}
      setKeluhan={setKeluhan}
      setJenis_kelamin={setJenis_kelamin}
      setNama={setNama}
      setNo_hp={setNo_hp}
      setOtp={setOtp}
      setAlamat={setAlamat}
      setTanggalLahir={setTanggalLahir}
      setEmail={setEmail}
      createConsultHandler={createConsultHandler}
      otpHandler={otpHandler}
      setOtpGenerator={setOtpGenerator}
      email={email}
      setOtpValidasi={setOtpValidasi}
      otpValidasi={otpValidasi}
    />
  );
}

export default CreateConsult;
