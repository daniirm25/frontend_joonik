import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Box, Typography } from '@mui/material';
import apiClient from '../apiClient';

interface Location {
  id: number;
  name: string;
  code: number;
  image: string;
  created_at: string;
  updated_at: string | null;
}

interface ApiResponse {
  meta: {
    succes: boolean;
    message: string;
  };
  data: Location[];
}

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await apiClient.get<ApiResponse>('/auth/locations');
        setLocations(response.data);
      } catch (err: any) {
        setError(err.message || 'Error fetching locations');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
  }

  return (

    <Box
      display="flex"
      flexDirection={'column'}
      padding={10}
      gap={4}
    >
    <Typography 
       variant="h4" 
       component="h1" 
       align="center"
       sx={{
         fontWeight: 'bold',
         color: '#1a237e', // Color azul oscuro
         borderBottom: '3px solid #E2060F', // Línea roja debajo
         paddingBottom: 1,
         marginBottom: 4,
         display: 'inline-block',
         margin: '0 auto'
       }}
     >
       Sedes
     </Typography>
      <TableContainer component={Paper} style={{ maxWidth: '80%', margin: "0 auto"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Codigo</strong></TableCell>
              <TableCell align="center"><strong>Nombre</strong></TableCell>
              <TableCell align="center"><strong>Imagen</strong></TableCell>
              <TableCell align="center"><strong>Fecha creacion</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.data.map((location) => (
              <TableRow key={location.id}>
                <TableCell align="center">{location.code}</TableCell>
                <TableCell align="center">{location.name}</TableCell>
                <TableCell align="center">
                  {location.image ? (
                    <img 
                      src={location.image}
                      alt={location.name}
                      style={{ 
                        width: '50px', 
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  ) : (
           
                    <Box 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        bgcolor: 'grey.300',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      N/A
                    </Box>
                  )}
                </TableCell>
                <TableCell align="center">{location.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Locations;