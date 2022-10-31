import React, { Component } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Keranjang, ListCategories, Menus } from '../components';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            categoryTerpilih: "Makanan",
            keranjangs: []
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "products?category.nama=Makanan")
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error => {
                console.log(error);
            })

        axios
            .get(API_URL + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })
            .catch(error => {
                console.log(error);
            })
    }

    // componentDidUpdate(prevState) {
    //     if (this.state.keranjangs !== prevState.keranjangs) {
    //         axios
    //             .get(API_URL + "keranjangs")
    //             .then(res => {
    //                 const keranjangs = res.data;
    //                 this.setState({ keranjangs });
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //     }
    // }

    getListUpdate = () => {
        axios
            .get(API_URL + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })
            .catch(error => {
                console.log(error);
            })
    }

    changeCategory = (value) => {
        this.setState({
            categoryTerpilih: value,
            menus: []
        })

        axios
            .get(API_URL + "products?category.nama=" + value)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error => {
                console.log(error);
            })
    }

    masukKeranjang = (value) => {
        axios
            .get(API_URL + "keranjangs?product.id=" + value.id)
            .then(res => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        totalHarga: value.harga,
                        product: value
                    }

                    axios
                        .post(API_URL + "keranjangs", keranjang)
                        .then(res => {
                            this.getListUpdate();
                            swal({
                                title: "Yey Masuk Keranjang",
                                text: keranjang.product.nama + " Sudah Ditambahkan!",
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        totalHarga: res.data[0].totalHarga + value.harga,
                        product: value
                    }

                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
                        .then(res => {
                            swal({
                                title: "Yey Masuk Keranjang",
                                text: keranjang.product.nama + " Sudah Ditambahkan!",
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        const { menus, categoryTerpilih, keranjangs } = this.state;

        return (
                <div>
                    <Container fluid>
                        <Row>

                            <ListCategories changeCategory={this.changeCategory} categoryTerpilih={categoryTerpilih} />

                            <Col className="mt-3">
                                <h4>Daftar Produk</h4>
                                <hr />
                                <Row className="overflow-auto menu">
                                    {menus && menus.map(menu => (
                                        <Menus key={menu.id} menu={menu} masukKeranjang={this.masukKeranjang} />
                                    ))}
                                </Row>
                            </Col>

                            <Keranjang keranjangs={keranjangs} {...this.props} getListUpdate={this.getListUpdate}/>

                        </Row>
                    </Container>
                </div>
        )
    }
}

export default Home;
