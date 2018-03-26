import React from 'react'

export default props => (
    <input {...props.input}
        //className do Admin LTE
        className='form-control'
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        type={props.type} />

)