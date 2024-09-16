import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import Loader from '../../../../submodules/Loader/loader';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const mainCollections = ['B1', 'F1', 'GreenCard', 'ClientDB'];
        const clientsList = [];

        for (const mainCollection of mainCollections) {
          const inProgressRef = collection(db, `clients/${mainCollection}/Inprogress`);
          const doneRef = collection(db, `clients/${mainCollection}/Done`);

          const inProgressSnapshot = await getDocs(inProgressRef);
          inProgressSnapshot.forEach(doc => {
            clientsList.push({ id: doc.id, ...doc.data(), collection: `Inprogress (${mainCollection})` });
          });
          const doneSnapshot = await getDocs(doneRef);
          doneSnapshot.forEach(doc => {
            clientsList.push({ id: doc.id, ...doc.data(), collection: `Done (${mainCollection})` });
          });
        }

        setClients(clientsList);
      } catch (error) {
        console.error('Error fetching clients: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Clients data base</h1>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Collection</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Name</th>
            <th>Phone Number</th>
            <th>Service Type</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map(client => (
              <tr key={client.id}>
                <td>{client.collection}</td>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.middleName}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.serviceType}</td>
                <td>{client.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No clients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Client;
