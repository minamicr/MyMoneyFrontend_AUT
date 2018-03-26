import React from 'react'
import ReduxToastr from 'react-redux-toastr'
//no webpack a pasta node_modules recebeu o apelido de modules
import 'modules/react-redux-toastr/lib/css/react-redux-toastr.css'


export default props => (
    <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates={true}
        position='top-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar />

)