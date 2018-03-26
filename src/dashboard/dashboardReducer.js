const INITIAL_STATE = {summary: {credit: 0, debt:0}}

export default function(state = INITIAL_STATE, action) {
    switch (action.type){
        //retorna novo estado
        case 'BILLING_SUMMARY_FETCHED':
            //primeiro armazena estado e depois atualiza sumário
            //precisa de middleware, pois dado não está pronto
            return { ...state, summary: action.payload.data }
        default:
            return state
    }

}