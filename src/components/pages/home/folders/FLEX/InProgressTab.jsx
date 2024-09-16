import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';

const InProgressTab = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const inProgressCollectionRef = collection(db, 'clients/Flex/InProgress');
        const querySnapshot = await getDocs(inProgressCollectionRef);
        const clientsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClients(clientsList);
      } catch (error) {
        console.error('Error fetching clients: ', error);
      }
    };

    fetchClients();
  }, []);

  const moveToDone = async (client) => {
    try {
      const inProgressDocRef = doc(db, 'clients/Flex/InProgress', client.id);
      const doneDocRef = doc(db, 'clients/Flex/Done', client.id);
      const clientSnapshot = await inProgressDocRef.get();
      if (!clientSnapshot.exists()) {
        console.error('Client not found');
        return;
      }
      await updateDoc(doneDocRef, clientSnapshot.data());

      await deleteDoc(inProgressDocRef);
      setClients(prevClients => prevClients.filter(c => c.id !== client.id));
    } catch (error) {
      console.error('Error moving client to Done: ', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Name</th>
            <th>Phone Number</th>
            <th>Service Type</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.middleName}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.serviceType}</td>
              <td>{client.city}</td>
              <td>
                <button onClick={() => moveToDone(client)}>Move to Done</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InProgressTab;
