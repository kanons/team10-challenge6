//compoent for genre
class MovieGenres extends React.Component {
    render() {
        return (
	        <div className="list-group col-sm-4 col-md-3 col-xs-12">
                {this.props.genres.map((genre) =>
    	 	   		<button onClick={(e) => {e.preventDefault(); this.props.onClickGenre(genre.id)}} key={genre.id} className={'list-group-item list-group-item-action' + (this.props.currentGenreId == genre.id ? (' active') : '')}>
        	 	   		{genre.name}
    	 	   		</button>
                )}
			</div>
        )
    }
}
