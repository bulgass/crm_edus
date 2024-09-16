import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';

const DoneTab = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const doneCollectionRef = collection(db, 'clients/B1/Done');
        const querySnapshot = await getDocs(doneCollectionRef);
        const clientsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClients(clientsList);
      } catch (error) {
        console.error('Error fetching clients: ', error);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (clientId) => {
    try {
      const clientDocRef = doc(db, 'clients/B1/Done', clientId);
      await deleteDoc(clientDocRef);
      setClients(prevClients => prevClients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error('Error deleting client: ', error);
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
                <button onClick={() => handleDelete(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoneTab;
