import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

import App from './../index';
import { googleFontResponse } from './../../../TestData/MockGoogleFontResponse';

describe('App', ()=>{
  xit('renders correctly', () => {
    fetchMock.get('*', googleFontResponse);
    let tree = renderer.create(
      <App />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
})
