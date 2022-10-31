import React, { Component } from 'react'
import axios from 'axios'
import { Button, Col, Row } from 'react-bootstrap'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import numberWithCommas from '../utils/utils'
import { API_URL } from '../utils/constants'
import { Link } from 'react-router-dom'

class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            totalBayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios
            .post(API_URL + "pesanans", pesanan)
            .then(res => {console.log(res)})
            .catch(error => console.log(error))
    }

    render() {
        const { keranjangs } = this.props
        const totalBayar = keranjangs.reduce(function (result, item) {
            return result + item.totalHarga;
        }, 0)

        return (
            <>
            {/* Web */}
                <div className="fixed-bottom d-none d-md-block">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4 mb-3 d-grid gap-2">
                            <h4><strong>Total Harga: Rp. {numberWithCommas(totalBayar)}</strong></h4>
                            <Button variant="danger" size="md" onClick={() => this.submitTotalBayar(totalBayar)} as={Link} to="/sukses">
                                <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> BAYAR
                            </Button>
                        </Col>
                    </Row>
                </div>

            {/* Mobile */}
                <div className="d-block d-md-none">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4 mb-3 d-grid gap-2">
                            <h4><strong>Total Harga: Rp. {numberWithCommas(totalBayar)}</strong></h4>
                            <Button variant="danger" size="md" onClick={() => this.submitTotalBayar(totalBayar)} as={Link} to="/sukses">
                                <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> BAYAR
                            </Button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default TotalBayar