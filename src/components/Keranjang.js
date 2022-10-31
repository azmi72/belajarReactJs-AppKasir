import React, { Component } from 'react'
import { Col, Row, ListGroup, Badge, Card } from 'react-bootstrap'
import numberWithCommas from '../utils/utils'
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Keranjang extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            hargaBaru: 0,
        }
    }

    handleShow = (produknya) => {
        this.setState({
            showModal: true,
            keranjangDetail: produknya,
            jumlah: produknya.jumlah,
            keterangan: produknya.keterangan,
            hargaBaru: produknya.totalHarga,
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false,
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            hargaBaru: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                hargaBaru: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    changeHandler = (e) => {
        this.setState({
            keterangan: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            totalHarga: this.state.hargaBaru,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan,
        }

        axios
            .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListUpdate()
                swal({
                    title: "Update Pesanan",
                    text: data.product.nama + " Berhasil Diubah!",
                    icon: "success",
                    button: false,
                    timer: 1500,
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    hapusPesanan = (id) => {
        this.handleClose();

        axios
            .delete(API_URL + "keranjangs/" + id)
            .then(res => {
                this.props.getListUpdate()
                swal({
                    title: "Hapus Pesanan",
                    text: this.state.keranjangDetail.product.nama + " Berhasil Dihapus!",
                    icon: "error",
                    button: false,
                    timer: 1500,
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { keranjangs } = this.props;
        return (
            <Col md={3} className="mt-3">
                <h4>Keranjang</h4>
                <hr />

                {keranjangs.length !== 0 && (
                    <Card className="overflow-auto keranjang">
                        <ListGroup variant="flush">
                            {keranjangs.map(produknya => (
                                <ListGroup.Item key={produknya.id} onClick={() => this.handleShow(produknya)}>
                                    <Row>
                                        <Col xs={2}>
                                            <Badge pill bg="danger">
                                                {produknya.jumlah}
                                            </Badge>
                                        </Col>
                                        <Col xs={6}>
                                            <h6>{produknya.product.nama}</h6>
                                            <p>Rp. {numberWithCommas(produknya.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-end">
                                                Rp. {numberWithCommas(produknya.totalHarga)}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}

                            <ModalKeranjang
                                handleClose={this.handleClose}
                                {...this.state}
                                tambah={this.tambah}
                                kurang={this.kurang}
                                changeHandler={this.changeHandler}
                                handleSubmit={this.handleSubmit}
                                hapusPesanan={this.hapusPesanan}
                            />
                        </ListGroup>
                    </Card>
                )}

                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}
