import styled, { css } from 'styled-components'
import { colors, g, rgba } from '../../core'

export const Content = styled.div`
  padding: ${g(3)};
`

export const Title = styled.h3`
  margin-top: ${g(3)};
`

export const Characters = styled.div``

export const Icon = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  cursor: pointer;
  padding: ${g(1)};

  &:hover {
    opacity: 0.75;
  }
`
export const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${g(20)}, auto));
  grid-gap: ${g(2)};
`
export const Item = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid ${rgba(colors.primary1, 0.5)};
  border-radius: 2px;

  ${({ isFavourite }) =>
    isFavourite &&
    css`
      ${Icon} {
        opacity: 1;
      }
    `}
`
export const LinkContainer = styled.div`
  &:hover {
    ${Item} {
      border-color: ${colors.primary1};
    }
  }
`
export const Link = styled.span`
  flex-grow: 1;
  padding: ${g(1)};
  border-right: 1px solid ${rgba(colors.primary1, 0.5)};
  white-space: nowrap;
`
