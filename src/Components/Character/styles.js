import styled from 'styled-components'
import { g, colors } from '../../core'

export const Title = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

export const ModalTitle = styled.h4`
  margin: ${g(2)} 0;
`

export const Delete = styled.div`
  color: ${colors.neutral3};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
