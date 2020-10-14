import React from 'react'
import { connect } from 'react-redux'
import Navegacion from "../components/navegacion"

class Principal extends React.Component {

    componentWillUnmount (){
        this.props.setLocalStore()
    }

    render (){
        return(
            <React.Fragment>
                <Navegacion/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataTerminated: state.dataTerminated,
        dataInitial: state.dataInitial
    }
}

export default connect (mapStateToProps,null)(Principal);