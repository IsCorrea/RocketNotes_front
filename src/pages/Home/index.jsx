import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { api } from '../../services/api';

export function Home() {
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState("")
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleTagSelected(tagName){
    if(tagName === "All") {
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName)

    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected(prevState => [...prevState, tagName])
    }
  }

  function handleDetails(id){
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchTags(){
      const response = await api.get("/tags")
      setTags(response.data)
    }

    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }

    fetchNotes()
  }, [tagsSelected, search])

  return(
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li><ButtonText 
          title="All" 
          onClick={() => handleTagSelected("All")}
          isActive={tagsSelected.length === 0}
         /></li>

        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input
          placeholder="Search title"
          onChange={e => setSearch(e.target.value)}
          icon={FiSearch}
        />
      </Search>

      <Content>
        <Section title='My notes'>
          {
            notes.map(note => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
            ))
           }
        </Section>
      </Content>

      <NewNote to='/new'>
        <FiPlus />
        Create note
      </NewNote>

    </Container>
  )
}