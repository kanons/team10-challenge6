class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
        	genres: [],
            movies: [],
            page: 1,
            currentGenreId : -1,
            searchKeyword: '',
            cartList: [],
            totalPages: 0
        };

        // bind handlers (which are passed as props to other components) to self
        this.handleSearch = this.handleSearch.bind(this);
        this.clickGenre = this.clickGenre.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.pagePrev = this.pagePrev.bind(this);
        this.pageNext = this.pageNext.bind(this);
    }

    componentDidMount() {
        // load values saved in localStorage to state
        try {
            var cartList = JSON.parse(localStorage.getItem('cartList'));
        }
        catch (e) { /* no data in localStorage, JSON parsing failed */ }

        if (cartList) {
            this.setState({
                cartList: cartList
            });
        }

        // initial load data
        this.getGenres();
        this.getList();
    }

    componentDidUpdate(previousProps, previousState) {
        // get new movies from server when the search parameters change
        if (this.state.currentGenreId !== previousState.currentGenreId ||
            this.state.searchKeyword !== previousState.searchKeyword ||
            this.state.page !== previousState.page) {
            this.getList();
        }
    }

    // fetch genre from themoviedb database
    getGenres(){
    	var url  = "https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY+"&language=en-US";
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            // add Popular genre
            json.genres.unshift({
                id: -1,
                name: 'Popular'
            });

            this.setState({
                genres: json.genres
            });
        });
    }

    // fetch the list of movies from themoviedb database
    getList(){
        let url = '';

        // if there is a search saved, query with the saved keywoard
    	if (this.state.searchKeyword) {
            url = "https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+"&language=en-US" +
                "&query=" + encodeURIComponent(this.state.searchKeyword) + "&page=" + this.state.page;
        }

        else {
            url = "https://api.themoviedb.org/3/discover/movie?api_key="+API_KEY+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page="+this.state.page;
            if (this.state.currentGenreId !== -1) { // Popular genre
                url += "&with_genres=" + this.state.currentGenreId;
            }
        }

        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            this.setState({
                movies: json.results,
                totalPages: json.total_pages
            });
        });
    }

    // navigate to the previous page
    pagePrev(e){
    	e.preventDefault();
        this.setState((state) => {
            state.page = Math.max(state.page - 1, 1);
            return state;
        });
    }

    // navigate to the next page
    pageNext(e){
    	e.preventDefault();
        this.setState((state) => {
            state.page = Math.min(state.page + 1, state.totalPages);
            return state;
        });
    }

    // search the movie
    handleSearch(query) {
        // reset genre and page number when the user searches
        this.setState({
            currentGenreId: -1,
            page: 1,
            searchKeyword: query
        });
    }

    // add to cart
    addToCart(movieId, formatId) {
        var cartList = this.state.cartList;
        var qty = 1;
        cartList.push({movieId, formatId, qty});
        this.setState({
            cartList: cartList
        });
        // save to local storage
        var cartListJson = JSON.stringify(cartList);
        localStorage.setItem('cartList', cartListJson);
    }

	//navigate to genre
    clickGenre(genreId) {
        this.setState({
            page: 1,
            searchKeyword: '',
            currentGenreId: genreId
        });
    }

    render() {
        return (
            <div className="container">
                <Navigation active="home" />
                <SearchBar onSubmit={this.handleSearch}/>
                <MovieGenres onClickGenre={this.clickGenre} genres={this.state.genres} currentGenreId={this.state.currentGenreId}/>
                <div className="col-md-9 col-sm-8 col-xs-12">
                    <PageNavigation onClickPrevious={this.pagePrev} onClickNext={this.pageNext} enablePrevious={this.state.page > 1} enableNext={this.state.page < this.state.totalPages} page={this.state.page} totalPages={this.state.totalPages}/>
                    <MovieList movies={this.state.movies} onAddToCart={this.addToCart}/>
                </div>
            </div>
        );
    }
}

var app = document.getElementById("app");
ReactDOM.render(<App/>, app);
