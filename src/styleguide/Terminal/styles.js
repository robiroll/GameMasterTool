import styled from 'styled-components'
import { g } from '../../core'

export const Terminal = styled.div`
  background-color: black;
  background-image: radial-gradient(rgba(0, 150, 0, 0.75), black 120%);
  margin: 0;
  padding: ${g(2)};
  color: white;
  font-family: Inconsolata, monospace;
  text-shadow: 0 0 5px #c8c8c8;
  white-space: pre-line;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
  }
`
