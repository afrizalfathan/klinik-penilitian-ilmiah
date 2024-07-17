import React from "react"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { LuNavigation } from "react-icons/lu"

function About() {
    return (
        <Container fluid className="jumbotron-about">
            <Container>
                <Row className="p-5">
                    <Col className="about-left">
                        <h3>Layanan Kami</h3>
                        <Container className="layanan-button-container">
                            <button className="header-button w-50 antrian-button p-2">
                                Daftar Antrian Sekarang
                                <LuNavigation className="ms-2" />
                            </button>
                            <button className="header-button w-50 obat-button p-2 mt-2">
                                Pesan Obat Sekarang
                                <LuNavigation className="ms-2" />
                            </button>
                        </Container>
                    </Col>
                    <Col className="about-right">
                        <h3>Tentang Kami</h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Mollitia libero labore laudantium. Atque
                            repudiandae architecto vero eligendi dolor minus
                            incidunt?
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default About
