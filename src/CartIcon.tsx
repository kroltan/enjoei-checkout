import * as React from "react";
import {SFC, SVGAttributes} from "react";


const path = `
  M21 14.6l3-10a.5.5 0 0 0-.5-.6H4.6l-.3-1.5a2 2 0 0 0-2-1.5H.5a.5.5 0 0 0 0 
  1h1.8a1 1 0 0 1 1 .8l3.4 13.7a2 2 0 0 0 2 1.5h11.8a.5.5 0 0 0 0-1H8.7a1 1 0 0 1-1-.8L7.4 
  15h13.1a.5.5 0 0 0 .5-.4zM7.2 14L4.9 5h18L20 14zM9 19a2 2 0 1 0 2 2 2 2 0 0 0-2-2m0 3a1 
  1 0 1 1 1-1 1 1 0 0 1-1 1M19 19a2 2 0 1 0 2 2 2 2 0 0 0-2-2m0 3a1 1 0 1 1 1-1 1 1 0 0 1-1 1
`;


export const CartIcon: SFC<SVGAttributes<SVGElement>> = props => (
  <svg viewBox="0 0 24 24" height="32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="currentColor" d={path}/>
  </svg>
);