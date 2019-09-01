import styled from 'styled-components'
import { g } from '../../core'

export const IconSelection = styled.div`
  position: relative;
`
export const Icon = styled.div`
  position: absolute;
  top: ${g(1)};
  right: calc(100% + ${g(1)});
  opacity: 0.5;
`
export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: ${g(2)};
`

export const Filters = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
`

export const Inputs = styled.div`
  display: flex;
  margin-left: ${g(2)};
`

export const Input = styled.input``

export const SelectedList = styled.div`
  display: flex;
  margin: ${g(1)} 0;
`
export const SelectedItem = styled.div`
  margin-right: ${g(1)};
`

export const SelectedButtonContent = styled.div`
  padding: 0 ${g(0.5)};
`

export const Assign = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: ${g(1)};
  align-items: center;
  width: ${g(30)};
`
