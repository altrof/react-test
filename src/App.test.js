import { render, screen } from '@testing-library/react';
import MainApp from './App';
import ReactDOM from 'react-dom';

/* test('renders learn react link', () => {
  render(<MainApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MainApp />, div);
  ReactDOM.unmountComponentAtNode(div)
});
