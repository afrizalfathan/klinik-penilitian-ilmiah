import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

function DetailsKonsul() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [obatList, setObatList] = useState([]);
  const [newObatList, setNewObatList] = useState([]);

  useEffect(() => {
    async function getDetailsKonsul() {
      try {
        const response = await Axios.get(
          `http://localhost:3000/konsul/konsul_details/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const konsulData = response.data;
        setData(konsulData);
      } catch (error) {
        console.log(error);
      }
    }

    getDetailsKonsul();
  }, [id, token]);

  useEffect(() => {
    if (data.length > 0) {
      const takeObatObject = data.flatMap((items) =>
        (items.obat || []).map((element) => ({
          id: element.obatId,
          dosis: element.dosis,
          namaObat: element.namaObat,
        }))
      );
      setNewObatList([...takeObatObject, ...obatList]);
    }
  }, [data]);

  const handleNewObatChange = (index, event) => {
    const { name, value } = event.target;
    const updatedObatList = [...newObatList];
    updatedObatList[index][name] = value;
    setNewObatList(updatedObatList);
  };

  const handleSubmit = () => {
    const updatedObat = [...newObatList];

    const konsultasiData = { ...data, obat: updatedObat };
    Axios.put(
      `http://localhost:3000/konsul/konsul_details/update/${id}`,
      konsultasiData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addObat = () => {
    const idKey = Math.round(Math.random() * 800);
    setNewObatList([
      ...newObatList,
      { obatId: idKey, namaObat: "", dosis: "" },
    ]);
  };

  const removeObat = (id) => {
    const updatedObatList = newObatList.filter((obat) => obat.id !== id);
    console.log(updatedObatList);
    setNewObatList(updatedObatList);
  };

  return (
    <div className="create-consult-details-pages">
      <h1>Detail Konsultasi</h1>
      <Container className="konsul-detail-page d-flex">
        <Form>
          {data.map((items) => (
            <div className="form-edit-konsul" key={items.id}>
              <Form.Group controlId="nama" className="mb-3">
                <Form.Label>Nama :</Form.Label>
                <Form.Control type="text" value={items.nama} readOnly />
              </Form.Group>
              <Form.Group controlId="no-hp" className="mb-3">
                <Form.Label>Nomor Hp :</Form.Label>
                <Form.Control type="number" value={items.no_hp} readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGender">
                <Form.Label>Jenis Kelamin :</Form.Label>
                <Form.Control
                  type="text"
                  value={items.jenis_kelamin}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="ttl" className="mb-3">
                <Form.Label>Tahun dan Tanggal Lahir :</Form.Label>
                <Form.Control
                  type="date"
                  value={items.tanggal_lahir}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="alergi" className="mb-3">
                <Form.Label>Alergi :</Form.Label>
                <Form.Control type="text" value={items.alergi} readOnly />
              </Form.Group>
              <Form.Group controlId="keluhan" className="mb-3">
                <Form.Label>Keluhan :</Form.Label>
                <Form.Control as="textarea" value={items.keluhan} readOnly />
              </Form.Group>
              <Form.Group controlId="keluhan" className="mb-3">
                <Form.Label>Alamat :</Form.Label>
                <Form.Control as="textarea" value={items.alamat} readOnly />
              </Form.Group>
              <div className="obat-contaier">
                <h2>Obat</h2>
                {newObatList.map((obat, idx) => (
                  <div key={idx} className="d-flex align-items-center">
                    <Form.Group
                      controlId={`namaObat${idx}`}
                      className="mb-3 me-2"
                    >
                      <Form.Label>Nama Obat :</Form.Label>
                      <Form.Control
                        type="text"
                        name="namaObat"
                        defaultValue={obat.namaObat || ""}
                        placeholder={obat.namaObat ? "" : "Masukan obat "}
                        onChange={(e) => handleNewObatChange(idx, e)}
                      />
                    </Form.Group>
                    <Form.Group controlId={`dosis${idx}`} className="mb-3 me-2">
                      <Form.Label>Dosis :</Form.Label>
                      <Form.Control
                        type="text"
                        name="dosis"
                        defaultValue={obat.dosis || ""}
                        placeholder={obat.dosis ? "" : "Masukan dosis"}
                        onChange={(e) => handleNewObatChange(idx, e)}
                      />
                    </Form.Group>
                    <Button
                      variant="danger"
                      onClick={() => removeObat(obat.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" onClick={addObat}>
                  Tambah Obat
                </Button>
              </div>
            </div>
          ))}
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="primary" onClick={() => console.log(newObatList)}>
            Test
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default DetailsKonsul;
