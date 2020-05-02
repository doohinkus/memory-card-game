import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(send, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function send(msg) {
    model = update(msg, model);
    const updatedView = view(send, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
