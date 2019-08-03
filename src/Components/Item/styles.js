import styled, { css } from 'styled-components'
import { g, colors, rgba } from '../../core'

export const Item = styled.div`
  border: 1px solid ${rgba(colors.primary1, 0.6)};
  padding: ${g(2)};
  cursor: pointer;
  transition: all 300ms ease-in-out;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-color: ${colors.primary1};
      box-shadow: 0 0 10px 2px ${rgba(colors.primary1, 0.4)};
    `}
`

export const Header = styled.div`
  display: flex;
  align-items: center;
`

export const Name = styled.h4`
  margin-left: ${g(2)};
`
