import axios from 'axios';

// Currently there is no BFF. Meaning it call external services directly
const teliaeServiceURL = process.env.TELIAE_SERVICE_URL || 'http://127.0.0.1:9000';

export const http = axios.create({
  baseURL: teliaeServiceURL,
  headers: {
    'content-type': 'application/json',
  },
});
