import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSummary } from './dashboardActions'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

class Dashboard extends Component {

    //chama este método sempre que o componente é exibido na tela
    componentWillMount() {
        //chama dashboard actions getSummary
        //na sequência faz dispactch do reducer, por causa do bind
        //se não houver tempo para que a promise seja atendida, o atributo data 
        //do payload estará nulo ou undefined
        //por isto, precisa do middleware, para aguardar retorno do serviço e
        //depois atualizar estado do componente
        this.props.getSummary()
    }

    render () {
        const { credit, debt } = this.props.summary
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                    <Content>
                        <Row>
                            <ValueBox cols='12 4' color='green' icon='bank'
                                value={`R$ ${credit}`} text='Total de Créditos' />
                            <ValueBox cols='12 4' color='red' icon='credit-card'
                                value={`R$ ${debt}`} text= 'Total de Débitos' />
                            <ValueBox cols='12 4' color='blue' icon='money'
                                value={`R$ ${credit - debt}`} text='Valor Consolidado' />
                        </Row>
                    </Content>
            </div>
        )
    }
}

const mapStateToProps = state => ({summary: state.dashboard.summary})
//bind = faz ligação entre todas as actions com dispatch. Sempre que chamar getSummary
//faz dispatch para todos reducers. Se reducer estiver interessado em evoluir o estado
//baseado nesta ação, renderiza todos os componentes que tiveram estado atualizado
const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)
//Liga dashboar com estado e dispatch
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)