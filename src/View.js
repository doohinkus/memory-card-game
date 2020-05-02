import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { send, resetCards, mixDeck, isSelectable, selectCard, matchCards } from './Update'
// import send   from './Update';

const {
  div,
  h1,
  i,
  h3,
  pre,
  input,
  select,
  option,
  button
} = hh(h);

function handleClick(model, send, id){
  if(isSelectable(model)){
   send(selectCard(id));
   send(matchCards())
  } else {
   send(resetCards())
  }

}




const displayCards = R.curry((model, send, card) => {
  const { id, isSelected, name, isMatched } = card;
  // const action = isSelectable(model) ? selectCard(id) : resetSelection()
  if(isSelected || isMatched){
    return div({
               className: 'e pa1 ma1 db ba w-25 tc bw4 br3 b--red', 
             },
             name
           );
  }
  return div({
                className:'pa1 ma1 db ba w-25 tc bw4 br3 b--dark-gray e dark-gray bg-dark-gray pointer',
                onclick: e => handleClick(model, send, id), 
                attributes: {data: isSelected}
             }, 
             name
            )
});

function mixCards(send){
  return div({className: 'flex justify-center'}, button({
    className: 'pa2 bg-green near-white bn',
    onclick: () => send(mixDeck())
  },
  'Mix Cards'
  ))
}

function view(send, model) {
  const { deck } = model
  return div({ className: 'mw6 center' }, [
    mixCards(send),
    div({className: 'flex flex-wrap w-100 justify-center'},
      [
        R.map(displayCards(model,send), deck),
      ]
    ),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
