import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'

const pagination = paginationFactory({
    sizePerPage: 8,
    paginationSize: 3,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true
})

const RankingPanel = ({top_answers}) => {
    const columns = [{
        dataField: 'word',
        text: 'Word',
        sort: true
    },{
        dataField: 'entropy',
        text: 'Entropy',
        sort: true
    },{
        dataField: 'probability',
        text: 'Probability',
        sort: true
    }]

    const defaultSorted = [{
        dataField: 'entropy',
        order: 'desc'
    }]

    return (
        <div className="col-md-3">
            RANKING
            <BootstrapTable keyField='word' data={top_answers} columns={columns} pagination={pagination} defaultSorted={defaultSorted}/>
            {top_answers.length === 0 && "Calculating..."}
        </div>
    )
}

export default RankingPanel
