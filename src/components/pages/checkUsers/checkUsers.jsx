import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../../providers/authProvider/authProvider';

const CheckUsers = () => {
  console.log('CheckUsers component rendered');
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (currentUser && currentUser.role === 'admin') {
          const usersCollectionRef = collection(db, 'users');
          const userSnapshot = await getDocs(usersCollectionRef);
          const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(userList);
        } else {
          console.error('Access denied: User is not an admin.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Registered Users</h2>
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
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckUsers;
