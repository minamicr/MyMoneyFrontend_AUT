import React, {Component} from 'react'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './billingCycleActions'

class BillingCycleList extends Component {
    componentWillMount() {
        this.props.getList()
        
    }

    renderRows() {
        //Abaixo se a lista estiver vazia (this.props.list) devolve lista vazia ([])
        const list = this.props.list || []
        //map irá percorrer toda a lista de pagamentos, cada elemento e retorna um novo
        //array com cada linha da tabela (arrow function)
        return list.map(bc => (
            <tr key={bc._id}>
                <td>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

//recebe um estado e retorna um objeto
//este objeto vem a partir dos reducers.js que aponta para billingCycleReducer.js
const mapStateToProps = state => ({list: state.billingCycle.list})
//dispatch é o responsável por disparar as ações para os reducers
//abaixo vincula o método ao dispatch
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)
//da forma acima em BillingCycle existe um atributo chamado list e um método getList
