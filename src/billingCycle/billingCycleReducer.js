const INITIAL_STATE = {list: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BILLING_CYCLES_FETCHED':
            //operador spread para replicar estado atual, pois o estado
            //deve ser evoluído e não alterado
            //dentro da action existe o payload (request) e data
            return { ...state, list: action.payload.data }
        default:
            return state
    }
}