import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';




// Represent a single card
const Card = (props) => {
    return (
        <div style={{ margin: '1em' }}>
            <img src={props.avatar_url} alt="" width="75" />
            <div style={{ display: 'inline:block', marginLeft: 10 }}>
                <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

// Represent a list of cards
const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    );
}

// Represents a form on a page
class Form extends React.Component {
    state = { userName: '' };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Form Submit', this.state.userName);

        // ajax... fetch or axios
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                //console.log(resp);        
                this.props.onSubmit(resp.data);
                this.setState({ userName: '' });
            })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value={this.state.userName}
                    onChange={(event) => this.setState({ userName: event.target.value })}
                    placeholder="Github username" />
                <button type="submit">Add card</button>
            </form>
        );
    }
}


//This is the main entry point to the Application
class App extends Component {
    state = {
        cards: [
            {
                name: "Vicky Chen",
                avatar_url: "https://avatars.githubusercontent.com/u/8443?v=3",
                company: "Manulife"
            }
        ]
    };

    addNewCard = (cardInfo) => {
        console.log(cardInfo);
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }))
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard}></Form>
                <CardList cards={this.state.cards}></CardList>
            </div>
        );
    }
}



export default App;


