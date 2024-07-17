import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/Container";

function DetailsQueue() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function resDetailAntrian() {
      try {
        const response = await Axios.get(
          `http://localhost:3000/queue/read_data/${id}`
        );
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    resDetailAntrian();
  }, [id]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center queue-details-page">
      {details.map((element, index) => (
        <div
          className="details-body"
          key={index}
          style={{
            marginTop: "10vh",
            height: "70vh",
            padding: "15vh",
            borderRadius: "10px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <h3 className="text-center mb-2">Kode Antrian : {element.id}</h3>

          <h3 className="text-center ">
            Nomor Antrian anda <br />
          </h3>
          <h3 className="text-center mt-2 mb-2">{element.antrian}</h3>
          <ul className="queue-list-detail mt-3">
            <li className="mt-2">Nama : {element.nama}</li>
            <li className="mt-2">No HP : {element.no_hp}</li>
            <li className="mt-2">Email : {element.email}</li>
            <li className="mt-2">Jenis Kelamin : {element.jenis_kelamin}</li>
            <li className="mt-2">Tanggal : {element.tanggal}</li>
            <li className="mt-2">Shift : {element.shift}</li>
          </ul>
        </div>
      ))}
    </Container>
  );
}

export default DetailsQueue;
