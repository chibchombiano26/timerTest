import React, { useEffect, useRef } from 'react';
import { search } from './util/filter'

export default function App(props) {
  const lastFilter = useRef(props.filter)
  const interval = useRef();
  useEffect(() => {
    interval.current && clearInterval(interval.current);
    interval.current = setInterval(() => {
      if(props.filter != lastFilter.current){
        lastFilter.current = props.filter;
        search(props.filter);
      }
    }, 3000)
  });
  return <div />;
}