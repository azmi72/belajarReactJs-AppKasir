import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import numberWithCommas from '../utils/utils'

const ModalKeranjang = ({ 
        showModal, 
        handleClose, 
        keranjangDetail, 
        jumlah, 
        keterangan, 
        tambah, 
        kurang, 
        changeHandler, 
        handleSubmit,
        hargaBaru,
        hapusPesanan,
        }) => {
    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{keranjangDetail.product.nama}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                Total Harga:
                                <p><strong>
                                    Rp. {numberWithCommas(hargaBaru)}
                                </strong></p>
                            </Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Jumlah: </Form.Label>
                            <br />
                            <Button variant="danger" className="me-2" size="sm" onClick={() => kurang()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            {jumlah}
                            <Button variant="danger" className="ms-2" size="sm" onClick={() => tambah()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan: </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keterangan"
                                placeholder="Contoh: Pedas, Banyakin kuahnya, ..."
                                value={keterangan}
                                onChange={(e) => changeHandler(e)}
                            />
                        </Form.Group>

                        <Button variant="danger" type="submit">Simpan</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => hapusPesanan(keranjangDetail.id)}>
                        <FontAwesomeIcon icon={faTrash} className="me-1" /> Hapus
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Kosong</Modal.Title>
            </Modal.Header>
            <Modal.Body>Kosong</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Hapus</Button>
            </Modal.Footer>
        </Modal>
    }
}

export default ModalKeranjang
