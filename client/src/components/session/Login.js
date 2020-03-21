import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../graphql/mutations';

export default () => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error, loading }] = useMutation(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        localStorage.setItem('token', login.token);
        client.writeData({ data: { isLoggedIn: true } });
      }
    }
  );

  if (loading) return <h2>Loading</h2>;
  if (error) return <p>An error occurred</p>;
    
  return (
    <form onSubmit={e => {
      e.preventDefault();
      login({ variables: { email, password } });
    }}>
      <label>
        <input 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Log In" />
    </form>
  );
}