import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import * as util from './util/filter'

let component;
let searchSpy;

jest.useFakeTimers();

describe('App', () => {
  beforeEach(() => {
    searchSpy = jest.spyOn(util, 'search');
    component = mount(<App filter='test' />);
  })
  afterEach(() => {
    component.unmount();
    jest.clearAllMocks();
  })

it('should invoke search function', () => {
    jest.advanceTimersByTime(6000);
    expect(searchSpy).toHaveBeenCalledTimes(0);
  });
});

describe('Should only search if the searchParameter is different', ()=> {
    beforeEach(() => {
      searchSpy = jest.spyOn(util, 'search');
    })
    afterEach(() => {
      jest.clearAllMocks();
    })
  it("should call when the search criteria change", ()=>{
      component = mount(<App filter='test' />);
      jest.advanceTimersByTime(6000);
      expect(searchSpy).toHaveBeenCalledTimes(0);
      component.setProps({ filter: 'first change'})
      jest.advanceTimersByTime(6000);
      expect(searchSpy).toHaveBeenCalledTimes(1);
      component.setProps({ filter: 'second change'})
      jest.advanceTimersByTime(6000);
      expect(searchSpy).toHaveBeenCalledTimes(2);
      jest.advanceTimersByTime(30000);
      expect(searchSpy).toHaveBeenCalledTimes(2);
      component.setProps({ filter: 'third change'})
      jest.advanceTimersByTime(4000);
      expect(searchSpy).toHaveBeenCalledTimes(3);
  })
})