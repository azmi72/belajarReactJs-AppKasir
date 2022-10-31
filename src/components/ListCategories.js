import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { API_URL } from '../utils/constants';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({ nama }) => {
    if (nama === 'Makanan') return <FontAwesomeIcon icon={faUtensils} className="mt-2 me-2 ms-1" />
    if (nama === 'Minuman') return <FontAwesomeIcon icon={faCoffee} className='mt-2 me-2' />
    if (nama === 'Cemilan') return <FontAwesomeIcon icon={faCheese} className='mt-2 me-2 ms-1' />

    return <FontAwesomeIcon icon={faUtensils} className='mt-2 me-2 ms-1' />
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { categories } = this.state
        const { changeCategory, categoryTerpilih } = this.props
        return (
            <Col md={2} className="mt-3">
                <h4>List Kategori</h4>
                <hr />

                <ListGroup>
                    {categories && categories.map(category => (
                        <ListGroup.Item
                            key={category.id}
                            onClick={() => changeCategory(category.nama)}
                            className={categoryTerpilih === category.nama && "category-aktif"}
                            style={{cursor: "pointer"}}
                        >
                                <h6>
                                    <Icon nama={category.nama} /> {category.nama}
                                </h6>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col >
        )
    }
}
