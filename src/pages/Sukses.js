import React, { Component } from 'react'
import { Container, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/constants'


class Sukses extends Component {
    componentDidMount() {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data
                keranjangs.map(function (item) {
                    return axios
                        .delete(API_URL + "keranjangs/" + item.id)
                        .then((res) => console.log("Already Delete"))
                        .catch((error) => console.log(error))
                })
            })
            .catch((error) => console.log(error))
    }

    render() {
        return (
            <Container className="mt-5 text-center">
                <Image src="assets/images/sukses.png" width="500" />
                <h4><strong>Terima Kasih</strong></h4>
                <p>Pesanan akan kami proses yaa!</p>
                <Button variant="danger" as={Link} to="/">Kembali</Button>
            </Container>
        )
    }
}

export default Sukses
