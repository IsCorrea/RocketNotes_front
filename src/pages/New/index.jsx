import { useState} from 'react'

import { useNavigate } from 'react-router-dom'

import { api } from '../../services/api'

import { Container, Form } from './styles'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink])
    setNewLink("")
  }
  
  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }
  
  function handleAddTag() {
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote() {
    if(!title) {
      return alert("You must add a title")
    }

    if(links.length === 0) {
      return alert("You must add a link")
    }

    if(tags.length === 0) {
      return alert("You must add a tag")
    }

    if(newLink) {
      return alert("Finish adding all Links.")
    }
    
    if(newTag) {
      return alert("Finish adding all Tags.")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Note successfully created!")
    navigate(-1)
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Create note</h1>
            <ButtonText title="Return" onClick={handleBack}/>
          </header>

          <Input
            placeholder="Title"
            type="text"
            onChange={e => setTitle(e.target.value)}
          />

          <Textarea 
            placeholder="Observations"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title='Links'>
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => {handleRemoveLink(link)}}
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder='New link'
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
              />
          </Section>

          <Section title='Tags'>
            <div className='tags'>
              {
                tags.map(tag => (
                  <NoteItem
                    key={String(tag.id)}
                    value={tag}
                    onClick={() => {handleRemoveTag(tag)}}
                    />
                ))
                
              }
              <NoteItem
                isNew
                placeholder='New tag'
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
                />
            </div>
          </Section>

          <Button title='Save' onClick={handleNewNote}/>

        </Form>
      </main>
    </Container>
  )
}