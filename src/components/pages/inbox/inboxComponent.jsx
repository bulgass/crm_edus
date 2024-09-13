import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TextField, Button } from '@mui/material';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useAuth } from '../../../providers/authProvider/authProvider';
import "./inbox.css";

const InboxComponent = () => {
  const [activeTab, setActiveTab] = useState(0); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const { currentUser, userRole } = useAuth(); 

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        try {
          const messagesCollectionRef = collection(db, 'messages');
          const q = query(messagesCollectionRef, where('recipient', '==', currentUser.email));
          const querySnapshot = await getDocs(q);
          const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [currentUser, activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSendMessage = async () => {
    if (userRole === 'admin') {
      try {
        await addDoc(collection(db, 'messages'), {
          sender: currentUser.email,
          recipient,
          text: newMessage,
          timestamp: new Date(),
        });
        setNewMessage('');
        setRecipient('');
        await fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error('Access denied: User is not an admin.');
    }
  };

  return (
    <div className="Page">
      <header className="Top">
        <h1>Inbox</h1>
        <hr />
      </header>
      <section className="MainContent">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Inbox" />
          {userRole === 'admin' && <Tab label="Compose" />}
          <Tab label="Trash" />
        </Tabs>
        <div className="MessageBlock">
          {activeTab === 0 && (
            <>
              <h3>Messages</h3>
              {messages.length === 0 ? (
                <p>No messages.</p>
              ) : (
                <ul>
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <strong>From:</strong> {msg.sender}<br />
                      <strong>Message:</strong> {msg.text}<br />
                      <strong>Sent at:</strong> {new Date(msg.timestamp.toDate()).toLocaleString()}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {activeTab === 1 && userRole === 'admin' && (
            <div className="ComposeMessage">
              <h3>Compose Message</h3>
              <TextField
                label="Recipient Email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                style={{ marginTop: 10 }}
              >
                Send
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InboxComponent;
