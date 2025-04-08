import React, { useState } from 'react';
import axios from 'axios';
import { Divider, Avatar, Tabs, Tab, TextField, Button, useTheme, Typography, Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextareaAutosize } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    header: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.dark,
      textAlign: 'center',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    back: {
      position: 'absolute',
      left: theme.spacing(2),
      cursor: 'pointer',
    },
  };
});

function TrainerPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [response, setResponse] = useState('');
  const [unresolvedRequirements, setUnresolvedRequirements] = useState([]);
  const [trainerId, setTrainerId] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [traineeRecords, setTraineeRecords] = useState([]);
  const [page, setPage] = useState(0); // Add pagination for better display
  const [rowsPerPage, setRowsPerPage] = useState(5); // Pagination rows per page
  const [visibleTraineeRecords, setVisibleTraineeRecords] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const classes = useStyles();
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/trainer/login', {
        username: loginUsername,
        password: loginPassword,
      });
      if (res.data.success) {
        setResponse('Login successful');
        setTrainerId(res.data.trainerId);
        setIsLoggedIn(true);
      } else {
        setResponse('Login failed');
      }
    } catch (error) {
      console.error(error);
      setResponse('Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/trainer/register', {
        username: registerUsername,
        password: registerPassword,
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error(error);
      setResponse('Registration failed');
    }
  };

  const fetchUnresolvedRequirements = async (trainerId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/requirement/unresolved`, {
        params: { trainerId: trainerId },
      });
      if (res.status === 200) {
        setUnresolvedRequirements(res.data);
      } else {
        console.error('Failed to fetch unresolved requirements');
      }
    } catch (error) {
      console.error('Error fetching unresolved requirements:', error);
    }
  };

  const handleUpdateRequirement = async (id, equipmentRecommendation, trainingTimeRecommendation, recommendedUsageCount) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/requirement/updateFeedback`, {
        id,
        equipmentRecommendation,
        trainingTimeRecommendation,
        recommendedUsageCount,
      });
      if (res.status === 200) {
        alert('Feedback updated successfully');
        fetchUnresolvedRequirements(trainerId);
      } else {
        alert('Failed to update feedback');
      }
    } catch (error) {
      console.error('Error updating requirement feedback:', error);
    }
  };

  const toggleTable = () => {
    if (!showTable) {
      fetchUnresolvedRequirements(trainerId);
    }
    setShowTable(!showTable);
  };

  const fetchTraineeRecords = async (traineeId) => {
    try {
      if (visibleTraineeRecords[traineeId]) {
        setVisibleTraineeRecords(prevState => ({
          ...prevState,
          [traineeId]: false
        }));
        setTraineeRecords([]);
      } else {
        const res = await axios.get(`http://localhost:8080/api/trainee/records/by-trainee/${traineeId}`);
        setTraineeRecords(res.data);
        setVisibleTraineeRecords(prevState => ({
          ...prevState,
          [traineeId]: true
        }));
      }
    } catch (error) {
      console.error('Error fetching trainee records:', error);
      setTraineeRecords([]);
    }
  };


  const groupedRecords = () => {
    const groups = traineeRecords.reduce((acc, record) => {
      acc[record.globalTrainingId] = [...(acc[record.globalTrainingId] || []), record];
      return acc;
    }, {});
    return Object.values(groups).map((group, index) => (
      <Box key={index} sx={{ mb: 4 }}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Start Time</TableCell>
                <TableCell>Training Devices</TableCell>
                <TableCell>Duration Time</TableCell>
                <TableCell>Usage Times</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {group.map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.trainTime}</TableCell>
                  <TableCell>{record.deviceId}</TableCell>
                  <TableCell>{record.usageDuration} s</TableCell>
                  <TableCell>{record.usageCount} times</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    ));
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Container
          maxWidth="100vh"
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
          <Paper
            elevation={8}
            sx={{
              width: 444,
              padding: 4,
              borderRadius: '16px',
              boxShadow: '0px 6px 24px rgba(255, 255, 255, 0.8)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                boxShadow: '0px 6px 30px rgba(255, 255, 255, 0.9)',
              },
              marginTop: 4,
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                Trainer Access
              </Typography>
            </Box>

            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            <Divider sx={{ my: 3 }} />

            {/* Login Part */}
            {selectedTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom align="center">
                  Login to your Account
                </Typography>
                <Box display="flex" flexDirection="column" gap={3}>
                  <TextField
                    label="Login Username"
                    variant="outlined"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Login Password"
                    type="password"
                    variant="outlined"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                    sx={{
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    Login
                  </Button>
                  <Typography color="error" align="center">
                    {response}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Register Part */}
            {selectedTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom align="center">
                  Create a New Account
                </Typography>
                <Box display="flex" flexDirection="column" gap={3}>
                  <TextField
                    label="Register Username"
                    variant="outlined"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Register Password"
                    type="password"
                    variant="outlined"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRegister}
                    fullWidth
                    sx={{
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    Register
                  </Button>
                  <Typography color="error" align="center">
                    {response}
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Container>
      ) : (
        <Container maxWidth={false} disableGutters>
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Typography variant="h4" gutterBottom className={classes.header}>
              <ArrowBackIcon className={classes.back} onClick={() => window.history.back()} />
              Welcome Trainer
            </Typography>
            {visibleTraineeRecords && groupedRecords()}
            <Button
              onClick={toggleTable}
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
            >
              {showTable ? 'Hide application records' : 'View application records'}
            </Button>
          </Box>

          {showTable && (
            <TableContainer component={Paper} sx={{ mt: 3, borderRadius: '16px', boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>User Height</TableCell>
                    <TableCell>User Weight</TableCell>
                    <TableCell>Training Equipment Suggestions</TableCell>
                    <TableCell>Training Time Suggestions</TableCell>
                    <TableCell>Usage Frequency Suggestions</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unresolvedRequirements && unresolvedRequirements.length > 0 ? (
                    unresolvedRequirements
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((req) => (
                        <TableRow key={req.id}>
                          <TableCell>{req.traineeName}</TableCell>
                          <TableCell>{req.height} cm</TableCell>
                          <TableCell>{req.weight} kg</TableCell>
                          <TableCell>
                            <TextareaAutosize
                              minRows={3}
                              defaultValue={req.equipmentRecommendation}
                              onChange={(e) => (req.equipmentRecommendation = e.target.value)}
                              style={{ width: '100%' }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextareaAutosize
                              minRows={3}
                              defaultValue={req.trainingTimeRecommendation}
                              onChange={(e) => (req.trainingTimeRecommendation = e.target.value)}
                              style={{ width: '100%' }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              defaultValue={req.recommendedUsageCount}
                              onChange={(e) => (req.recommendedUsageCount = parseInt(e.target.value, 10))}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleUpdateRequirement(req.id, req.equipmentRecommendation, req.trainingTimeRecommendation, req.recommendedUsageCount)}
                              variant="contained"
                              color="primary"
                              sx={{ mr: 2, width: '70px', mt: 2 }}
                            >
                              Submit
                            </Button>
                            <Button
                              onClick={() => fetchTraineeRecords(req.traineeId)}
                              variant="contained"
                              color="secondary"
                              sx={{ mr: 2, width: '70px', mt: 2 }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No trainee apply for a requiring yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={unresolvedRequirements.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
              />
            </TableContainer>
          )}
        </Container>
      )}
    </div>
  );
}

export default TrainerPage;
