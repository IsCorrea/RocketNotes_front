import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'


import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Container, Form, Background } from './styles'

export function SignUp() {
  return(
    <Container>
      <Background />

      <Form>
        <h1>RocketNotes</h1>
        <p>Application to save and manage your favorite links.</p>

        <h2>Create account</h2>

        <Input 
          placeholder="Name"
          type="text"
          icon={ FiUser }
        />

        <Input 
          placeholder="E-mail"
          type="text"
          icon={ FiMail }
        />

        <Input 
          placeholder="Password"
          type="password"
          icon={ FiLock }
        />

        <Button title="Sign Up"/>

        <Link to="/">Go back to login</Link>
        
      </Form>

    </Container>
  )
}