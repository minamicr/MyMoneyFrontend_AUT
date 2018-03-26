//Requisições para backend
import axios from 'axios'
const BASE_URL = 'http://localhost:3003/api'

// função action creator - cria um objeto que é uma ação
export function getSummary() {
    //chamada assincrona do serviço, utilizando axios
    const request = axios.get(`${BASE_URL}/billingCycles/summary`)
    return {
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}