import styled from 'styled-components'
import { g, colors, rgba } from '../../core'

export const Note = styled.div`
  margin-bottom: ${g(2)};
`
export const Title = styled.div`
  width: ${g(30)};
  margin-bottom: ${g(1)};
`
export const Input = styled.input`
  width: 100%;
`

export const Content = styled.div`
  width: 100%;
`
export const Textarea = styled.textarea`
  width: 100%;
`
export const Button = styled.div``

export const DeleteNote = styled.div`
  cursor: pointer;
  padding: ${g(0.5)};
  color: ${colors.accent1};
  opacity: 0;
`
export const NoteItem = styled.div`
  margin-top: ${g(2)};
  padding-bottom: ${g(1)};
  border-bottom: 1px solid ${rgba(colors.neutral2, 0.5)};

  &:last-child {
    border: 0;
  }
`

export const EditNote = styled.div`
  cursor: pointer;
  padding: ${g(0.5)};
  color: ${colors.primary1};
  margin-right: ${g(2)};
  opacity: 0;
`

export const NoteTitle = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    ${DeleteNote}, ${EditNote} {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
`
export const NoteHeading = styled.h4`
  margin-right: ${g(2)};
  text-transform: initial;
  font-family: fantasy;
`
export const NoteDate = styled.div`
  font-family: cursive;
  font-size: 12px;
  font-style: italic;
`
export const NoteContent = styled.div`
  white-space: pre-line;
  font-family: cursive;
`
