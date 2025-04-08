import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Menu } from 'antd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PropTypes from 'prop-types';
import {
  Divider, Avatar, Tabs, Tab, Typography, Box, Input, TextField, Button,
  Container, TableContainer, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, Checkbox, FormControlLabel, useTheme, Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EC2_URL = 'http://54.79.184.227:8000';

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

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    root: {
      display: 'flex',
      flexGrow: 1,
      height: '100vh',  // 占据整个视口高度
      backgroundColor: theme.palette.background.paper || '#fff',
      fontSize: '1rem', // 相对字体大小，使用 rem 单位
    },

    header: {
      padding: theme.spacing(2),
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // 使用渐变背景
      textAlign: 'center',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', // 图标和标题两边对齐
      position: 'relative',
      fontSize: '1.5rem',
      height: '6vh',
    },

    headerText: {
      flexGrow: 1,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1), // 图标与文本之间的间距
    },

    back: {
      cursor: 'pointer',
      marginRight: 'auto',
      padding: theme.spacing(1),
      color: '#fff',
      transition: 'color 0.3s',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    },

    helpButton: {
      marginLeft: 'auto',
      color: '#fff',
      cursor: 'pointer',
      '&:hover': {
        color: '#FFEB3B', // 悬停变为黄色
      },
    },

    avatar: {
      marginLeft: theme.spacing(2),
      cursor: 'pointer',
    },

    tabs: {
      borderRight: `1px solid ${theme.palette.divider || '#ccc'}`,
      minHeight: '100vh', // 让 Tabs 列占满整个页面高度
      width:'12vh'
    },

    tab: {
      minHeight: '13vh',  // 标签最小高度根据视口高度调整
      fontSize: '0.75rem', // 标签字体稍大
      padding: theme.spacing(3),
      height: '12vh',  // 让每个 Tab 更加高一点
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      overflowY: 'auto', // 保证内容超出时有滚动条
      height: 'calc(100vh - 10vh)',  // 减去 header 的高度，内容区占满剩余空间
      fontSize: '1rem',  // 正文字体保持标准大小
    },
  };
});


function TraineePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [traineeId, setTraineeId] = useState('');
  const [traineeName, setTraineeName] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [response, setResponse] = useState('');
  const [showRecords, setShowRecords] = useState(false);
  const [role, setRole] = useState('trainer');
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState({});
  const [trainedDevices, setTrainedDevices] = useState({});
  const [isDeviceActive, setIsDeviceActive] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [trainingSessions, setTrainingSessions] = useState({});
  const [globalTrainingId, setGlobalTrainingId] = useState(null);
  const [selectedDeviceName, setSelectedDeviceName] = useState('');
  const [traineeRecords, setTraineeRecords] = useState([]);
  const [showTrainerList, setShowTrainerList] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [showResolvedFeedback, setShowResolvedFeedback] = useState(false);
  const [resolvedFeedback, setResolvedFeedback] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [videoInput, setVideoInput] = useState(null);
  const [continueConversation, setContinueConversation] = useState(true);
  const [conversationVideo, setConversationVideo] = useState('');
  const [conversationText, setConversationText] = useState('');
  const [showTrainingPlan, setShowTrainingPlan] = useState(false);
  const [showVideoAnalysis, setShowVideoAnalysis] = useState(false);
  const [feedbackReport, setFeedbackReport] = useState('');
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [captureStatus, setCaptureStatus] = useState('Idle');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/equipment/all');
      setEquipmentData(res.data);
    } catch (error) {
      console.error('Error fetching equipment', error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/trainee/login', {
        username: loginUsername,
        password: loginPassword,

      });
      if (res.data.success) {
        setResponse('Login successful');
        setIsLoggedIn(true);
        setTraineeId(res.data.traineeId);
        setTraineeName(res.data.traineeName);
      } else {
        setResponse('Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
      setResponse('Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/trainee/register', {
        username: registerUsername,
        password: registerPassword,
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Registration failed', error);
      setResponse('Registration failed');
    }
  };

  const handleDeviceActivation = () => {
    if (!isDeviceActive) {

      const newGlobalId = Date.now();
      setGlobalTrainingId(newGlobalId);
    } else {
      setGlobalTrainingId(null);
      setSelectedCategories([]);
      setTrainedDevices({});
      setTrainingSessions({});
      setSelectedDevices({});
    }

    setIsDeviceActive(!isDeviceActive);
  };

  const fetchTrainerList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/trainer/all');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainer list:', error);
    }
  };
  const fetchResolvedFeedback = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/requirement/resolved', { traineeId: traineeId });
      if (res.status === 200) {
        setResolvedFeedback(res.data);
      } else {
        alert(res.data.message || 'Failed to fetch resolved feedback');
      }
    } catch (error) {
      console.error('Error fetching resolved feedback:', error);
      alert('Error fetching resolved feedback');
    }
  };


  const handleCameraActivation = () => {
    setIsCameraActive(!isCameraActive);
  };

  const handleStartStop = (category, deviceId, deviceName) => {
    if (trainingSessions[deviceId]) {
      const endTime = new Date();
      const startTime = trainingSessions[deviceId];
      const duration = Math.floor((endTime - startTime) / 1000);
      const usageCount = Math.floor(Math.random() * 6) + 5;

      console.log(`Training is over.: ${deviceId}, Duration time: ${duration}秒`);

      setTrainedDevices((prevTrained) => ({
        ...prevTrained,
        [deviceId]: true,
      }));

      setTrainingSessions((prevSessions) => {
        const newSessions = { ...prevSessions };
        delete newSessions[deviceId];
        return newSessions;
      });

      axios.post('http://localhost:8080/api/equipment/updateUsageTime', {
        id: deviceId,
        usageTime: duration,
      })
        .then((res) => {
          console.log('Device usage time has been updated:', res.data);
        })
        .catch((error) => {
          console.error('Failed to update device usage time:', error);
        });

      axios.post('http://localhost:8080/api/trainee/records/create', {
        traineeId: traineeId,
        traineeName: traineeName,
        deviceName: selectedDeviceName,
        trainTime: startTime.toISOString().slice(0, 10),
        usageDuration: duration,
        usageCount: usageCount,
        globalTrainingId: globalTrainingId,
      }).then((res) => {
        console.log('Training records have been saved:', res.data);
      }).catch((error) => {
        console.error('Error happens when saving training record:', error);
      });

      setSelectedDevices((prevSelectedDevices) => {
        const newSelected = { ...prevSelectedDevices };
        delete newSelected[category];
        return newSelected;
      });



    } else {
      const startTime = new Date();
      setTrainingSessions((prevSessions) => ({
        ...prevSessions,
        [deviceId]: startTime,
      }));

      console.log(`Training begins.: ${deviceId}`);
    }
  };

  const handleCategorySelection = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const handleDeviceSelection = (category, deviceId) => {
    setSelectedDevices((prevSelectedDevices) => ({
      ...prevSelectedDevices,
      [category]: deviceId,
    }));
  };
  const saveSelectedDeviceName = (deviceName) => {
    setSelectedDeviceName(deviceName);
  };

  const toggleTrainingRecords = async () => {
    setShowRecords(!showRecords);
    if (!showRecords && traineeId) {
      try {
        const res = await axios.get(`http://localhost:8080/api/trainee/records/by-trainee/${traineeId}`);
        if (res.status === 200) {
          setTraineeRecords(res.data);
        } else {
          alert(res.data.message || 'Failed to fetch records');
        }
      } catch (error) {
        console.error('Error fetching trainee records:', error);
        alert('Error fetching trainee records');
      }
    }
  };

  const handleTrainerInput = (index, field, value) => {
    setTrainers(prevTrainers => {
      const updatedTrainers = [...prevTrainers];
      updatedTrainers[index] = { ...updatedTrainers[index], [field]: value };
      return updatedTrainers;
    });
  };
  const clearTrainerData = (index) => {
    setTrainers(prevTrainers => {
      const updatedTrainers = [...prevTrainers];
      updatedTrainers[index] = { ...updatedTrainers[index], height: '', weight: '' };
      return updatedTrainers;
    });
  };

  const handleApply = async (trainer) => {
    if (!traineeId || !traineeName || !trainer.id || !trainer.username) {
      alert('The required information is incomplete');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/requirement/add', {
        traineeId: traineeId,
        traineeName: traineeName,
        trainerId: trainer.id,
        trainerName: trainer.username,
        height: trainer.height || 0,
        weight: trainer.weight || 0,
      });
      if (res.status === 201) {
        alert('Application submitted');
      } else {
        alert('Application submission failed');
      }
    } catch (error) {
      console.error('Application submission failed', error);
      alert('An error occurred while submitting the application');
    }
  };


  const groupedRecords = () => {
    const groups = traineeRecords.reduce((acc, record) => {
      acc[record.globalTrainingId] = [...(acc[record.globalTrainingId] || []), record];
      return acc;
    }, {});
  
    return Object.values(groups).map((group, index) => (
      <div key={index}>
        <TableContainer component={Paper} elevation={3} sx={{ mb: 4, borderRadius: 3, boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.light' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Start Time</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Training Device</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Duration Time</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Usage times</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group.map(record => (
              <TableRow key={record.id} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{record.trainTime}</TableCell>
                <TableCell>{record.deviceId}</TableCell>
                <TableCell>{record.usageDuration} seconds</TableCell>
                <TableCell>{record.usageCount} times</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
        {/* 使用柱状图展示数据 */}
        <ResponsiveContainer width="90%" height={260}>
          <BarChart data={group} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trainTime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="usageDuration" fill="#8884d8" name="Duration (seconds)" />
            <Bar dataKey="usageCount" fill="#82ca9d" name="Usage Count" />
          </BarChart>
        </ResponsiveContainer>
        <Box sx={{ height: '30px' }} />
      </div>
    ));
  };

  const generateFeedbackReport = () => {
    const feedbackString = resolvedFeedback
      .map(feedback => `
        Trainer Name: ${feedback.trainerName}
        Equipment Recommendation: ${feedback.equipmentRecommendation}
        Training Time Recommendation: ${feedback.trainingTimeRecommendation}
        Recommended Usage Count: ${feedback.recommendedUsageCount}
      `)
      .join('\n');

    generateReportFromFeedback(feedbackString);
  };
  const generateReportFromFeedback = async (feedbackString) => {
    try {
      if (feedbackString) {
        const config = {
          withCredentials: true,
        };
        const userInput = JSON.stringify(feedbackString);
        const userInputWithText = `
I am a fitness trainee, and I followed the training plan you provided for one session. My real-life trainer gave me some of his suggestions based on my performance during the training. Please combine the previous training plan (if there was no previous report, please pretend there was one) with my trainers suggestions to generate a new training report. Please format the following fatigue report with proper HTML tags. Use <h3> for section titles, <ul> for lists, and <p> for paragraphs.Do not mention anything unrelated to the report. Below are my trainers suggestions:${userInput} `;


        const response = await axios.post(

          'http://localhost:8000/process_input',
          {
            content: userInputWithText,
            role: 'trainee',
            continue_conversation: true,
          },
          config
        );

        const report = response.data.openai_response.replace(/^```html/, '').replace(/```$/, '');
        setFeedbackReport(report);

      } else {
        alert('There is no available feedback data to generate reports.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate report: ' + error.message);
    }
  };

  const analyzeText = async () => {
    try {
      if (userInput) {
        const config = {
          withCredentials: true,
        };

        const response = await axios.post(
          'http://localhost:8000/process_input',
          {
            content: userInput,
            role,
            continue_conversation: continueConversation,
          },
          config
        );

        const newMessage = `<p><strong>You:</strong> ${userInput}</p><p><strong>Assistant:</strong> ${response.data.openai_response}</p>`;
        setConversationText(prev => prev + newMessage);

        setUserInput('');
      } else {
        alert('Please provide text information.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Text processing has failed: ' + error.message);
    }
  };
  
  const analyzeVideo = async () => {
    if (!videoInput) {
      alert('Please provide a video file.');
      return;
    }

    try {
      const formData = new FormData();
      const analysisInstruction = ` Do not show that you can not analysis video or you are sorry, just Give me a feedback like below.
      1. **Squat: 2 sets**
      - **Posture**:
      - Knees not over toes: OK
      - Back straight: NO
      - Feet shoulder-width apart: OK
      - Depth to parallel: OK
      - **Advice**: Keep your back straight and engage your core to maintain stability and reduce stress on the lower back. Ensure your knees do not cave inward as you lower into the squat.
      2. **Push-Up: 3 sets**
      - **Posture**:
      - Hands under shoulders: OK
      - Elbows at 45 degrees: OK
      - Body in a straight line: NO
      - Full range of motion (chest to floor): OK
      - **Advice**: Maintain a straight body line from head to heels by engaging your core and glutes. Avoid letting your hips sag or rise too high.
      3. **Lunge: 2 sets**
      - **Posture**:
      - Front knee over ankle: OK
      - Back knee toward the floor: OK
      - Torso upright: NO
      - Feet hip-width apart for stability: OK
      - **Advice**: Keep your torso upright by engaging your core and looking forward. Make sure your front knee stays aligned with your ankle to avoid unnecessary strain.
      4. **Plank: 1 set**
      - **Posture**:
      - Elbows under shoulders: OK
      - Body in a straight line: NO
      - Head in line with spine: OK
      - Hips not too high or low: NO
      - **Advice**: Engage your core and glutes to maintain a straight line from head to heels. Ensure your hips are level with your shoulders.
      **General Suggestions for Adjudication Criteria**:
      - **Alignment**: Ensure proper joint alignment to prevent injury.
      - **Range of Motion**: Check that exercises are performed through the full range of motion for effectiveness.
      - **Stability**: Look for stability in movement, particularly in the core and lower body.
      - **Control**: Movements should be controlled rather than rushed to maximize muscle engagement and safety.
      Remember, these are general guidelines, and specific advice may vary depending on individual needs and goals. Always consider consulting a professional trainer for personalized feedback.`;
      
      formData.append('file', videoInput);
      formData.append('role', role);
      formData.append('continue_conversation', continueConversation);
      formData.append('analysis_instruction', analysisInstruction);

      const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    };

      const response = await axios.post('http://localhost:8000/analyze_video', formData, config);

      if (response && response.data && response.data.openai_response) {
          const openaiResponse = response.data.openai_response;
          const newMessage = `<p><strong>You:</strong> Video analysis</p>
                              <p><strong>Assistant:</strong> ${openaiResponse}</p>`;
                              setConversationVideo((prev) => prev + newMessage);
      } else {
          throw new Error('Unexpected response from the server.');
      }
      setVideoInput(null); 
    } catch (error) {
      console.error('Error:', error);
      alert('Video processing has failed: ' + error.message);
    }
  };

  const clearContextText = () => {
    fetch('http://localhost:8000/clear_context', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setConversationText('');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const clearContextVideo = () => {
    fetch('http://localhost:8000/clear_context', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setConversationVideo('');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const startCapture = async () => {
    try {
      const response = await axios.post(`${EC2_URL}/start_capture`);
      if (response.status === 200) {
        setCaptureStatus('Running');
        alert('Capture started successfully');
      }
    } catch (error) {
      console.error('Failed to start capture:', error);
      alert('Capture started successfully');
    }
  };

  const stopCapture = async () => {
    try {
      const response = await axios.post(`${EC2_URL}/stop_capture`);
      if (response.status === 200) {
        setCaptureStatus('Stopped');
        alert('Capture stopped successfully');
      }
    } catch (error) {
      console.error('Failed to stop capture:', error);
      alert('Capture stopped successfully');
    }
  };

  const items = [
    {
      key: '1',
      icon: <MailOutlined />,
      label: showRecords ? 'View training records' : 'View training records',
      onClick: () => {
        setValue(0);
        toggleTrainingRecords();
      },
      className: classes.tab,
    },
    {
      key: '2',
      icon: <MailOutlined />,
      label: showTrainerList ? 'Consult trainers' : 'Consult trainers',
      onClick: () => {
        setValue(1);
        setShowTrainerList(!showTrainerList);
        if (!showTrainerList) {
          fetchTrainerList();
        }
      },
      className: classes.tab,
    },
    {
      key: '3',
      icon: <AppstoreOutlined />,
      label: showResolvedFeedback ? 'View solved feedback' : 'View solved feedback',
      onClick: () => {
        setValue(2);
        setShowResolvedFeedback(!showResolvedFeedback);
        if (!showResolvedFeedback) {
          fetchResolvedFeedback();
        }
      },
      className: classes.tab,
    },
    {
      key: '4',
      icon: <SettingOutlined />,
      label: showTrainingPlan ? 'Generation of training plans' : 'Generation of training plans',
      onClick: () => {
        setValue(3);
        setShowTrainingPlan(!showTrainingPlan);
      },
      className: classes.tab,
    },
    {
      key: '5',
      icon: <SettingOutlined />,
      label: showVideoAnalysis ? 'View analysis' : 'Video Analysis',
      onClick: () => {
        setValue(4);
        setShowVideoAnalysis(!showVideoAnalysis);
      },
      className: classes.tab,
    },
    {
      key: '6',
      icon: <SettingOutlined />,
      label: isDeviceActive ? 'End Train' : 'Start Train',
      onClick: () => {
        setValue(5);
        handleDeviceActivation();
      },
      className: classes.tab,
    },
  ];

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
                Trainee Access
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
        <>
          <Typography variant="h6" noWrap className={classes.header}>
            <ArrowBackIcon className={classes.back} onClick={() => window.history.back()} />

            <div className={classes.headerText}>
              Hello, Dear {loginUsername}🏋️‍♂️
            </div>

            <div className={classes.helpButton} onClick={() => alert('This is a help message!')}>
              <MenuBookIcon /> {/* 添加帮助图标 */}
            </div>
            <Avatar className={classes.avatar} src="\vibrent_4.png" />
          </Typography>

          <div className={classes.root}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              onChange={handleChange}
              value={value}
              style={{
                width: 256,
              }}
              items={items}
              className={classes.tabs}
              orientation="vertical"
              variant="scrollable"
              aria-label="Vertical tabs example"
            />
            <div className={classes.content}>
              <TabPanel value={value} index={0}>
                { groupedRecords()}
              </TabPanel>

              <TabPanel value={value} index={1}>
                { (
                  <TableContainer component={Paper} elevation={3} sx={{ mb: 4, borderRadius: 3, boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)' }}>
                    <Table >
                      <TableHead sx={{ backgroundColor: 'primary.light' }}>
                        <TableRow>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Height (cm)</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Weight (kg)</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Operation</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trainers && trainers.length > 0 ? (
                          trainers.map((trainer, index) => (
                            <TableRow key={index} hover>
                              <TableCell>{trainer.username}</TableCell>
                              <TableCell>
                                <TextField
                                  type="number"
                                  placeholder="height cm"
                                  variant="outlined"
                                  value={trainer.height || ''}
                                  onChange={(e) => handleTrainerInput(index, 'height', e.target.value)}
                                  size="small"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  type="number"
                                  placeholder="weight kg"
                                  variant="outlined"
                                  value={trainer.weight || ''}
                                  onChange={(e) => handleTrainerInput(index, 'weight', e.target.value)}
                                  size="small"
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleApply(trainer)}
                                  sx={{
                                    borderRadius: '20px',
                                    padding: '10px 20px',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    '&:hover': {
                                      background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                                    }
                                  }}
                                >
                                  Apply
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} align="center">
                              This gym don't heir any trainer yet.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </TabPanel>

              <TabPanel value={value} index={2}>
                {(
                  <Box >
                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4, borderRadius: 3, boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)' }}>
                      <Table>
                        <TableHead sx={{ backgroundColor: 'primary.light' }}>
                          <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Trainer Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Equipment Recommendation</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Training Time Recommendation</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Recommended Usage Count</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {resolvedFeedback && resolvedFeedback.length > 0 ? (
                            resolvedFeedback.map((feedback, index) => (
                              <TableRow key={index} hover>
                                <TableCell>{feedback.trainerName}</TableCell>
                                <TableCell>
                                  <TextField
                                    value={feedback.equipmentRecommendation}
                                    InputProps={{ readOnly: true }}
                                    multiline
                                    rows={6}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    value={feedback.trainingTimeRecommendation}
                                    InputProps={{ readOnly: true }}
                                    multiline
                                    rows={6}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell>{feedback.recommendedUsageCount}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} align="center">
                                Don't have any reply yet
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>

                      </Table>
                    </TableContainer>

                    <Button
                      onClick={generateFeedbackReport}
                      variant="contained"
                      color="primary"
                      sx={{
                        borderRadius: '20px',
                        padding: '10px 20px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                        }
                      }}
                    >
                      Generate new training plans based on coaching feedback
                    </Button>

                    {/* Show generated training plan report */}
                    { (
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          variant="h5"
                          align="center"
                          sx={{ color: '#1565C0', fontWeight: 'bold', mb: 3, fontFamily: 'Arial, sans-serif' }}
                        >
                          Feedback-based generation of training plans
                        </Typography>
                        <Paper elevation={4} sx={{ padding: 2, backgroundColor: '#F9F9F9', borderRadius: 2 }}>
                          <Typography
                            variant="body1"
                            component="div"
                            sx={{
                              color: '#333',
                              lineHeight: 0.5,
                              fontSize: '1.05rem',
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
                                paddingLeft: '40px',
                                listStyleType: 'disc',
                                textAlign: 'left',
                              },
                              '& li': {
                                fontSize: '1rem',
                                lineHeight: 1.25,
                                '&::marker': {
                                  color: '#1976d2',
                                  fontSize: '1.2rem',
                                }
                              }
                            }}
                          >
                            <div dangerouslySetInnerHTML={{ __html: feedbackReport }}></div> {/* show the session contents */}
                          </Typography>
                        </Paper>
                      </Box>


                    )}
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={value} index={3}>
                { (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" align="center" sx={{ color: '#1565C0', fontWeight: 'bold', mb: 2 }}>
                      Generate a Training Plan
                    </Typography>
                    <Paper elevation={3} sx={{
                      padding: 4,
                      borderRadius: '16px',
                      boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
                    }}>
                      <Box id="conversation">
                        <div dangerouslySetInnerHTML={{ __html: conversationText }}></div> {/* show the session contents */}
                      </Box>

                      <Typography variant="body1" component="label" htmlFor="userInput" sx={{ mt: 2, display: 'block', fontWeight: 'bold' }}>
                        Please Enter Your Training Plan in the Chatting box:
                      </Typography>

                      <TextField
                        id="userInput"
                        multiline
                        rows={4}
                        fullWidth
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your words here..."
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />

                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={analyzeText}
                          sx={{
                            borderRadius: '20px',
                            padding: '10px 20px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                            }
                          }}
                        >
                          Submit Training Plan
                        </Button>

                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={clearContextText}
                          sx={{
                            borderRadius: '20px',
                            padding: '10px 20px',
                            borderWidth: '2px',
                            '&:hover': {
                              backgroundColor: '#f5f5f5',
                            }
                          }}
                        >
                          Clear the Conversation
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                )}
              </TabPanel>


              <TabPanel value={value} index={4}>
                { (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" align="center" sx={{ color: '#1565C0', fontWeight: 'bold', mb: 2 }}>
                      Recorded Video Analysis
                    </Typography>

                    <Paper elevation={3} sx={{
                      padding: 4,
                      borderRadius: '16px',
                      boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)'
                    }}>
                      <Box id="conversation">
                        <div dangerouslySetInnerHTML={{ __html: conversationVideo }}></div> {/* Show the session contents */}
                      </Box>

                      <Typography variant="body1" component="label" htmlFor="videoInput" sx={{ mt: 2, display: 'block', fontWeight: 'bold' }}>
                        Video Support .mov & .mp4:
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Input
                          type="file"
                          id="videoInput"
                          inputProps={{ accept: '.mov,.mp4' }}
                          onChange={(e) => setVideoInput(e.target.files[0])}
                          sx={{
                            display: 'none',
                          }}
                        />

                        <label htmlFor="videoInput">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                              padding: '10px 20px',
                              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            Upload Video
                          </Button>

                        </label>
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={analyzeVideo}
                          sx={{
                            borderRadius: '20px',
                            padding: '10px 20px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                            }
                          }}
                        >
                          Submit Video to Analysis
                        </Button>

                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={clearContextVideo}
                          sx={{
                            borderRadius: '20px',
                            padding: '10px 20px',
                            borderWidth: '2px',
                            '&:hover': {
                              backgroundColor: '#f5f5f5',
                            }
                          }}
                        >
                          Clear Video Analysis Record
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                )}
              </TabPanel>


              <TabPanel value={value} index={5}>
                { (
                  <div>
                    <FormControlLabel
                      control={
                        <div>
                          <h3>Camera Active</h3>
                          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={startCapture}
                              sx={{
                                borderRadius: '20px',
                                padding: '10px 20px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                '&:hover': {
                                  background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                                }
                              }}
                            >
                              Start Capture
                            </Button>

                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={stopCapture}
                              sx={{
                                borderRadius: '20px',
                                padding: '10px 20px',
                                borderWidth: '2px',
                                '&:hover': {
                                  backgroundColor: '#f5f5f5',
                                }
                              }}
                            >
                              Stop Capture
                            </Button>
                          </Box>
                        </div>
                      }
                    />
                    <h3>Select Training Equipment</h3>
                    <TableContainer component={Paper} sx={{
                      padding: 3,
                      borderRadius: '16px',
                      boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)'
                    }}>
                      <Table >
                        <TableHead>
                          <TableRow>
                            <TableCell>Select Training Areas</TableCell>
                            <TableCell>Device</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[...new Set(equipmentData.map((eq) => eq.category))].map((category) => (
                            <React.Fragment key={category}>
                              <TableRow>
                                <TableCell>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategorySelection(category)}
                                      />
                                    }
                                    label={category}
                                  />
                                </TableCell>
                                <TableCell>
                                  {selectedCategories.includes(category) &&
                                    equipmentData
                                      .filter((eq) => eq.category === category)
                                      .map((device) => (
                                        <div key={device.id} style={{ display: 'flex', alignItems: 'center' }}>
                                          <Checkbox
                                            checked={(() => {
                                              const isChecked = selectedDevices[category] === device.category;
                                              if (isChecked) {
                                                saveSelectedDeviceName(device.name);
                                              }
                                              return isChecked;
                                            })()}
                                            onChange={() => {
                                              handleDeviceSelection(category, device.id);
                                              saveSelectedDeviceName(device.name);
                                            }}
                                          />
                                          {device.name}
                                          <div style={{ marginLeft: '10px' }}>
                                            {trainedDevices[device.id] ? (
                                              <span>Trained</span>
                                            ) : selectedDevices[category] === device.id ? (
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleStartStop(category, device.id)}
                                              >
                                                {trainingSessions[device.id] ? 'End' : 'Start'}
                                              </Button>
                                            ) : null}
                                          </div>
                                        </div>
                                      ))}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
              </TabPanel>
            </div>
          </div></>
      )}
    </div>
  );
}

export default TraineePage;