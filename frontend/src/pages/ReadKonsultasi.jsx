import Axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function ReadKonsultasi() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3000/konsul/read_all_konsul", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resolve) => setData(resolve.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>No HP</th>
            <th>Jenis Kelamin</th>
            <th>Alergi</th>
            <th>Alamat</th>
            <th>Usia</th>
            <th>Keluhan</th>
            <th>Obat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr key={index}>
              <td>{element.nama}</td>
              <td>{element.no_hp}</td>
              <td>{element.jenis_kelamin}</td>
              <td>{element.alergi}</td>
              <td>{element.alamat}</td>
              <td>{element.createdAt}</td>
              <td>{element.keluhan}</td>
              <td>
                {element.obat && element.obat.length > 0
                  ? element.obat.map((obat, idx) => (
                      <div key={idx}>
                        <p>Nama Obat: {obat.namaObat}</p>
                        <p>Dosis: {obat.dosis}</p>
                      </div>
                    ))
                  : "Obat belum dimasukan"}
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() =>
                    navigate(`/admin/konsultasi/konsul_details/${element.id}`)
                  }
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <p>{errorMessage}</p> */}
    </div>
  );
}

export default ReadKonsultasi;
