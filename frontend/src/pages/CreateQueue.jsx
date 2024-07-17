import { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";

function Queue() {
  const [nama, setNama] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [email, setEmail] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [searchAntrian, setSearchAntrian] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [shift, setShift] = useState("");
  const [otpGenerator, setOtpGenerator] = useState("");
  const [otp, setOtp] = useState(0);
  const [otpValidasi, setOtpValidasi] = useState(true);

  let navigate = useNavigate();

  function idKey() {
    return Date.now();
  }

  async function createAntrian() {
    const idHandler = idKey();

    const queueData = {
      id: idHandler,
      nama,
      no_hp,
      email,
      jenis_kelamin,
      tanggal,
      shift,
    };

    console.log(queueData);

    console.log(otp, otpGenerator);
    if (parseInt(otp) === otpGenerator) {
      try {
        console.log("oh yeah!!!");
        await Axios.post("http://localhost:3000/queue/create_queue", queueData);
        localStorage.setItem("queueData", JSON.stringify(queueData));
        navigate(`/queue/details/${idHandler}`);
      } catch (err) {
        console.log("Error in createAntrian: ", err);
      }
    } else {
      setOtpValidasi(false);
    }
  }

  async function otpHandler(e) {
    e.preventDefault();

    const otpRandom = Math.round(Math.random() * 999);
    console.log(otp);
    setOtpGenerator(otpRandom);
    console.log(otpRandom);

    try {
      Axios.post("http://localhost:3000/email_routes/email_send", {
        from: "refleurflower@gmail.com",
        to: email,
        subject: "Kode OTP untuk Verifikasi",
        message: `Hai, kode otp kamu ${otpGenerator}`,
      });
      alert("Kode OTP sudah dikirim, silahkan cek email anda!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="queue-page w-75">
      <Row>
        <Col>
          <h3 className="text-center mt-5">
            Selamat Datang,
            <br /> Silahkan Daftar Antrian
          </h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <div className="form-antrian">
            <Form>
              <Form.Group className="mb-3" controlId="formNama">
                <Form.Label>Nama : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan Nama"
                  onChange={(e) => setNama(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNomorHP">
                <Form.Label>Nomor HP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan Nomor HP"
                  onChange={(e) => setNo_hp(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex" controlId="formEmail">
                <div className="form-email-section">
                  <Form.Label>Email : </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukan Email"
                    style={{ width: "61vh" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  variant="warning h-50 ms-4"
                  style={{ marginTop: "5.8%", marginLeft: "2%" }}
                  onClick={(e) => otpHandler(e)}
                >
                  Send OTP
                </Button>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGender">
                <Form.Label>Pilih Jenis Kelamin : </Form.Label>
                <Form.Select
                  defaultValue=""
                  className="mb-3"
                  onChange={(e) => setJenis_kelamin(e.target.value)}
                >
                  <option value="" disabled>
                    Jenis Kelamin
                  </option>
                  <option value="Laki-Laki">Laki Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Tanggal : </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Masukan tanggal"
                  onChange={(e) => setTanggal(e.target.value)}
                />
              </Form.Group>
              <Form.Select
                className="mb-3"
                defaultValue=""
                onChange={(e) => setShift(e.target.value)}
              >
                <option value="" disabled>
                  Pilih Shift
                </option>
                <option value="Shift 1 : 06.30 - 8.30">
                  Shift 1 : 06.30 - 8.30
                </option>
                <option value="Shift 2 : 16.30 - 19.30">
                  Shift 2 : 16.30 - 19.30
                </option>
              </Form.Select>

              <div className="otp-section">
                <Form.Label>Kode OTP</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setOtp(e.target.value)}
                />
                {otpValidasi === false && <span>Otp Salah</span>}
              </div>

              <Button
                className="mt-3 mb-5"
                variant="primary"
                onClick={createAntrian}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col>
          <div className="aside-antrian ms-5 ">
            <h3>Cek Antrian Anda</h3>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Masukan ID antrian"
                onChange={(e) => setSearchAntrian(e.target.value)}
              />
              <Button
                variant="warning"
                onClick={() => navigate(`/queue/details/${searchAntrian}`)}
              >
                Button
              </Button>
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Queue;
