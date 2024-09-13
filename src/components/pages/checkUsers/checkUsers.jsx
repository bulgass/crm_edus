import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../../providers/authProvider/authProvider';
import "./checkUsers.css";

const CheckUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userRole } = useAuth(); 

  useEffect(() => {
    const fetchUsers = async () => {
      if (userRole !== 'admin') {
        console.error('Access denied: User is not an admin.');
        setLoading(false);
        return;
      }

      try {
        const usersCollectionRef = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollectionRef);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log('Loaded users:', userList);

        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username || 'No username'}</td>
                <td>{user.email || 'No email'}</td>
                <td>{user.role || 'No role'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckUsers;
