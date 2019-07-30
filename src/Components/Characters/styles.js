import styled from 'styled-components'
import { g } from '../../core'

export const Content = styled.div`
  padding: ${g(3)};
`

export const Title = styled.h3`
  margin-top: ${g(3)};
`

export const Characters = styled.div``

export const Link = styled.span`
  margin-right: ${g(2)};

  :hover {
    text-decoration: underline;
  }
`
