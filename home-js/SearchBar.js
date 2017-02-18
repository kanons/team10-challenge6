class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="search-info" onSubmit={(e) => {e.preventDefault(); this.props.onSubmit(this.refs.query.value)}}>
                <div className="input-group">
                    <input type="text" className="form-control" ref="query" placeholder="Movie name"/>
                    <div className="input-group-btn">
                        <button className="btn btn-primary" type="submit">Search</button>
                    </div>
                </div>
            </form>
        );
    }
}
