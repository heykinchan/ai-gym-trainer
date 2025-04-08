import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Divider, Avatar,Alert, Tabs, Tab, Typography, Button, Box, useTheme, TextField, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'; // 导入 useTheme
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    root: {
      display: 'flex',
      flexGrow: 1,
      height: '100vh',
      backgroundColor: theme.palette.background.paper || '#fff',
      fontSize: '1rem',
    },

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

    tabs: {
      borderRight: `1px solid ${theme.palette.divider || '#ccc'}`,
      width: '20vw',
      minHeight: '100vh',
      fontSize: '1rem',
    },

    tab: {
      minHeight: '10vh',
      fontSize: '1.2rem',
      padding: theme.spacing(3),
      height: '12vh',
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      overflowY: 'auto',
      height: 'calc(100vh - 10vh)',
      fontSize: '1rem',
    },
  };
});


function GymOwnerPage() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [response, setResponse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [equipmentList, setEquipmentList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEquipmentList, setShowEquipmentList] = useState(false);;
  const [continueConversation, setContinueConversation] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [fatigueReport, setFatigueReport] = useState('');
  const [showPricingReport, setShowPricingReport] = useState(false);
  const [pricingReport, setPricingReport] = useState('');
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/gymOwner/login', {
        username: loginUsername,
        password: loginPassword,
      });
      if (res.data.success) {
        setResponse('Login successful');
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
      const res = await axios.post('http://localhost:8080/api/gymOwner/register', {
        username: registerUsername,
        password: registerPassword,
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error(error);
      setResponse('Registration failed');
    }
  };


  const handleAddEquipment = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/equipment/add', {
        name,
        category,
        totalUsageTime: 0,
        lastMaintenanceDate: new Date().toISOString(),
        isAvailable: true,
      });
      setResponse(res.data.message);
      fetchEquipment();
    } catch (error) {
      console.error(error);
      setResponse('Failed to add equipment');
    }
  };


  const fetchEquipment = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/equipment/all');
      const sortedList = res.data.sort((a, b) => a.id - b.id);
      setEquipmentList(sortedList);
    } catch (error) {
      console.error(error);
      setResponse('Failed to fetch equipment');
    }
  };


  const toggleAvailability = async (id, currentAvailability) => {
    try {
      const newAvailability = !currentAvailability;
      await axios.post('http://localhost:8080/api/equipment/toggleAvailability', {
        id,
        isAvailable: newAvailability,
      });


      setEquipmentList((prevList) =>
        prevList.map((equipment) =>
          equipment.id === id
            ? { ...equipment, available: newAvailability }
            : equipment
        )
      );
    } catch (error) {
      console.error('Failed to toggle availability', error);
    }
  };


  const updateMaintenanceDate = async (id) => {
    try {
      const newMaintenanceDate = new Date().toISOString();
      await axios.post('http://localhost:8080/api/equipment/updateMaintenanceDate', {
        id,
        maintenanceDate: newMaintenanceDate,
      });


      setEquipmentList((prevList) =>
        prevList.map((equipment) =>
          equipment.id === id
            ? { ...equipment, lastMaintenanceDate: newMaintenanceDate }
            : equipment
        )
      );
    } catch (error) {
      console.error('Failed to update maintenance date', error);
    }
  };
  const sendFatigueReportRequest = async () => {
    try {
      const userInput = JSON.stringify(equipmentList);
      const userInputWithText = `
I am a gym owner, and below is the equipment usage data from my gym. Currently, we only have information on total usage time and the last maintenance date. Based on this limited data, please provide me with a professional-looking fatigue report analysis. The report should be divided into three sections:

The first section should clearly list the equipment that you believe needs maintenance.
The second section should show the recommended maintenance method.
The third section should provide a fictitious contact number for the corresponding equipment maintenance supplier.
Please format the following fatigue report with proper HTML tags. Use <h3> for section titles, <ul> for lists, and <p> for paragraphs.
Please only relpy the content about my report.
Here is my data:${userInput} `;
      const res = await axios.post('http://localhost:8000/process_input', {
        content: userInputWithText,
        role: 'gym owner',
        continue_conversation: continueConversation,
      });


      setFatigueReport(res.data.openai_response.replace(/^```html/, '').replace(/```$/, ''));
    } catch (error) {
      console.error('Failed to generate fatigue report', error);
    }
  };

  const handleReportButtonClick = async () => {

    setShowReport(!showReport);

    if (!showReport) {
      try {
        const response = await axios.post('http://localhost:8000/clear_context');
        setFatigueReport('');
      } catch (error) {
        console.error('Error clearing context:', error);
      }
    }
  };

  const sendPricingReportRequest = async () => {
    try {
      const userInput = JSON.stringify(equipmentList);
      const userInputWithText = `I am a gym owner, and my gym is located near the University of Sydney. Please generate a professional gym pricing report based on nearby gym pricing information available online, the number of equipment in my gym, and the estimated foot traffic based on the interval between the last maintenance time and the current time, as well as the equipment usage during that period. The report should include pricing for off-peak times and regular hours. The pricing suggestions should include the following categories: single-entry pass, monthly pass, quarterly pass, and annual pass. The pricing should be divided into three tiers: student pricing, regular pricing, and off-peak pricing. You do not need to explain the analysis or reasoning, just provide the prices。Please format the following fatigue report with proper HTML tags. Use <h3> for section titles, <ul> for lists, and <p> for paragraphs.Please only relpy the content about my report. Here is my data: ${userInput} `;
      const res = await axios.post('http://localhost:8000/process_input', {
        content: userInputWithText,
        role: 'gym owner',
      });


      setPricingReport(res.data.openai_response.replace(/^```html/, '').replace(/```$/, ''));
    } catch (error) {
      console.error('Failed to generate pricing report', error);
    }
  };

  const handlePricingReportButtonClick = async () => {
    setShowPricingReport(!showPricingReport);
    if (!showPricingReport) {
      try {
        const response = await axios.post('http://localhost:8000/clear_context');
        setPricingReport('');
      } catch (error) {
        console.error('Error clearing context:', error);
      }
    }
  };


  useEffect(() => {
    fetchEquipment();
  }, []);

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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              Gym Owner Access
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
  

          {selectedTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom align="center">
                Login to your Account
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Password"
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
  

          {selectedTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom align="center">
                Create a New Account
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Password"
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
        <>
          <Typography variant="h6" noWrap className={classes.header} >
            <ArrowBackIcon className={classes.back} onClick={() => window.history.back()} />
            Equipment Management
          </Typography>
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >

              <Tab label={showAddForm ? 'Add Equipment' : 'Add Equipment'} {...a11yProps(0)} onClick={() => setShowAddForm(!showAddForm)} className={classes.tab} />

              <Tab label={showEquipmentList ? 'Equipment List' : 'Equipment List'} {...a11yProps(1)} onClick={() => setShowEquipmentList(!showEquipmentList)} className={classes.tab} />

              <Tab label={showReport ? 'Generate Fatigue Report' : 'Generate Fatigue Report'} {...a11yProps(2)} onClick={handleReportButtonClick} className={classes.tab} />

              <Tab label={showPricingReport ? 'Generate Pricing Report' : 'Generate Pricing Report'} {...a11yProps(3)} onClick={handlePricingReportButtonClick} className={classes.tab} />
            </Tabs>
            <div className={classes.content}>
              <TabPanel value={value} index={0}>

                { (
                  <div>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <TextField
                        label="Equipment Name"
                        variant="outlined"
                        placeholder="Equipment Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        error={!name}
                        helperText={!name ? 'Equipment name is required' : ''}
                      />
                      <TextField
                        label="Category"
                        variant="outlined"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        error={!category}
                        helperText={!category ? 'Category is required' : ''}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          if (!name || !category) {
                            setResponse('Please fill in all fields');
                          } else {
                            handleAddEquipment();
                          }
                        }}
                        sx={{ height: '48px' }}
                      >
                        Add
                      </Button>


                    </Box>

                  </div>
                )}
              </TabPanel>

              <TabPanel value={value} index={1}>

                { (
                  <div>
                    <Typography variant="h4" gutterBottom>
                      All Equipment
                    </Typography>
                    <TableContainer component={Paper}
                      sx={{ padding: 3, borderRadius: '16px', boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)' }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Total Usage Time (s)</TableCell>
                            <TableCell>Last Maintenance Date</TableCell>
                            <TableCell>Available</TableCell>
                            <TableCell>Avaliable Update</TableCell>
                            <TableCell>Maintenance</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {equipmentList.map((equipment) => (
                            <TableRow key={equipment.id}>
                              <TableCell>{equipment.id}</TableCell>
                              <TableCell>{equipment.name}</TableCell>
                              <TableCell>{equipment.category}</TableCell>
                              <TableCell>{equipment.totalUsageTime}</TableCell>
                              <TableCell>{equipment.lastMaintenanceDate}</TableCell>
                              <TableCell>{equipment.available ? 'Yes' : 'No'}</TableCell>
                              <TableCell>
                                <Button
                                  color={equipment.available ? 'secondary' : 'primary'}
                                  onClick={() => toggleAvailability(equipment.id, equipment.available)}
                                >
                                  {equipment.available ? 'Mark as Unavailable' : 'Mark as Available'}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button variant="contained"
                                  sx={{
                                    borderRadius: '20px',
                                    padding: '10px 20px',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    '&:hover': {
                                      background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                                    }
                                  }}
                                  onClick={() => updateMaintenanceDate(equipment.id)}>
                                  Maintenance
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
              </TabPanel>

              <TabPanel value={value} index={2}>
                { (
                  <div>
                    <Paper elevation={3} sx={{
                      padding: 4,
                      borderRadius: '16px',
                      boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#F9F9F9'
                    }}>
                      <Typography variant="h5"
                        align="center"
                        sx={{ color: '#1565C0', fontWeight: 'bold', mb: 3, fontFamily: 'Arial, sans-serif' }} gutterBottom>
                        Fatigue Report
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          color: '#333',
                          lineHeight: 1.5,
                          fontSize: '1rem',
                          letterSpacing: '0.2px',
                          '& h1, & h2, & h3, & h4, & h5, & h6': {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontFamily: 'Arial, sans-serif',
                            color: '#0d47a1',
                          },
                          '& p': {
                            marginBottom: '14px',
                            fontSize: '1rem',
                            lineHeight: 1.75,
                          },
                          '& ul': {
                            paddingLeft: '120px',
                            listStyleType: 'disc',
                            textAlign: 'left',
                          },
                          '& li': {
                            fontSize: '1rem',
                            lineHeight: 1.35,
                            '&::marker': {
                              color: '#1976d2',
                              fontSize: '1.2rem',
                            }
                          }
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: fatigueReport }}></div> {/* Presentation fatigue report */}
                      </Typography>

                      <Box mt={2} display="flex" justifyContent="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={sendFatigueReportRequest}
                        >
                          Generate
                        </Button>
                      </Box>
                    </Paper>
                  </div>
                )}
              </TabPanel>

              <TabPanel value={value} index={3}>
                {(
                  <>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 3,
                        borderRadius: '16px',
                        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#F9F9F9',
                        mt: 4,
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        textAlign="center"
                        gutterBottom
                        sx={{
                          color: '#0d47a1',
                          fontWeight: 'bold',
                          fontFamily: 'Arial, sans-serif',
                        }}
                      >
                        Pricing Report
                      </Typography>

                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          color: '#333',
                          lineHeight: 0.5,
                          fontSize: '1rem',
                          letterSpacing: '0.2px',
                          '& h1, & h2, & h3, & h4, & h5, & h6': {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontFamily: 'Arial, sans-serif',
                            color: '#0d47a1',
                          },
                          '& p': {
                            marginBottom: '14px',
                            fontSize: '1rem',
                            lineHeight: 1.1,
                          },
                          '& ul': {
                            paddingLeft: '60px',
                            listStyleType: 'disc',
                            textAlign: 'left',
                          },
                          '& li': {
                            fontSize: '1rem',
                            lineHeight: 1.1,
                            '&::marker': {
                              color: '#1976d2',
                              fontSize: '1.2rem',
                            },
                          },
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: pricingReport }}></div> {/* Display pricing report */}
                      </Typography>
                      <Box mt={4} mb={4} display="flex" justifyContent="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={sendPricingReportRequest}
                        >
                          Generate Pricing Report
                        </Button>
                      </Box>
                    </Paper>
                  </>
                )}
              </TabPanel>
            </div>
          </div>
        </>
      )
      }
    </div >
  );
}


export default GymOwnerPage;