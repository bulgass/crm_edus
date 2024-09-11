import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button, TextField, Menu, MenuItem } from '@mui/material';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const db = getFirestore();
const auth = getAuth();

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showProfilePicForm, setShowProfilePicForm] = useState(false);

  // New state and handlers for tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [taskStatus, setTaskStatus] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser ? auth.currentUser.uid : '';
      if (userId) {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username || '');
          setProfilePic(userData.profilePic || '');
          setEmail(userData.email || '');
        } else {
          await setDoc(docRef, {
            username: 'New User',
            profilePic: '',
            email: auth.currentUser.email || '',
          });
          const newDocSnap = await getDoc(docRef);
          const newUserData = newDocSnap.data();
          setUsername(newUserData.username || '');
          setProfilePic(newUserData.profilePic || '');
          setEmail(newUserData.email || '');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : '';
    if (userId) {
      const docRef = doc(db, 'users', userId);
      try {
        await updateDoc(docRef, {
          username: newUsername || username,
          profilePic: newProfilePic || profilePic,
        });
        setUsername(newUsername || username);
        setProfilePic(newProfilePic || profilePic);
        setShowUsernameForm(false);
        setShowProfilePicForm(false);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  const fetchTasks = async () => {
    try {
      const userId = auth.currentUser ? auth.currentUser.uid : '';
      if (userId) {
        console.log('Fetching tasks for userId:', userId);
        setIsLoadingTasks(true);
        const taskRef = doc(db, 'tasks', userId);
        const docSnap = await getDoc(taskRef);
        if (docSnap.exists()) {
          const tasksData = docSnap.data().tasks || [];
          console.log('Tasks data:', tasksData);
          setTasks(tasksData);
          const statuses = tasksData.reduce((acc, task) => {
            acc[task.name] = task.status || 'in progress';
            return acc;
          }, {});
          setTaskStatus(statuses);
        } else {
          console.log('No tasks document found for userId:', userId);
        }
        setIsLoadingTasks(false);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setIsLoadingTasks(false);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() === '') return;

    const userId = auth.currentUser ? auth.currentUser.uid : '';
    if (userId) {
      const taskRef = doc(db, 'tasks', userId);

      try {
        const docSnap = await getDoc(taskRef);
        const newTaskObject = {
          name: newTask.trim(),
          status: 'in progress'
        };

        if (docSnap.exists()) {
          await updateDoc(taskRef, {
            tasks: arrayUnion(newTaskObject)
          });
        } else {
          await setDoc(taskRef, {
            tasks: [newTaskObject]
          });
        }

        setNewTask('');
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleStatusClick = (taskName, event) => {
    setSelectedTask(taskName);
    setAnchorEl(event.currentTarget);
  };

  const handleStatusChange = async (newStatus) => {
    const userId = auth.currentUser ? auth.currentUser.uid : '';
    if (userId) {
      const taskRef = doc(db, 'tasks', userId);

      try {
        await updateDoc(taskRef, {
          tasks: arrayRemove({
            name: selectedTask,
            status: taskStatus[selectedTask]
          })
        });

        const updatedTaskObject = {
          name: selectedTask,
          status: newStatus
        };

        await updateDoc(taskRef, {
          tasks: arrayUnion(updatedTaskObject)
        });

        if (newStatus === 'done') {
          setTimeout(async () => {
            await updateDoc(taskRef, {
              tasks: arrayRemove(updatedTaskObject)
            });
            fetchTasks();
          }, 6 * 60 * 60 * 1000); // 6 hours
        }

        setTaskStatus(prevStatus => ({
          ...prevStatus,
          [selectedTask]: newStatus
        }));
        setAnchorEl(null);
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  useEffect(() => {
    if (activeTab === 1) {
      fetchTasks();
    }
  }, [activeTab]);

  return (
    <div className="profile-page">
      <div className="main-content">
        <div className="profile-header">
          <img src={profilePic || 'default-profile-pic-url'} alt="Profile" />
          <div className="profile-info">
            <h1 className="profile-name">{username}</h1>
            <p className="profile-status">{email}</p>
          </div>
        </div>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Details" />
          <Tab label="My Tasks" />
          <Tab label="Files" />
        </Tabs>
        <div className="tab-content">
          {activeTab === 0 && (
            <div className="details-section">
              <Button 
                variant="contained" 
                onClick={() => {
                  setShowUsernameForm(true);
                  setShowProfilePicForm(false); // Hide profile photo form
                }}
              >
                Username
              </Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  setShowProfilePicForm(true);
                  setShowUsernameForm(false); // Hide username form
                }}
                startIcon={<AddPhotoAlternateIcon />}
              >
                Profile Photo
              </Button>
              {showUsernameForm && (
                <div className="username-form show">
                  <TextField
                    label="New Username"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    fullWidth
                  />
                  <Button variant="contained" onClick={handleSave}>Save</Button>
                </div>
              )}
              {showProfilePicForm && (
                <div className="profile-pic-form show">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                  />
                  <Button variant="contained" onClick={handleSave}>Save</Button>
                </div>
              )}
            </div>
          )}
          {activeTab === 1 && (
            <div className="tasks-section">
              <TextField
                label="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
              {isLoadingTasks ? <p>Loading tasks...</p> : (
                <ul>
                  {tasks.map((task, index) => (
                    <li key={index}>
                      {task.name}
                      <Button onClick={(e) => handleStatusClick(task.name, e)}>
                        Status: {taskStatus[task.name] || 'In Progress'}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === 2 && (
            <div className="files-section">
              {/* Files content */}
            </div>
          )}
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleStatusChange('in progress')}>In Progress</MenuItem>
        <MenuItem onClick={() => handleStatusChange('done')}>Done</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileComponent;
