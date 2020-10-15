import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

function TableGeneric (props) {

    return (
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <BootstrapTable
                bootstrap4
                keyField="index"
                data={ props.data }
                columns={ props.columns }
                defaultSorted={props.defaultSorted?[{dataField: 'index',order: 'asc'}]:[]}
                striped bordered hover
            />
        </div>
    )
}

export default TableGeneric