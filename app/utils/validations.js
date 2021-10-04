import * as yup from 'yup';

const isValidEmail = (mail) => yup.string().email().isValidSync(mail)

export default {
  isValidEmail
}