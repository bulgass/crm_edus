import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TextField, Button } from '@mui/material';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, updateDoc, query, where, doc } from 'firebase/firestore';
import { useAuth } from '../../../providers/authProvider/authProvider';
import "./inbox.css";

const InboxComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]); // Для отправленных сообщений
  const [expandedMessageIndex, setExpandedMessageIndex] = useState(null);
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
          const fetchedMessages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [currentUser, activeTab]);

  useEffect(() => {
    const fetchSentMessages = async () => {
      if (currentUser && userRole === 'admin') {
        try {
          const sentMessagesCollectionRef = collection(db, 'messages');
          const q = query(sentMessagesCollectionRef, where('sender', '==', currentUser.email));
          const querySnapshot = await getDocs(q);
          const fetchedSentMessages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setSentMessages(fetchedSentMessages);
        } catch (error) {
          console.error('Error fetching sent messages:', error);
        }
      }
    };

    if (activeTab === 2) {
      fetchSentMessages();
    }
  }, [currentUser, userRole, activeTab]);

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
          status: 'in progress',
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

  const toggleMessage = (index) => {
    setExpandedMessageIndex(expandedMessageIndex === index ? null : index);
  };

  const handleStatusToggle = async (messageId, currentStatus) => {
    const newStatus = currentStatus === 'in progress' ? 'done' : 'in progress';
    try {
      const messageDocRef = doc(db, 'messages', messageId);
      await updateDoc(messageDocRef, { status: newStatus });
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId ? { ...msg, status: newStatus } : msg
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
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
          <Tab label="Income" />
          {userRole === 'admin' && <Tab label="Send" />}
          <Tab label="Sent" />
          <Tab label="Trash" />
        </Tabs>
        <div className="MessageBlock">
          {activeTab === 0 && (
            <>
              <h4>Messages</h4>
              {messages.length === 0 ? (
                <p>No messages.</p>
              ) : (
                <ul className="MessageList">
                  {messages.map((msg, index) => (
                    <li
                      key={msg.id}
                      className={`MessageItem ${expandedMessageIndex === index ? 'active' : ''}`}
                      onClick={() => toggleMessage(index)}
                    >
                      <div className="MessageHeader">
                        <span>{msg.sender}</span>
                        <span className="MessageDate">
                          {new Date(msg.timestamp.toDate()).toLocaleString()}
                        </span>
                      </div>
                      <div className="MessageDetails">
                        {msg.text.slice(0, 50)}{msg.text.length > 50 ? '...' : ''}
                      </div>
                      <div className="MessageContent">
                        {expandedMessageIndex === index && msg.text}
                      </div>
                      <button 
                        className={`status-toggle ${msg.status}`} 
                        onClick={() => handleStatusToggle(msg.id, msg.status)}
                      >
                        {msg.status}
                      </button>
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
          {activeTab === 2 && userRole === 'admin' && (
            <>
              <h4>Sent Messages</h4>
              {sentMessages.length === 0 ? (
                <p>No sent messages.</p>
              ) : (
                <ul className="MessageList">
                  {sentMessages.map((msg, index) => (
                    <li
                      key={msg.id}
                      className={`MessageItem ${expandedMessageIndex === index ? 'active' : ''}`}
                      onClick={() => toggleMessage(index)}
                    >
                      <div className="MessageHeader">
                        <span>To: {msg.recipient}</span>
                        <span className="MessageDate">
                          {new Date(msg.timestamp.toDate()).toLocaleString()}
                        </span>
                      </div>
                      <div className="MessageDetails">
                        {msg.text.slice(0, 50)}{msg.text.length > 50 ? '...' : ''}
                      </div>
                      <div className="MessageContent">
                        {expandedMessageIndex === index && msg.text}
                      </div>
                      <button
                        className={`status-toggle ${msg.status}`}
                        onClick={() => handleStatusToggle(msg.id, msg.status)}
                      >
                        {msg.status}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default InboxComponent;
