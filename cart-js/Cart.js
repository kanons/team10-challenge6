class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartList: []
        };
    }

    componentDidMount() {
        try {
            var cartList = JSON.parse(localStorage.getItem('cartList'));
        }catch (e) { /* no data in localStorage */ }

        if (cartList) {
            this.getCart();
        }
    }

    // Get list of movies in cart
    getCart() {
        var cartList = JSON.parse(localStorage.getItem('cartList'));
        var holdMovies = [];
        for (var i = 0; i < cartList.length; i++) {
            var movie = cartList[i];
            var url = "https://api.themoviedb.org/3/movie/" + movie.movieId + "?api_key=" + API_KEY + "&language=en-US";
            fetch(url).then((response) => {
                return response.json();
            }).then((movieJSON) => {
                holdMovies.push(movieJSON);
                this.setState({
                    cartList: holdMovies
                })
            });
        }
    }

    // Changes the qty of the movie  and puts it in local storage
    qtyChange(movie, value, formatId) {
        var cartArray = JSON.parse(localStorage.getItem('cartList'));
        
        for(var i=0; i<cartArray.length; i++) {
            if (cartArray[i].movieId === movie.id && cartArray[i].formatId === formatId) {
                cartArray[i].qty = value;
            }
        }
        localStorage.setItem('cartList', JSON.stringify(cartArray));
        this.setState({
            cartList: cartArray
        });
        this.getCart();
    }

    // Get current qty of movie
    getQty(movie, format) {
        var qty = 0;
        var cartArray = JSON.parse(localStorage.getItem('cartList'));
        for(var i=0; i<cartArray.length; i++) {
            if (cartArray[i].movieId === movie.id && cartArray[i].formatId === format) {
                qty = cartArray[i].qty;
            }
        }
        return qty;
    }

    // Get total amount
    getTotal() {
        var total = 0;
        var cartArray = JSON.parse(localStorage.getItem('cartList'));
        for(var i=0; i<cartArray.length; i++) {
            // If DVD, add $14.95
            if (cartArray[i].formatId === 0) {
                total += (cartArray[i].qty*14.95);
            }

            // If Blu-ray, add $19.95
            if (cartArray[i].formatId === 1) {
                total += (cartArray[i].qty*19.95);
            }
        }
        return total;
    }

    // Get total amount
    getSubtotal(movie) {
        var subtotal = 0;
        var cartArray = JSON.parse(localStorage.getItem('cartList'));
        for(var i=0; i<cartArray.length; i++) {
            // If DVD, add $14.95
            if (cartArray[i].formatId === 0 && cartArray[i].movieId === movie.id) {
                subtotal += (cartArray[i].qty*14.95);
            }

            // If Blu-ray, add $19.95
            if (cartArray[i].formatId === 1 && cartArray[i].movieId === movie.id) {
                subtotal += (cartArray[i].qty*19.95);
            }
        }
        return numeral(subtotal).format('$0,0.00');
    }

    // Remove saved movie from local storage
    removeSaved(movie) {
        var cartArray = JSON.parse(localStorage.getItem('cartList'));
        for(var i=0; i<cartArray.length; i++) {
            if (cartArray[i].movieId === movie.id) {
                cartArray.splice(i, 1);
            }
        }
        localStorage.setItem('cartList', JSON.stringify(cartArray));
        var cartL = this.state.cartList;
        this.setState({
            cartList: cartL
        });
    }


    render() {
        return (
            <div className="container">
                <Navigation active="home" />
                <div id="list-container" className="col-md-12 col-sm-12 col-xs-12">
                    <CartList 
                        totalCount={() => this.getTotal()} 
                        qty={(movie, format) => this.getQty(movie, format)} 
                        cartList={this.state.cartList} 
                        movies={this.state.cartList} 
                        onRemove={(movie) => this.removeSaved(movie)} 
                        inputChange={(movie, qty, format) => this.qtyChange(movie, qty, format)}
                        subTotal={(movie) => this.getSubtotal(movie)}
                    />  
                </div>
            </div>
        );
    }
}

var cart = document.getElementById('cart');
ReactDOM.render(<Cart />, cart);
