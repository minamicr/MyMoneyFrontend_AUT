import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//reduxForm é um decorator que fará a ligação do componente ao estado gerenciado pelo redux-form
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './billingCycleActions'
import LabelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {
    calculateSummary(){
        const sum = (t, v) => t + v
        return {
            //map transforma array de objetos em array de valores numéricos
            //o + transforma valor em número, || 0 se não conseguir transformar em número atribui 0 zero
            //reduce transforma array em um único valor, agregando em uma soma
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum)
        }
    }

    render() {
        //handleSubmit e Field existem porque lá embaixo foi
        //decorado com redux form
        const { readOnly, handleSubmit, credits, debts } = this.props
        const { sumOfCredits, sumOfDebts } = this.calculateSummary()
        
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='month' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Mês' cols='12 4' placeholder='Informe o mês' />
                    <Field name='year' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Ano' cols='12 4' placeholder='Informe o ano' />
                    <Summary credit={sumOfCredits} debt={sumOfDebts} />
                    <ItemList cols='12 6' list={credits} readOnly={readOnly} 
                        field='credits' legend='Créditos'/>
                    <ItemList cols='12 6' list={debts} readOnly={readOnly} 
                        field='debts' legend='Débitos' showStatus={true} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

//Faz decorate
BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
//informa o ID do formulário
const selector = formValueSelector('billingCycleForm')
//recebe estado do parâmetro e nome do atributo que eu quero extrair (credits), retornando array
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
//flag destroy necessária porque está utilizando o mesmo formulário para inclusão de alteração
//export default reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
//Decorou mais uma vez com connect
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)