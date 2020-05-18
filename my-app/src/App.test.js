import React from 'react';
import App from './App';
// import { render } from '@testing-library/react';


// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new EnzymeAdapter()})

test('App renders without crashing', () => {
     //leave blank for now.
});

test('renders App Component without error' , () => {
  const wrapper =  shallow(<App />);
  const appComponent = wrapper.find({"data-test": "CacheBusterApp" });
  expect(appComponent.length).toBe(1); 
});