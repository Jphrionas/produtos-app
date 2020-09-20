import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

import showMessageErrors from '../../helpers/show-message-errors';

import { formatDateFrom } from '../../helpers/date-helper';

import { 
  Button,
  Form,
  Alert,
  InputGroup,

  Row,
  Col
  } from 'react-bootstrap';

  import { FaDollarSign, FaCalendar } from 'react-icons/fa';

import ProductsService from '../../services/products-service';

const TIPOS = {
  'S': 'Serviço',
  'M': 'Mercadoria',
}

const ORIGENS = {
  '0': 'Nacional',
  '1': 'Estrangeira - Direta',
  '2': 'Estrangeira - Mercado Interna',
}

const INITIAL_FORM_DATA = {
  CODIGO: null,
  DESCRICAO: '',
  CD_BARRA: '',
  TIPO: 'S',
  ORIGEM: '1',
  VL_PRECO_VENDA: '',
  DT_ULTIMA_COMPRA: ''
}

const ProductsForm = prosp => {

  const history = useHistory();
  const params = useParams();

  const [loadingData, setLoadingData] = useState(false);
  const [ formErrors, setFormErrors ] = useState({});
  const [ formData,  setFormData] = useState(INITIAL_FORM_DATA)


  useEffect(() => {

    const fetchData = async () => {
      const id = params.id;
      if (id) {
        setLoadingData(true);

        try {
          const { data } = await ProductsService.getProduct(id)

          setFormData({
            ...data.data, 
            'CD_BARRA': data.data.CD_BARRA || '',
            'DT_ULTIMA_COMPRA': new Date(data.data.DT_ULTIMA_COMPRA),
          })
          setLoadingData(false);
        } catch(err) {
           history.replace('/', { location: history.location })
        }
      }
    }

    fetchData();
  }, [])

  


  const handleChange = (e) => {
    let { name, value } = e.target;

    switch(name) {
      case 'DESCRICAO':
        formErrors.DESCRICAO = value.length > 0 && value.length > 100 
          ? 'O campo descrição deve conter no máximo 100 caracteres' 
          : '';
        break;
      case 'CD_BARRA':
        formErrors.CD_BARRA = value.length > 0 && value.length > 14 
          ? 'O campo código de barras deve conter no máximo 14 caracteres'
          : '';
        
        value = value.replace(/\D+/, '');
        break;
      case 'TIPO':
        formErrors.TIPO = !value || !Object.keys(TIPOS).includes(value)
        ? `O tipo do produto deve ser uma das seguites opções ${Object.values(TIPOS).join(",")}`
        : '';
        break;
      case 'ORIGEM':
        formErrors.ORIGEM = !value || !Object.keys(ORIGENS).includes(value)
        ? `A origem do produto deve ser uma das seguites opções ${Object.values(ORIGENS).join(",")}`
        : '';
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors })
    setFormData({ ...formData, [name]: value, })
  }


  const handleChangeDatePicker = value => {
    setFormData({ 
      ...formData, 
      'DT_ULTIMA_COMPRA': value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const id = params.id;


    let precoFormadado = formData['VL_PRECO_VENDA']
    .replace(/\./, '')
    .replace(',', '')

    const payload = {
    ...formData,
    'DT_ULTIMA_COMPRA': formatDateFrom(formData['DT_ULTIMA_COMPRA']),
    'VL_PRECO_VENDA': `${precoFormadado.substr(0, 4)}.${precoFormadado.substr(4)}`
    }


    const fn = !params.id ? 
    ProductsService.saveProduct(payload) : 
    ProductsService.updateProduct(id, payload)


    try {
      await fn
      toast.info(`O produto foi ${id ? 'atualizado': 'salvo'} com sucesso!`);

      setFormData(INITIAL_FORM_DATA);
      history.push('/');
    } catch(err) {
      showMessageErrors(err)
    }
  }



  const formIsValid = () => {
    return !Object.values(formErrors).some(err => err.length);
  }

  const { CODIGO, DESCRICAO,CD_BARRA, DT_ULTIMA_COMPRA,TIPO, ORIGEM, VL_PRECO_VENDA } = formData;
  const isEditing = CODIGO !== null;


  const renderRadioButtons = Object.keys(TIPOS).map((tipo, idx) => {
    const uniqueKey = `${tipo}_${idx}_key`;
    return (
      <Form.Check  
        name="TIPO"
        key={uniqueKey}
        id={uniqueKey} 
        inline 
        value={tipo}
        onChange={handleChange}
        type="radio"  
        label={TIPOS[tipo]} 
        checked={TIPO === tipo}/>
    )
  });


  const renderOrigens = Object.keys(ORIGENS).map((tipo, idx) => (
    <option key={`${tipo}_${idx}_key` } value={tipo}>{ORIGENS[tipo]}</option>
  ));

  const showError = fieldName => {
    const errMessage = formErrors[fieldName]
    return errMessage ? (<Alert variant="danger">{errMessage}</Alert>) : null;
  }

  return !loadingData ? (

      <Form onSubmit={handleSubmit}>
        {isEditing && (
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Código</Form.Label>
            <Col>
              <Form.Control name="CODIGO" readOnly type="text" value={CODIGO} />
            </Col>
          </Form.Group>)}
        <Form.Group as={Row}>
            <Form.Label column sm={2}>Descrição</Form.Label>
            <Col>
             <Form.Control 
              name="DESCRICAO" 
              type="text"
              value={DESCRICAO}
              onChange={handleChange}
              placeholder="Insira a descrição" />
            </Col>
            {showError('DESCRICAO')}
          </Form.Group>
       
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Código de Barras</Form.Label>
          <Col>
            <Form.Control 
              name="CD_BARRA"
              value={CD_BARRA}
              onChange={handleChange}
              type="text"

              placeholder="Insira o código de barras" />
            </Col>
          {showError('CD_BARRA')}
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Tipo</Form.Label>
          <Col>
          <div className="inline-checkbox mb-3">
            { renderRadioButtons }
            {showError('TIPO')}
          </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Origem:</Form.Label>
          <Col>
          <Form.Control as="select" name="ORIGEM" 
            value={ORIGEM}
            onChange={handleChange}>
            {renderOrigens}
          </Form.Control>
          </Col>
          {showError('ORIGEM')}
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Preço Venda:</Form.Label>
          <Col>
            <InputGroup>
              <InputGroup.Prepend>
              <InputGroup.Text>
              <FaDollarSign />
              </InputGroup.Text>
              </InputGroup.Prepend>
              <CurrencyFormat 
              value={VL_PRECO_VENDA}
              onChange={handleChange}
              name="VL_PRECO_VENDA"
              className="form-control" 
              format="#.###,##"
                ></CurrencyFormat>
            </InputGroup>
          </Col>
            {showError('VL_PRECO_VENDA')}
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Dt. Última Compra:</Form.Label>
          <Col>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaCalendar />
                </InputGroup.Text>
              </InputGroup.Prepend>
                <DatePicker 
                value={DT_ULTIMA_COMPRA} 
                selected={DT_ULTIMA_COMPRA}
                onChange={handleChangeDatePicker}
                dateFormat="dd/MM/yyyy"
                name="DT_ULTIMA_COMPRA" 
                className="form-control" />
              </InputGroup>
          </Col>
          {showError('DT_ULTIMA_COMPRA')}
 
        </Form.Group>
        <Button type="submit "
          disabled={!formIsValid()}
           variant={isEditing ? 'primary': 'success'} className="mr-3">{ isEditing ? 'Atualizar' : 'Salvar'}</Button>
        <Link to="/"  className="btn btn-light">Voltar</Link>
      </Form>
  ) : (<h1>Buscando produto...</h1>)

}

export default ProductsForm;