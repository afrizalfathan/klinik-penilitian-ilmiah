import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FormConsult({
  setNama,
  setNo_hp,
  setAlergi,
  setJenis_kelamin,
  setKeluhan,
  setTanggalLahir,
  setAlamat,
  createConsultHandler,
  setEmail,
  otpHandler,
  email,
  setOtpGenerator,
  setOtp,
  otpValidasi,
}) {
  return (
    <div className="create-consult-pages">
      <Container className="queue-page w-50">
        <Form>
          <Form.Group controlId="nama" className="mb-3">
            <Form.Label>Nama : </Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukan Nama"
              onChange={(e) => setNama(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="no-hp" className="mb-3">
            <Form.Label>Nomor Hp : </Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukan No HP"
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
              onClick={(e) => otpHandler({ setOtpGenerator, e, email })}
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
          <Form.Group controlId="ttl" className="mb-3">
            <Form.Label>Tahun dan Tanggal Lahir : </Form.Label>
            <Form.Control
              type="date"
              placeholder="Masukan Tahun dan Tanggal Lahir"
              onChange={(e) => setTanggalLahir(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="alergi" className="mb-3">
            <Form.Label>Alergi : </Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukan Alergi"
              onChange={(e) => setAlergi(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="keluhan" className="mb-3">
            <Form.Label>Keluhan : </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Masukan Keluhan"
              onChange={(e) => setKeluhan(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="keluhan" className="mb-3">
            <Form.Label>Alamat : </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Masukan Alamat"
              onChange={(e) => setAlamat(e.target.value)}
            />
          </Form.Group>
          <div className="otp-section">
            <Form.Label>Kode OTP</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpValidasi === false && <span>Otp Salah</span>}
          </div>
          <Button variant="primary" onClick={createConsultHandler}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default FormConsult;
