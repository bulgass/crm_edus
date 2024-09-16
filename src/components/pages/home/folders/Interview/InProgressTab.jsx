import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import Loader from '../../../../submodules/Loader/loader';

const InProgressTab = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const inProgressCollectionRef = collection(db, 'clients/Interview/InProgress');
        const querySnapshot = await getDocs(inProgressCollectionRef);
        const clientsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClients(clientsList);
      } catch (error) {
        console.error('Error fetching clients: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const moveToDone = async (client) => {
    try {
      const inProgressDocRef = doc(db, 'clients/Interview/InProgress', client.id);
      const doneDocRef = doc(db, 'clients/Interview/Done', client.id);


      const clientSnapshot = await getDoc(inProgressDocRef);
      if (!clientSnapshot.exists()) {
        console.error('Client not found in InProgress');
        return;
      }

      await setDoc(doneDocRef, clientSnapshot.data());

      await deleteDoc(inProgressDocRef);

      setClients(prevClients => prevClients.filter(c => c.id !== client.id));
    } catch (error) {
      console.error('Error moving client to Done: ', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

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
