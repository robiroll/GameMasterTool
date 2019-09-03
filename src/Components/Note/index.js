import React, { memo } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Button, Icon } from '../../styleguide'
import * as S from './styles'

const Note = ({
  onAddNote,
  onDeleteNote,
  onEditNote,
  onUpdateNote,
  title,
  content,
  onChangeTitle,
  onChangeContent,
  status,
  editing,
  date,
  id
}) => {
  if (status === 'add' || editing)
    return (
      <S.Note>
        <S.Title>{<S.Input type="text" onChange={onChangeTitle} value={title} />}</S.Title>
        <S.Content>{<S.Textarea onChange={onChangeContent} value={content} />}</S.Content>
        {status === 'add' && <Button onClick={onAddNote}>Add note</Button>}
        {editing && <Button onClick={onUpdateNote(id)}>Update note</Button>}
      </S.Note>
    )
  return (
    <S.NoteItem>
      <S.NoteTitle>
        <S.NoteHeading>{title}</S.NoteHeading>
        <S.EditNote onClick={onEditNote}>
          <Icon name="pencil" />
        </S.EditNote>
        <S.DeleteNote onClick={onDeleteNote(id)}>x</S.DeleteNote>
      </S.NoteTitle>
      <S.NoteDate>{date && dayjs(date).format('DD/MM/YYYY')}</S.NoteDate>
      <S.NoteContent>{content}</S.NoteContent>
    </S.NoteItem>
  )
}
Note.propTypes = {
  onAddNote: PropTypes.func,
  onDeleteNote: PropTypes.func,
  onEditNote: PropTypes.func,
  onUpdateNote: PropTypes.func,
  title: PropTypes.node,
  content: PropTypes.node,
  onChangeTitle: PropTypes.func,
  onChangeContent: PropTypes.func,
  status: PropTypes.string,
  editing: PropTypes.bool,
  date: PropTypes.string,
  id: PropTypes.string
}

export default memo(Note)
