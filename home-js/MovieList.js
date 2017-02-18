//component for movie list
class MovieList extends React.Component {
    render() {
        const movies = this.props.movies;
		const imageRoot = "https://image.tmdb.org/t/p/w300/";

        return (
            <div className="card-columns">
                {movies.map((movie) =>
                    <div className="card" key={movie.id}>
                        <img className="card-img-top" src={imageRoot + movie.backdrop_path} alt={"Poster for " + movie.title}/>
                        <div className="card-block">
                            <h2 className="card-title">{movie.title}</h2>
                            <p className="card-text">{movie.overview}</p>
                            <div className="btn-group-vertical">
                                {FORMATS.map((format, index) =>
                                    <button type="button" className="btn btn-secondary" onClick={() => {this.props.onAddToCart(movie.id, index)}} key={index}>
                                        {format.name + ' (' + numeral(format.price).format('$0,0.00') + ')'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
