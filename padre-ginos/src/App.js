const Pizza = () => {
  return React.createElement(
    'div',
    {},
    React.createElement('h3', {}, 'Pizza title'),
    React.createElement('p', {}, 'Pizza desc')
  );
};

const App = () => {
  return React.createElement(
    'div',
    {},
    React.createElement('h1', {}, 'Main Header'),
    React.createElement(Pizza)
  );
};

const AppContainer = document.getElementById('root');
const AppRoot = ReactDOM.createRoot(AppContainer);
AppRoot.render(React.createElement(App));
