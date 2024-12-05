// components/Login.tsx
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import apiClient from '../apiClient';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/auth.store';

interface LoginForm {
 email: string;
 password: string;
}
interface LoginResponse {
  success: boolean; 
  message: string;
  data: {
    token: string;
    minutes_to_expire: number;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.email, formData.password);
      navigate('/locations');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
  }));
};

 return (
   <Box
     component="form"
     onSubmit={handleSubmit} 
     sx={{
       display: 'flex',
       flexDirection: 'column',
       gap: 2,
       maxWidth: 400,
       mx: 'auto',
       mt: 8,
       p: 3,
       borderRadius: 2,
       boxShadow: 3
     }}
   >
     <Typography variant="h5" align="center">
       Iniciar Sesión
     </Typography>

     <TextField
       required
       label="Email"
       name="email"
       type="email"
       value={formData.email}
       onChange={handleChange}
     />

     <TextField 
       required
       label="Password"
       name="password"
       type="password"
       value={formData.password}
       onChange={handleChange}
     />

     {error && (
       <Typography color="error" align="center">
         {error}
       </Typography>
     )}

     <Button 
       variant="contained"
       type="submit"
       sx={{ mt: 2 }}
     >
       Ingresar
     </Button>
   </Box>
 );
};

export default Login;