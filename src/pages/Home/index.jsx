import { FiPlus, FiSearch } from 'react-icons/fi'

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'


export function Home() {
  return(
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li><ButtonText title="All" isActive /></li>
        <li><ButtonText title="React"/></li>
        <li><ButtonText title="Node.js"/></li>
      </Menu>

      <Search>
        <Input placeholder="Search title" icon={FiSearch}/>
      </Search>

      <Content>
        <Section title='My notes'>
          <Note data={{title: 'React',
           tags: [
            {id: '1', name: 'react'},
            {id: '2', name: 'node.js'}
          ]
           }}/>
        </Section>
      </Content>

      <NewNote to='/new'>
        <FiPlus />
        Create note
      </NewNote>

    </Container>
  )
}