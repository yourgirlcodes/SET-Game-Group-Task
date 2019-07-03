//REACT
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app">
                <div className="header">
                    <div className="information">
                        <div><b>Available Sets: </b><span>00</span></div>
                        <div><b>Matches: </b><span>00</span></div>
                    </div>
                    <div className="buttons">
                        <button>Reset</button>
                    </div>
                </div>
                <Board />
                <Footer />
            </div>
        )
    }
}
class Footer extends React.Component {
    render() {
        return (
            <div className="footer">/ Team 3 /</div>
        )
    }
}
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.validateChange = this.validateChange.bind(this);
        this.state = {
            selectedCards: []
        }
    }

    validateChange(cardSelected) {
        if (this.state.selectedCards.length < 2) {
            var card1 = cardSelected.split("\ ")
            var cardArray = this.state.selectedCards
            cardArray.push(card1);
            console.log(cardArray);
            this.setState({
                selectedCards: cardArray
            })
        }
        else if (this.state.selectedCards.length == 2) {
            var card1 = cardSelected.split("\ ")
            var cardArray = this.state.selectedCards
            cardArray.push(card1);
            if (window.set.compareCards(cardArray)) {
                console.log('match');
                alert("match found");
            }
            else {
                console.log('not a match');
                alert("not a match");
                this.setState({
                    clearSelected: true
                })
            }
            var empty = [];
            this.setState({
                selectedCards: empty
            })

        }


    }

    render() {
        var array = window.set.chosenCards;
        var cards = [];
        for (let i = 0; i < array.length; i++) {
            cards.push(<Card handleChange={this.validateChange} cardColor={array[i][0]} cardTexture={array[i][1]} cardShape={array[i][2]} cardNumber={array[i][3]}></Card>)
        }
        return (
            <div className="cardsWrapper">
                <div className="grid">
                    {cards}
                </div>
            </div>
        )
    }
}
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        }
        this.selectCard = this.selectCard.bind(this)
    }

    selectCard(event) {
        this.setState({
            isClicked: true
        })
        this.props.handleChange(event.target.getAttribute('data-cardinfo'))
    }

    render() {
        var clicked = this.state.isClicked ? "selected" : " "

        var numShapes = [];
        for (let i = 0; i < this.props.cardNumber; i++) {
            numShapes.push(<div className={this.props.cardColor + " " + this.props.cardTexture + " " + this.props.cardShape} key={numShapes[i]} data-cardInfo={this.props.cardColor + " " + this.props.cardTexture + " " + this.props.cardShape + " " + this.props.cardNumber}></div>);
        }
        return (

            <div className={"card " + clicked} onClick={this.selectCard} data-cardInfo={this.props.cardColor + " " + this.props.cardTexture + " " + this.props.cardShape + " " + this.props.cardNumber}>
                {numShapes}
            </div>
        )
    }
}

function render() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    )
}

render();
