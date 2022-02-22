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
        dataField: 'id',
        text: 'Rank'
    },{
        dataField: 'word',
        text: 'Word'
    },{
        dataField: 'entropy',
        text: 'Entropy'
    }]

    return (
        <div className="col-md-3">
            RANKING
            <BootstrapTable keyField='id' data={top_answers} columns={columns} pagination={pagination}/>
            {top_answers.length === 0 && "Calculating..."}
        </div>
    )
}

export default RankingPanel
