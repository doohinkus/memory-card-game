import * as R from 'ramda';

function update (msg, model) {
  return model;
}
export const ACTIONS = {
  SELECT_CARD: 'SELECT_CARD',
  RESET_SELECTION: 'RESET_SELECTION',
  RANDOMIZE_CARDS: 'RANDOMIZE_CARDS',
  MATCH_CARDS: 'MATCH_CARDS'
}
function randomize(arr){
  return arr.sort(() => Math.random() - 0.5);
}
export function selectCard(id){
  return {
    type: ACTIONS.SELECT_CARD,
    id
  }
}
export function resetCards(){
  return {
    type: ACTIONS.RESET_CARDS
  }
}
export function mixDeck(){
  return {
    type: ACTIONS.RANDOMIZE_CARDS
  }
}
export function matchCards(){
  return {
    type: ACTIONS.MATCH_CARDS
  }
}

export function isSelectable(model){
   const { deck } = model;
   const selectedCards = R.filter(card => card.isSelected === true, deck);
   return selectedCards.length < 2;
}
// export function updateLeftValue(value){
//   return {
//     type: ACTIONS.UPDATE_LEFT_INPUT,
//     payload: value
//   }
// }
// const updateCards = R.curry(
//   (send, card) => {
//     const { id } = card;


//   }
// );
// const flipCard = R.curry((id, card) => id === card.id ? {...card, isSelected: true} : card);
// const resetCards = R.map(card => ({...card, isSelected: false}));


// const resetCards = R.map(card => {
//   return { ...card, isSelected: false }   
// }, model.decks);
// return {
//   ...model,
//   ...model.decks,
//   decks: [
//     [...resetCards],          
//     [...model.decks[1]]
//   ]
// }

export function update(action, model){
  switch(action.type){
    case ACTIONS.SELECT_CARD: {
      const { deck } = model;
      const updatedCards = R.map(card => {
        return card.id === action.id ? { ...card, isSelected: true } : card        
      }, deck);
     
      // if(isSelectable(model)){   
        return {
           ...model,
           ...model.deck,
           deck: [...updatedCards]
        }
      // }
      return {
        ...model
      }
     
    }
    case ACTIONS.MATCH_CARDS:{
      const { deck } = model;
      const matches = R.pipe(
        R.filter(card => card.isSelected),
        R.map(card => card.name)
      );
      console.log(R.identical(...matches(deck)), matches(deck) )
      if(R.identical(...matches(deck)) && matches(deck).length >= 2){
        const updatedCards = R.map(
          card => card.name === matches(deck)[0] ? { ...card, isMatched: true, isSelected: false } : { ...card },
          deck
        );
        console.log(updatedCards)
        return {
          ...model,
          ...model.deck,
          deck: [...updatedCards]
        }
      }
      return {
        ...model
      }
    }
    case ACTIONS.RANDOMIZE_CARDS: {
      const { deck } = model;
      // randomize
      return {
        ...model,
        ...model.deck,
        deck: [...randomize(deck)]
        
      }
    }
    case ACTIONS.RESET_CARDS:{
      const resetCards = R.map(card => {
        return { ...card, isSelected: false }   
      }, model.deck);
      return {
        ...model,
        ...model.deck,
        deck: [...resetCards],          
        
      }
    }

    default: 
      return model
  }
}

export default update;
