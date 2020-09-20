import knex from '../index';

const checkParameter = (paramName, paramValue) => {
  if (!paramValue) throw new Error(`Missing parameter ${paramName}`)
}


class Model {

  constructor(tableName = checkParameter('tableName', tableName)) {
    this.tableName = tableName
  }

  _query(values = {}, columns = '*') {
    return knex(this.tableName).where(values).select(columns);
  }

  async save(data = {}) {
    const [ id ] = (await knex(this.tableName).insert(data));
    return { ...data, id }
  }
  

  async find(query = {}, columns = '*') {
    return await this._query(query, columns);
  }

  async findOne(query = {}, columns = '*') {
    return await this._query(query, columns).first();
  }

  async findById(id, columns = '*') {
    return await this._query({ CODIGO: id }, columns).first();
  }

  async findByIdAndUpdate(id, data) {
    const query = { CODIGO: id };
    await this._query(query).update(data);

    return {...data, ...query }; 
  }

  async findByIdAndDelete(id) {
    return await this._query({ CODIGO: id }).del();
  }


  async count() {
    return (await knex(this.tableName).count());
  }
}


export const createModel = modelName => new Model(modelName);