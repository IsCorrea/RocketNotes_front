import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Container, Form, Background } from './styles'

export function SignIn() {
  return(
    <Container>
      <Form>
        <h1>RocketNotes</h1>
        <p>Application to save and manage your favorite links.</p>

        <h2>Login</h2>

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

        <Button title="Login"/>

        <Link to="/register">Create account</Link>
        
      </Form>

      <Background />
    </Container>
  )
}