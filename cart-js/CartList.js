class CartList extends React.Component {
    render() {
        const movies = this.props.movies;
		const imageRoot = "https://image.tmdb.org/t/p/w300/";
        
        // If there are no movies in cart, let user know
        if (this.props.cartList.length === 0 || (this.props.cartList.length === 1 && JSON.parse(localStorage.cartList).length===0)) {
            return(
                <ul className="list-group">
                    <li className="list-group-item">
                        <h3>No movies are in your cart</h3>
                    </li>
                </ul>
            )
        }

        return (
            <ul className="list-group">
                {movies.map((movie, index) =>
                    <li className="list-group-item" key={index} id={movie.id} >

                        <div id="list-image" className="cart-movie list-image">
                            <img className="cart-movie-img" src={imageRoot + movie.backdrop_path} alt={"Poster for " + movie.title}/>
                        </div>

                        <div id="list-contents" className="cart-movie">
                            <h3 className="cart-title">{movie.title}</h3>
                            <p className="cart-overview">{movie.overview}</p>
                            <div className="cart-prices">
                                {FORMATS.map((format, index) =>
                                    <p key={index}>
                                        {format.name + ' (' + numeral(format.price).format('$0,0.00') + ') x '}
                                        <span className="price-functions">
                                            <input 
                                                id={format.name} 
                                                type="number" 
                                                className="cart-quantity" 
                                                min="0" 
                                                defaultValue={this.props.qty(movie, index)}  
                                                value={this.props.value}
                                                onChange={(e) => this.changing(e, movie, format.name, index)}>
                                            </input>
                                        </span>
                                    </p>
                                )}
                                <p>Subtotal: {this.props.subTotal(movie)}</p>
                                <button id="remove-movie" type="button" className="btn btn-danger pull-right" onClick={(e) => this.removing(e, movie)}>Remove</button>
                            </div>
                        </div>
                        <div className="clear-float"></div>
                    </li>
                )}
                <div id="total-item" className="list-group-item">
                    <p id="total-amt" className="total-price">Total: {this.totaling()}</p>
                </div>
            </ul>
        )
    } 

    // On remove, remove from local storage and html
    removing(e, movie) {
        e.preventDefault();

        this.props.onRemove(movie);

        // Get new total amount
        var totalAmt = this.totaling();

        // Update html of total amount
        var totalUpdate = document.getElementById('total-amt');
        totalUpdate.innerText  = "Total:"+totalAmt;

        // Update html of list
        var removeMovie = document.getElementById(movie.id);
        removeMovie.parentNode.removeChild(removeMovie);
    }

    // When qty changes, change it in local storage
    changing(e, movie, formatName, formatId) {
        e.preventDefault();
        var qty = document.getElementById(formatName).value;
        this.props.inputChange(movie, qty, formatId);
    }

    // Get total price
    totaling() {
         var total = this.props.totalCount();
         return numeral(total).format('$0,0.00');
    } 
}
