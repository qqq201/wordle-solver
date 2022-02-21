import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const pagination = paginationFactory({
    sizePerPage: 8,
    paginationSize: 3,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
})

const WordList = ({possible_words}) => {
    const columns = [{
        dataField: 'id',
        text: '#'
    },{
        dataField: 'word',
        text: 'word'
    }]
    return (
        <div id="wordlist" className="col-md-3">
            POSSIBLE ANSWERS ({possible_words.length})
            <BootstrapTable keyField='id' data={possible_words} columns={columns} pagination={pagination}/>
        </div>
    )
}

export default WordList
