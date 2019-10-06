import styled from 'styled-components'
import { g, colors, rgba } from '../../core'

export const SpecificityContent = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border: 1px solid ${colors.primary1};
  margin: ${g(1)};
`
export const SpecificityItem = styled.div`
  margin-bottom: ${g(2)};
  opacity: 0.8;
`
export const SpecificityHeading = styled.div`
  margin-right: ${g(2)};
`
export const DeleteSpecificity = styled.div`
  cursor: pointer;
  padding: ${g(0.5)};
  color: ${colors.accent1};
  opacity: 0;
`
export const EditSpecificity = styled.div`
  cursor: pointer;
  padding: ${g(0.5)};
  color: ${colors.primary1};
  margin-right: ${g(2)};
  opacity: 0;
`
export const SpecificityContentName = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: ${g(2.2)};

  &:hover {
    ${DeleteSpecificity}, ${EditSpecificity} {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
`
export const Specificities = styled.div`
  display: grid;
  grid-gap: ${g(1)};
  position: relative;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  margin-top: ${g(1)};
`
export const Specificity = styled.div`
  padding: ${g(1)};
  border: 1px solid ${rgba(colors.primary1, 0.5)};
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    border-color: ${colors.white};

    ${SpecificityContent} {
      display: block;
    }
  }
`
export const SpecificityName = styled.div``

export const SpecificityRestrictions = styled.div`
  font-style: italic;
`
export const SpecificityPoints = styled.div``
export const SpecificityEffects = styled.div`
  color: ${colors.primary1};
`
export const SpecificityDescription = styled.div`
  white-space: pre-line;
`
export const SpecificityButton = styled.div``

export const SpecFields = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: ${g(0.5)};
  margin: ${g(2)} 0;
`
export const SpecLabel = styled.label``
export const SpecInput = styled.input``
export const SpecTextArea = styled.textarea`
  width: 100%;
`
export const SpecTitle = styled.h4`
  margin-top: ${g(2)};
  cursor: pointer;
`
export const AddButton = styled.div`
  margin-top: ${g(2)};
`
