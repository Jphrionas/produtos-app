import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductsDatatable from './components/Products/products-datatable.component';
import ProductsForm from './components/Products/products.form.component';

export default () => (
  <Switch>
    <Route exact path="/" component={ProductsDatatable} />
    <Route path="/new" component={ProductsForm} />
    <Route path="/update/:id" component={ProductsForm} />
  </Switch>
)