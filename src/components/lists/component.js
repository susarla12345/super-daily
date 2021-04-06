import React from 'react';
import Card from '../cards/component';
import AddCard from '../add-card/component';
import AddList from '../add-list/component';
import { ReactComponent as Remove } from '../../images/delete.svg';
import { ReactComponent as Add } from '../../images/add.svg';


const INITIAL_LISTS = [
  {
    name: 'Teams',
    cards: [{
      name: 'Product',
      description: '3 pending tasks to be performed by Raj'
    },
    {
      name: 'Sales',
      description: 'Send proposal to puneet for sales prices'
    }]
  },

  {
    name: 'Products',
    cards: [{
      name: 'VAT testing',
      description: 'Ask engineering team to setup infra'
    },
    ]
  }
];

class Lists extends React.Component {
  constructor() {
    super();
    this.state = {
      lists : window.localStorage.getItem("lists") !== null ? JSON.parse(window.localStorage.getItem("lists")) : INITIAL_LISTS,
      selectedCardList: null,
      selectedCard: null,
      showAddCard: false,
      addCardList: null,
      showNewListModal: false
    }
  }

  handleCardDrag(event, card) {
    console.log("clientX", event.clientX);
    this.setState({
      ...this.state,
      selectedCardList: event.target.closest('.list-wrapper').getAttribute("data-list-id"),
      selectedCard: {
        ...card
      }
    })
  }

  handleCardDragOver(event) {
    event.preventDefault();
  }
  
  handleCardDrop(event) {
    let lists = [...this.state.lists];
    let list = event.target.closest('.list-wrapper').getAttribute("data-list-id");
    let listDropped = lists.find((item) => list === item.name)
    let listDragged = lists.find((item) => this.state.selectedCardList === item.name)

    if(listDropped && listDropped !== this.state.selectedCardList) {
      let selectedCardIndex = listDragged.cards.findIndex((item) => this.state.selectedCard.name === item.name)
      listDragged.cards.splice(selectedCardIndex, 1)
      listDropped.cards.unshift({
        name: this.state.selectedCard.name,
        description: this.state.selectedCard.description
      })

      this.setState({
        ...this.state,
        lists
      }, () => {
        window.localStorage.setItem('lists', JSON.stringify(this.state.lists))
      })
    } else {
      event.preventDefault();
    }
  }

  addCard(listName) {
    this.setState({
      ...this.state,
      showAddCard: true,
      addCardList: listName
    })
  }

  submitCard(state) {
    let lists = [...this.state.lists];
    let list = lists.find((item) => this.state.addCardList === item.name)
    
    list.cards.push({
      name: state.title,
      description: state.description
    })

    this.setState({
      ...this.state,
      showAddCard: false,
      lists
    }, () => {
      window.localStorage.setItem('lists', JSON.stringify(this.state.lists))
    })
  }

  addList() {
    this.setState({
      ...this.state,
      showNewListModal: true,
    })
  }

  submitList(state) {
    let lists = [...this.state.lists]
    lists.push({
      name: state.title,
      cards: []
    });

    this.setState({
      ...this.state,
      showNewListModal: false,
      lists
    }, () => {
      window.localStorage.setItem('lists', JSON.stringify(this.state.lists))
    });
  }

  handleRemoveCard(card, list) {
    let lists = [...this.state.lists];
    let selectedList = lists.find((item) => list.name === item.name)

    let cardIndex = selectedList.cards.findIndex((item) => card.name === item.name)

    selectedList.cards.splice(cardIndex, 1);

    this.setState({
      ...this.state,
      lists
    }, () => {
      window.localStorage.setItem('lists', JSON.stringify(this.state.lists))
    });
  }

  handleRemoveList(listName) {
    let lists = [...this.state.lists];

    let listIndex = lists.findIndex((item) => listName === item.name)
    lists.splice(listIndex, 1);

    this.setState({
      ...this.state,
      lists
    }, () => {
      window.localStorage.setItem('lists', JSON.stringify(this.state.lists))
    });
  }

  render() {
    return(
      <div className="lists-wrapper">
        <button className="add-list" onClick={() => this.addList()}>
          <Add/>
        </button>

        {this.state.showNewListModal ? <div className="add-card-modal-wrapper">
          <div className="modal-wrapper">
            <AddList submitList={(state) => this.submitList(state)}/>
          </div>
        </div> : null}

        {this.state.showAddCard ? <div className="add-card-modal-wrapper">
          <div className="modal-wrapper">
            <AddCard submitCard={(state) => this.submitCard(state)}/>
          </div>
        </div> : null}

        <div class="list-content">
          {
            this.state.lists ? this.state.lists.map((list) => {
              return (<div className="list-wrapper" data-list-id={list.name} key={list.name} onDrop= {(event) => this.handleCardDrop(event)} onDragOver={(event) => this.handleCardDragOver(event)}>
                <div className="list-header">
                  {list.name}
                  <Remove onClick={() => this.handleRemoveList(list.name)}/>
                </div>
                <div className="cards-wrapper">
                  <button className="add-card" onClick={() => this.addCard(list.name)}>
                    Add Card
                  </button>
                  {
                    list.cards.length ? list.cards.map((card) => {
                      return (
                        <Card list={list.name}
                          name={card.name}
                          description={card.description}
                          drag={(event, card) => this.handleCardDrag(event, card)}
                          removeCard={() => this.handleRemoveCard(card, list)}
                        />
                      )
                    }) : <div className="no-cards">No Cards in this list</div>
                  }
                </div>
              </div>)
            }) : <div className="no-lists">No lists in this view</div>
          }
        </div>
      </div>
    )
  }
}

export default Lists;