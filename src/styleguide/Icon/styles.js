import styled, { css } from 'styled-components'
import { g, variants } from '../../core'

const SIZE_MATCH = {
  xs: 1,
  s: 2,
  m: 3,
  l: 4,
  xl: 5,
  full: '100%'
}
export const Icon = styled.span`
  color: ${({ variant }) => variants[variant]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 150ms linear;
  ${({ size }) => {
    const dimension = g(SIZE_MATCH[size])
    return css`
      font-size: ${dimension};
      width: ${dimension};
      height: ${dimension};
    `
  }}
`
