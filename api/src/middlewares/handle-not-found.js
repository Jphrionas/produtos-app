import NotFoundError from "../errors/not-found-error";

export default (req, res, next) => next(new NotFoundError("Recurso não encontado no servidor!"))