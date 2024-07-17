import React from "react"
import Container from "react-bootstrap/esm/Container"
import Button from "react-bootstrap/Button"

function HeaderHome() {
    return (
        <Container fluid className="background_jumbotron">
            <Container>
                <div className="jumbotron p-5">
                    <h1>
                        Selamat Datang di
                        <br />
                        <span> Klinik Kami!</span>
                    </h1>
                    <p className="fs-5 mt-3">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        <br />
                        elit. Accusamus, iste!
                    </p>
                    <div className="button-jumbotron mt-4">
                        <button className="header-button antrian-button p-2">
                            Daftar Antrian Sekarang
                        </button>
                        <button className="header-button obat-button ms-2 p-2">
                            Pesan Obat Sekarang
                        </button>
                    </div>
                </div>
            </Container>
        </Container>
    )
}

export default HeaderHome
