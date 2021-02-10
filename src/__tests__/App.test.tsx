import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { mount } from 'enzyme';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Addition', () => {
  it('knows that 2 and 6 make 8', () => {
    expect(2 + 6).toBe(8);
  });
});

test('App component renders', () => {
});
