import axios from 'axios'
import { toastr } from 'react-redux-toastr'
//quem controla dados do formulário é o redux-form, ele limpa os campos
//basta utilizar as actions creator dele para evoluir o estado do formulário
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {credits: [{}], debts:[{}]}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED', 
        payload: request
    }
}


export function showUpdate(billingCycle) {
    // em billingCycleForm, flag destroy false é necessária 
    // pois o formulário está sendo inicializado antes da criação, 
    // impossibilitando a visualização dos dados. 
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function showDelete(billingCycle) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function create(values){
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    //faz dispatch somente se a ação retornou sem erro
    return dispatch => {
        const id = values._id ? values._id: ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                //dispatch recebe uma action (objeto), porém estamos passando 
                //um array por causa do middleware multi
                dispatch(init())
            })
            .catch(e => {
                //Erro retorna um array, portanto faz foreach
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })

    }
}

export function init(){
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}