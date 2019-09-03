import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import NoteComponent from '../../Components/Note'
import { withFirebase } from 'react-redux-firebase'

const Note = ({ idCharacter, firebase, ...props }) => {
  const [editing, setEditing] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')

  const handleAddNote = () => {
    const note = {
      date: new Date().toString(),
      title: noteTitle,
      content: noteContent
    }
    firebase.push(`characters/${idCharacter}/details/notes`, note)
  }
  const handleDeleteNote = id => () => {
    firebase.remove(`characters/${idCharacter}/details/notes/${id}`)
  }
  const handleEditNote = () => {
    setEditing(true)
    setNoteTitle(props.title)
    setNoteContent(props.content)
  }
  const handleUpdateNote = id => () => {
    setEditing(false)
    const note = {
      title: noteTitle,
      content: noteContent
    }
    firebase.update(`characters/${idCharacter}/details/notes/${id}`, note)
  }
  const handleChangeNoteTitle = ({ target: { value } }) => {
    setNoteTitle(value)
  }
  const handleChangeNoteContent = ({ target: { value } }) => {
    setNoteContent(value)
  }

  const title = noteTitle || props.title
  const content = noteContent || props.content
  return (
    <NoteComponent
      {...props}
      onAddNote={handleAddNote}
      onChangeTitle={handleChangeNoteTitle}
      onChangeContent={handleChangeNoteContent}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
      onUpdateNote={handleUpdateNote}
      editing={editing}
      title={title}
      content={content}
    />
  )
}
Note.propTypes = {
  firebase: PropTypes.object,
  idCharacter: PropTypes.string,
  status: PropTypes.oneOf(['add', 'update']),
  title: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string
}

export default memo(withFirebase(Note))
