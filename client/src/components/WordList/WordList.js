import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const pagination = paginationFactory({
    sizePerPage: 8,
    paginationSize: 3,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
})

const WordList = ({possible_answers}) => {
    const columns = [{
        dataField: 'id',
        text: '#'
    },{
        dataField: 'word',
        text: 'word'
    }]
    return (
        <div id="wordlist" className="col-md-3">
            POSSIBLE ANSWERS ({possible_answers.length})
            <BootstrapTable keyField='id' data={possible_answers} columns={columns} pagination={pagination}/>
            {possible_answers.length === 0 && "Searching..."}
        </div>
    )
}

export default WordList
