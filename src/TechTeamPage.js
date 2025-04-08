import React, { useState } from 'react';
import axios from 'axios';
import { Divider, Avatar,Tabs, Tab, FormControl, Input, useTheme, InputLabel, TextField, Button, Box, Container, Paper, Typography, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function MaintenanceRecordsTable({ maintenanceRecords, groupByServerId }) {
  const [open, setOpen] = React.useState({});

  const handleToggle = (serverId) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [serverId]: !prevOpen[serverId],
    }));
  };

  const groupedRecords = groupByServerId(maintenanceRecords);

  return (
    <TableContainer component={Paper} style={{ width: '80%', margin: '20px auto' }}>
      <Table aria-label="maintenance records">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Server ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Port</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(groupedRecords).map(([serverId, records]) => (
            <React.Fragment key={serverId}>
              <TableRow>
                <TableCell>
                  <IconButton onClick={() => handleToggle(serverId)}>
                    {open[serverId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell>{serverId}</TableCell>
                <TableCell>{records[0].name}</TableCell>
                <TableCell>{records[0].type}</TableCell>
                <TableCell>{records[0].port}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open[serverId]} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom>
                        Update History for Server {serverId}
                      </Typography>
                      <Table size="small" aria-label="updates">
                        <TableHead>
                          <TableRow>
                            <TableCell>Version</TableCell>
                            <TableCell>Personnel</TableCell>
                            <TableCell>Reason</TableCell>
                            <TableCell>Updated File</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {records.map((record) => (
                            <TableRow key={record.id}>
                              <TableCell>{record.version}</TableCell>
                              <TableCell>{record.updatePersonnelName}</TableCell>
                              <TableCell>{record.updateReason}</TableCell>
                              <TableCell>{record.updatedFileName}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function UpdateRow({ update, index, handleInputChange, handleSubmit }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{update.serverId}</TableCell>
        <TableCell>{update.name}</TableCell>
        <TableCell>{update.type}</TableCell>
        <TableCell>{update.port}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="overline" display="block" gutterBottom style={{ marginBottom: 11 }}>
                Update Details for Server {update.serverId}
              </Typography>
              <Table size="small" aria-label="update details" >
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <FormControl>
                        <InputLabel htmlFor="component-helper">Enter Version</InputLabel>
                        <Input
                          id="component-helper"
                          value={update.version}
                          onChange={(e) => handleInputChange(index, 'version', e.target.value)}
                          aria-describedby="component-helper-text"
                          style={{ width: '80%' }}
                        />
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      <FormControl>
                        <InputLabel htmlFor="component-helper">Enter personnel</InputLabel>
                        <Input
                          id="component-helper"
                          value={update.updatePersonnelName}
                          onChange={(e) => handleInputChange(index, 'updatePersonnelName', e.target.value)}
                          aria-describedby="component-helper-text"
                          style={{ width: '80%' }}
                        />
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      <FormControl>
                        <InputLabel htmlFor="component-helper">Enter reason</InputLabel>
                        <Input
                          id="component-helper"
                          value={update.updateReason}
                          onChange={(e) => handleInputChange(index, 'updateReason', e.target.value)}
                          aria-describedby="component-helper-text"
                          style={{ width: '80%' }}
                        />
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      <FormControl>
                        <InputLabel htmlFor="component-helper">Enter file name</InputLabel>
                        <Input
                          id="component-helper"
                          value={update.updatedFileName}
                          onChange={(e) => handleInputChange(index, 'updatedFileName', e.target.value)}
                          aria-describedby="component-helper-text"
                          style={{ width: '80%' }}
                        />
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      <Button color="primary" onClick={() => handleSubmit(index, update)}>Submit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function UpdatesTable({ latestUpdates, handleInputChange, handleSubmit }) {
  return (
    <TableContainer component={Paper} style={{ width: '80%', margin: '20px auto' }}>
      <Table aria-label="latest updates">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Server ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Port</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {latestUpdates.map((update, index) => (
            <UpdateRow
              key={update.serverId}
              update={update}
              index={index}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
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
      fontSize: '1.5rem',
      height: '10vh',
    },

    back: {
      position: 'absolute',
      left: theme.spacing(2),
      cursor: 'pointer',
      fontSize: '1rem',
    },

  };
});
function TechTeamPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState('');
  const [registerResponse, setRegisterResponse] = useState('');
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRecords, setShowRecords] = useState({});
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const classes = useStyles();


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/techteam/login', {
        username: loginUsername,
        password: loginPassword,
      });
      if (res.data.success) {
        setLoginResponse('Login successful');
        setIsLoggedIn(true);
      } else {
        setLoginResponse('Login failed');
      }
    } catch (error) {
      console.error(error);
      setLoginResponse('Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/techteam/register', {
        username: registerUsername,
        password: registerPassword,
      });
      setRegisterResponse(res.data.message);
    } catch (error) {
      console.error(error);
      setRegisterResponse('Registration failed');
    }
  };

  const queryMaintenanceRecords = async () => {
    if (!showRecords['maintenance']) {
      try {
        const res = await axios.get('http://localhost:8080/api/server/all-updates');
        setMaintenanceRecords(res.data);
        setErrorMessage('');
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to fetch maintenance records.');
      }
    }
    setShowRecords((prev) => ({ ...prev, maintenance: !prev.maintenance }));
  };

  // Sorting function for serverId
  const groupByServerId = (records) => {
    const grouped = records.reduce((acc, record) => {
      (acc[record.serverId] = acc[record.serverId] || []).push(record);
      return acc;
    }, {});

    // Sorting based on numeric value after 'srv'
    return Object.keys(grouped)
      .sort((a, b) => {
        const numA = parseInt(a.replace('srv', ''), 10); // Remove 'srv' and get the number
        const numB = parseInt(b.replace('srv', ''), 10);
        return numA - numB; // Ascending order
      })
      .reduce((sorted, key) => {
        sorted[key] = grouped[key];
        return sorted;
      }, {});
  };

  const refreshMaintenanceRecords = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/server/all-updates');
      setMaintenanceRecords(res.data); // Update the records with the latest data
      setErrorMessage(''); // Clear any error messages
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch maintenance records.'); // Set error message if fetching fails
    }
  };

  const queryLatestUpdates = async () => {
    if (!showRecords['updates']) {
      try {
        const res = await axios.get('http://localhost:8080/api/server/latest-updates');
        setLatestUpdates(res.data);
        setErrorMessage('');
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to fetch latest updates.');
      }
    }
    setShowRecords((prev) => ({ ...prev, updates: !prev.updates }));
  };

  const handleSubmit = async (index, update) => {
    if (!update.version || !update.updatePersonnelName || !update.updateReason || !update.updatedFileName) {
      setErrorMessage('Please fill all required fields.');
      return;
    }
    try {
      const newUpdate = {
        serverId: update.serverId,
        name: update.name,
        type: update.type,
        port: update.port,
        version: update.version,
        updatePersonnelName: update.updatePersonnelName,
        updateReason: update.updateReason,
        updatedFileName: update.updatedFileName,
      };

      await axios.post('http://localhost:8080/api/server/add', newUpdate);

      const updatedRecords = [...latestUpdates];
      updatedRecords[index] = {
        ...updatedRecords[index],
      };
      setLatestUpdates(updatedRecords);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to submit the update.');
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedRecords = [...latestUpdates];
    updatedRecords[index] = {
      ...updatedRecords[index],
      [field]: value,
    };
    setLatestUpdates(updatedRecords);
  };
  // Function to refresh latest updates and reload the table
  const refreshLatestUpdates = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/server/latest-updates');
      setLatestUpdates(res.data);
      setShowRecords((prev) => ({ ...prev, updates: true }));
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch latest updates.');
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
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
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                Tech Team Access
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
                    {loginResponse}
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
                    {registerResponse}
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Container>
        ) : (
          <div>
            {/* Back Button */}
            <Typography variant="h6" noWrap className={classes.header} >
              <ArrowBackIcon className={classes.back} onClick={handleBack} />
              Technical Management
            </Typography>
            {/* Maintenance Section */}
            <Box sx={{
              textAlign: 'center',
              width: { xs: '100%', sm: '75%', md: '60%', lg: '70%' },
              margin: '0 auto',
              marginBottom: 4,
              marginTop: 5,
              padding: 3,
              borderRadius: '16px',
              boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
            }}>
              <Typography variant="h4" gutterBottom>
                Maintenance
              </Typography>
              <Button onClick={queryMaintenanceRecords} variant="contained" color="primary" sx={{ marginRight: 2 }}>
                {showRecords.maintenance ? 'Hide Maintenance Records' : 'Query Maintenance Records'}
              </Button>

              {/* Refresh Button */}
              <Button onClick={refreshMaintenanceRecords} variant="contained" color="secondary">
                Refresh
              </Button>

              {errorMessage && <Typography color="error">{errorMessage}</Typography>}

              {showRecords.maintenance && (
                <MaintenanceRecordsTable
                  maintenanceRecords={maintenanceRecords}
                  groupByServerId={groupByServerId}
                />
              )}
            </Box>

            {/* Model Update Section */}
            <Box sx={{
              textAlign: 'center',
              width: { xs: '100%', sm: '75%', md: '60%', lg: '70%' },
              margin: '0 auto',
              marginBottom: 4,
              padding: 3,
              borderRadius: '16px',
              boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)'
            }}>
              <Typography variant="h4" gutterBottom>
                Model Update
              </Typography>
              <Button onClick={queryLatestUpdates} variant="contained" color="primary" sx={{ marginRight: 2 }}>
                {showRecords.updates ? 'Hide Updates' : 'Query Latest Updates'}
              </Button>

              <Button onClick={refreshLatestUpdates} variant="contained" color="secondary">
                Refresh Updates
              </Button>

              {errorMessage && <Typography color="error">{errorMessage}</Typography>}

              {showRecords.updates && (
                <UpdatesTable
                  latestUpdates={latestUpdates}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechTeamPage;