import { toast } from 'react-toastify'

export default (err) => {
  if (err.response && err.response.data) {
    const { errors } = err.response.data
    errors.forEach(item => toast.error(item.message))
  }
}