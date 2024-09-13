import React, { useState, useEffect } from 'react';
import { db, storage } from '../../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MenuBar from '../../submodules/menuBar/menubar';
import './homepage.css';

// FolderCard Component
const FolderCard = ({ title, clients, onStatusChange }) => {
  return (
    <div className="card folder-card">
      <h3>{title}</h3>
      <ul className="client-list">
        {clients.map((client) => (
          <li key={client.id} className="client-item">
            <span>{client.name}</span>
            <button
              className={`status-button ${client.status}`}
              onClick={() => onStatusChange(client)}
            >
              {client.status === 'inprogress' ? 'Mark as Done' : 'Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// MaterialsCard Component
const MaterialsCard = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      const materialsCollection = collection(db, 'materials');
      const materialsSnapshot = await getDocs(materialsCollection);
      const materialsData = materialsSnapshot.docs.map(doc => doc.data());
      setMaterials(materialsData);
    };

    fetchMaterials();
  }, []);

  const handleFileUpload = async () => {
    if (newMaterial) {
      const storageRef = ref(storage, `materials/${newMaterial.name}`);
      await uploadBytes(storageRef, newMaterial);
      const fileUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'materials'), {
        name: newMaterial.name,
        url: fileUrl,
      });

      setNewMaterial(null);
      fetchMaterials();
    }
  };

  return (
    <div className="card materials-card">
      <h3>Materials for Work</h3>
      <input type="file" onChange={(e) => setNewMaterial(e.target.files[0])} />
      <button onClick={handleFileUpload}>Upload</button>
      <ul className="materials-list">
        {materials.map(material => (
          <li key={material.name}>
            <a href={material.url} target="_blank" rel="noopener noreferrer">
              {material.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ConsultationScriptsCard Component
const ConsultationScriptsCard = () => {
  return (
    <div className="card scripts-card">
      <h3>Consultation Scripts</h3>
      <p>Here you can manage consultation scripts.</p>
    </div>
  );
};

// ClientDatabaseCard Component
const ClientDatabaseCard = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const clientsCollection = collection(db, 'clients');
      const clientsSnapshot = await getDocs(clientsCollection);
      const clientsData = clientsSnapshot.docs.map(doc => doc.data());
      setClients(clientsData);
    };

    fetchClients();
  }, []);

  return (
    <div className="card database-card">
      <h3>Client Database</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>Service Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{client.city}</td>
              <td>{client.serviceType}</td>
              <td>{client.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// HomepageComponent
const HomepageComponent = () => {
  const [folders, setFolders] = useState({
    B1: { inprogress: [], done: [] },
    F1: { inprogress: [], done: [] },
    'Green Card': [],
    FLEX: [],
    Interview: [],
  });

  useEffect(() => {
    const fetchClients = async () => {
      const clientsCollection = collection(db, 'clients');
      const clientSnapshot = await getDocs(clientsCollection);
      const clientsData = clientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const newFolders = { ...folders };
      clientsData.forEach(client => {
        if (newFolders[client.category]) {
          if (client.status === 'inprogress') {
            newFolders[client.category].inprogress.push(client);
          } else {
            newFolders[client.category].done.push(client);
          }
        }
      });
      setFolders(newFolders);
    };

    fetchClients();
  }, []);

  const handleStatusChange = async (client) => {
    const newStatus = client.status === 'inprogress' ? 'done' : 'inprogress';
    await updateDoc(doc(db, 'clients', client.id), { status: newStatus });
    setFolders(prevState => {
      const newState = { ...prevState };
      newState[client.category][client.status] = newState[client.category][client.status].filter(c => c.id !== client.id);
      newState[client.category][newStatus].push({ ...client, status: newStatus });
      return newState;
    });
  };

  return (
    <div className="homepage">
      <MenuBar />
      <div className="content">
        <FolderCard title="B1" clients={folders.B1.inprogress.concat(folders.B1.done)} onStatusChange={handleStatusChange} />
        <FolderCard title="F1" clients={folders.F1.inprogress.concat(folders.F1.done)} onStatusChange={handleStatusChange} />
        <FolderCard title="Green Card" clients={folders['Green Card']} onStatusChange={handleStatusChange} />
        <FolderCard title="FLEX" clients={folders.FLEX} onStatusChange={handleStatusChange} />
        <FolderCard title="Interview" clients={folders.Interview} onStatusChange={handleStatusChange} />
        <MaterialsCard />
        <ConsultationScriptsCard />
        <ClientDatabaseCard />
      </div>
    </div>
  );
};

export default HomepageComponent;
