import * as R from 'ramda';
// const cards = 'abcdefghijkl';
const cards = 'abcdef';
const deck = R.curry(
   (uid, card)=> {
      return {
         id: card + uid,
         name: card,
         isSelected: false,
         isMatched: false,
         front: card,
      }
    }
);


const make = id => R.pipe(
   R.split(''),
   R.map(deck(id))
);
const initModel = {
  selectedCards: [],
  matchedCards: [],
  deck: [...make('a')(cards), ...make('b')(cards)]
};


// const UNITS = ["Fareheight", "Celcius", "Kelvin"];

export default initModel;
