import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { api } from "../../services/api";

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Form, Background } from './styles';

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password){
      return alert('Preencha todos os campos');
    };

    api.post("/users", { name, email, password })
    .then(() => {
      alert("Usuário cadastrado com sucesso");
      navigate('/');
    })
    .catch(error => {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert('Não foi possível cadastrar');
      }
    })
  }

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
          onChange={e => setName(e.target.value)}
        />

        <Input 
          placeholder="E-mail"
          type="text"
          icon={ FiMail }
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          placeholder="Password"
          type="password"
          icon={ FiLock }
          onChange={e => setPassword(e.target.value)}
        />

        <Button title="Sign Up" onClick={handleSignUp}/>

        <Link to="/">Go back to login</Link>
        
      </Form>

    </Container>
  )
}