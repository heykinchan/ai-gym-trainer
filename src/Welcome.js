// Welcome.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, FormControl, Select, InputLabel, Typography, Box, Container, Paper } from '@mui/material';

function Welcome() {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (selectedRole === 'trainee') {
      navigate('/trainee');
    } else if (selectedRole === 'trainer') {
      navigate('/trainer');
    } else if (selectedRole === 'gymowner') {
      navigate('/gymowner');
    } else if (selectedRole === 'techteam') {
      navigate('/techteam');
    } else {
      alert('Please select a role.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("/background.png")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={8} sx={{
          padding: 6,
          minWidth: 600,
          borderRadius: '16px',
          boxShadow: '0px 6px 24px rgba(255, 255, 255, 0.8)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            boxShadow: '0px 6px 30px rgba(255, 255, 255, 0.9)',
          },
        }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              background: 'black',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              textTransform: 'uppercase',
              letterSpacing: '0.1rem',
              fontFamily: 'Helvetica, Arial, sans-serif',
            }}
          >
            Welcome to our Smart Fitness System!
          </Typography>

          <Box mt={10}>
            <FormControl fullWidth >
              <InputLabel id="role-select-label">Please select your role</InputLabel>
              <Select
                labelId="role-select-label"
                id="roleSelect"
                value={selectedRole}
                label="Please select your role"
                onChange={(e) => setSelectedRole(e.target.value)}

              >
                <MenuItem value="">
                  <em>Please select your role</em>
                </MenuItem>
                <MenuItem value="trainee">Trainee</MenuItem>
                <MenuItem value="trainer">Trainer</MenuItem>
                <MenuItem value="gymowner">Gym Owner</MenuItem>
                <MenuItem value="techteam">IT Team</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={7} textAlign="center">
            <Button
              variant="contained"
              color='primary'
              size="large"
              onClick={handleStart}
              sx={{
                color: '#fff',
                padding: '10px 20px',
                fontSize: '1.2rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
              }}
            >
              Start
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Welcome;
