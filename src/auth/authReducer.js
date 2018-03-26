const userKey = '_mymoney_user'
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKey)),
    validToken: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOKEN_VALIDATED':
            if (action.payload) {
                return { ...state, validToken: true }
            } else {
                //caso token não seja válido (expira em 1 dia), apaga chave
                localStorage.removeItem(userKey)
                return { ...state, validToken: false, user: null}
            }
        //usuário obtido
        case 'USER_FETCHED':
            //serializando objeto json numa string para gravar no localStorage do browser
            localStorage.setItem(userKey, JSON.stringify(action.playload))
            return { ...state, user: action.payload, validToken: true }
        default:
            return state
    }
}