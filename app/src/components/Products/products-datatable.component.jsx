import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPen, FaUndo, FaPlus } from 'react-icons/fa';

import { Table, Button, Row, Col, Modal, Pagination } from 'react-bootstrap';
import ProductsService from '../../services/products-service';


import { toast } from 'react-toastify';

export default class ProductsDataTable extends React.Component {

  state = {
    page: 1,
    size: 5,
    total: 0,
    products: [],
    selectedProduct: null,
    showModal: false
  }


  componentDidMount = () => {
    this.fetchProducts()
  }
  
  handleSelectProduct = selectedProduct => {
    this.setState({ selectedProduct }, () => {
      this.toggleModal()
    })
  }

  fetchProducts = async (page = this.state.page, size = this.state.size) => {
    try {
      // const { page, size } = this.state;
      const { data } = await ProductsService.getProducts(page, size)
      this.setState({ 
        ...this.state,
        page: data.page * 1,
        size: data.size * 1,
        total: data.total * 1,
        products: data.data
       });

    } catch(err) {
      toast.error('Erro ao buscar os produtos, tente novamente mais tarde!');
    }
  }

  handleRemoveProduct = async () => {
    try {
      const { selectedProduct, products, showModal } = this.state;
      const CODIGO = selectedProduct.CODIGO;
      const { data } = await ProductsService.removeProduct(selectedProduct.CODIGO);

      toast.warn(`O produto "${selectedProduct.DESCRICAO}" foi removido com sucesso!`);


      this.setState({ 
        page: data.page,
        size: data.size,
        products: products.filter(p => p.CODIGO !== CODIGO),
        selectedProduct: null,
        showModal: !showModal
       })
    } catch(err) {
      toast.error('Erro ao remover produto, tente novamente mais tarde!');
    }
  }


  handlePaginate = page => {
    this.fetchProducts(page)
  }


  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal })
  }


  renderPaginator = () => {
    const { page, total, size } = this.state;
    const next = page + 1;
    const prev = page - 1;
    const pages = total > 1 ?  Math.ceil(Math.abs(total / size)) : 1 ;

    return (
      <div className="d-flex justify-content-end">
      <Pagination>
      <Pagination.Prev 
        disabled={page <= 1} 
        onClick={() => this.handlePaginate(prev)}  />
      {
        Array(pages).fill(0).map((_, idx) => {
          const currentPage = idx + 1;
         return(
          <Pagination.Item 
            onClick={() => this.handlePaginate(currentPage)}
            key={`pi_${idx}`} active={currentPage === page}>{currentPage}
          </Pagination.Item>
         )
        })
      }
      <Pagination.Next 
        onClick={() => this.handlePaginate(next)} 
        disabled={page >=  pages }  />
    </Pagination>
      </div>
    )
  }

  render() {
    const { products, selectedProduct, showModal } = this.state;
  
    const renderRows = products.map(product => (
      <tr key={`product_${product.CODIGO}`}>
        <td>{product.CODIGO}</td>
        <td>{product.DESCRICAO}</td>
        <td className="table-actions">
          <div className="d-flex align-items-center justify-content-between">
            <Button 
            variant="danger" 
            size="sm"
            onClick={() => this.handleSelectProduct(product)}
            type="button">
              <FaTrash />
            </Button>
            <Link className="btn btn-sm btn-primary" to={`/update/${product.CODIGO}`}>
              <FaPen />
            </Link>
          </div>
        </td>
      </tr>
    ));

    return (
      <Row>
          <Col sm={12} className="mb-4">
            <div className="d-flex align-items-center justify-content-center">
            <Button type="button" size="sm" className="mr-3" onClick={() => this.fetchProducts()}>
                Atualizar <FaUndo className="ml-1"/>
            </Button>
            <Link to="/new" className="btn btn-success mr-3 btn-sm">
                Novo Produto <FaPlus className="ml-1"/>
              </Link>
            </div>
          </Col>
          <Col>
          {
          products && products.length ? (
            <>
              <Table stripped="true" bordered="true" hover="true" responsive="true" >
              <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>{renderRows}</tbody>
            </Table>
            { this.renderPaginator() }
            </>
          ) : (<h2 className="text-center">Nenhum produto para listar!</h2>)
          }
          
          </Col>
          {
          showModal && selectedProduct && (
            <Modal show={showModal} onHide={this.toggleModal}>
              <Modal.Header closeButton="true">
                <Modal.Title>Confirmar remoção do produto!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Deseja remover o produto {selectedProduct.DESCRICAO}?</p>
              </Modal.Body>
              <Modal.Footer>
              <Button type="button" variant="secondary" onClick={this.toggleModal}>
                Close
              </Button>
              <Button type="button" variant="danger" onClick={this.handleRemoveProduct}>
                Remover
              </Button>
            </Modal.Footer>
            </Modal>
            )
          }
          
        </Row>
    )
  }
}