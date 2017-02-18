class PageNavigation extends React.Component {
    render() {
        return (
            <div>
                <p className="page-number">{'Page ' + this.props.page + ' of ' + this.props.totalPages}</p>
                <div className="page-navigation btn-group" role="group" aria-label="Page navigation">
                    <button className={"btn btn-secondary" + (this.props.enablePrevious ? '' : ' disabled')} onClick={this.props.onClickPrevious}>&laquo; Previous</button>
                    <button className={"btn btn-secondary" + (this.props.enableNext ? '' : ' disabled')} onClick={this.props.onClickNext}>&raquo; Next</button>
                </div>
            </div>
        )
    }
}
