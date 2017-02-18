class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    // Total items in cart
    totalItems() {
        var movieQty;
        var items = 0;
        var cartArray = JSON.parse(localStorage.getItem('cartList'));
        
        // If no item or empty array, show 0
        if(items.toString() === '00' || cartArray === null || cartArray.length === 0){
            return '0';
        }else {
            for(var i=0; i<cartArray.length; i++) {
                items = parseFloat(items);
                movieQty = parseFloat(cartArray[i].qty);
                items = items + movieQty;
            }
            return items.toString();
        }
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-inverse">
                <a className="navbar-brand" href="index.html">Mega Movies</a>
                <ul className="nav navbar-nav">
                    <li className="nav-item active">
                        <a className={'nav-link' + (this.props.current === 'home' ? ' current' : '')} href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className={'nav-link' + (this.props.current === 'cart' ? ' current' : '')} href="cart.html">Cart ({this.totalItems()})</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
