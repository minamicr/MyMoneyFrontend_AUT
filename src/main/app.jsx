import '../common/template/custom.css'
import React from 'react'
import Header from '../common/template/header'
import SideBar from '../common/template/sideBar'
import Footer from '../common/template/footer'
import Messages from '../common/msg/messages'

export default props => (
    //sempre que for referenciar css utilizar className, pois a palavra 
    //class no react é reservada para classes; desta forma não temos conflito no react
    //Messages componente para mensagens de erro, tanto faz onde incluir, as mensagens
    //serão exibidas no topo da tela
    <div className='wrapper'>
        <Header />
        <SideBar/>
        <div className='content-wrapper'>
            {props.children}
        </div>
        <Footer />
        <Messages />
    </div>
)


