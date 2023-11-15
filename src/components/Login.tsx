import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';
import { Input, Title, Wrapper, Switcher, Error, Form } from './AuthComponents';

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (isLoading || email === '' || password === '') return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={onChange}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <Input
          value={password}
          onChange={onChange}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Input value={isLoading ? 'Loading...' : 'Login'} type="submit" />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Don&apos;t you have an account?{' '}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
