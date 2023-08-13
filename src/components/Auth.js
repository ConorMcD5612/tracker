
import React, {useEffect} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useAuth } from './context/AuthContext';

export function Auth() {
  const { setUser } = useAuth();

  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    const { sub } = decoded;

    localStorage.setItem('user', JSON.stringify(sub));
    setUser(sub);

    // Make an API call to add user if they don't exist
    await fetch(`http://localhost:5000/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sub: sub }),
    });
    
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    console.log(storedUser)

    if(storedUser){
      setUser(storedUser)
    }

  }, [])

  return (
    <GoogleLogin
      onSuccess={(response) => createOrGetUser(response)}
      onError={() => console.log('error')}
    />
  );
}
