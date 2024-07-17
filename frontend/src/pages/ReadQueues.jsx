import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useState, useEffect } from "react";

function Antrian() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get("http://localhost:3000/queue/read_data", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resolve) => setData(resolve.data))
      .catch((error) => console.log(error));
  }, [data, token]);

  function filteredData(status) {
    return data.filter((el) => el.status === status);
  }

  const handleUpdateStatus = async (id, status) => {
    await Axios.put(
      `http://localhost:3000/queue/update_status/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  return (
    <div className="container">
      <div className="status-queue-no">
        <h3>Antrian Sedang Di Proses</h3>
        <Table bordered hover className="p-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Jenis Kelamin</th>
              <th>Shift</th>
              <th>Tanggal</th>
              <th>Antrian</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData("N").map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.nama}</td>
                <td>{element.no_hp}</td>
                <td>{element.email}</td>
                <td>{element.jenis_kelamin}</td>
                <td>{element.shift}</td>
                <td>{element.tanggal}</td>
                <td>{element.antrian}</td>
                <td>{element.createdAt}</td>
                <td>{element.updatedAt}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleUpdateStatus(element.id, "Y")}
                  >
                    Selesai
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="status-queue-no mt-5">
        <h3>Antrian Sudah Di Proses</h3>
        <Table bordered hover className="p-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Jenis Kelamin</th>
              <th>Shift</th>
              <th>Tanggal</th>
              <th>Antrian</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
            </tr>
          </thead>
          <tbody>
            {filteredData("Y").map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.nama}</td>
                <td>{element.no_hp}</td>
                <td>{element.email}</td>
                <td>{element.jenis_kelamin}</td>
                <td>{element.shift}</td>
                <td>{element.tanggal}</td>
                <td>{element.antrian}</td>
                <td>{element.createdAt}</td>
                <td>{element.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Antrian;
