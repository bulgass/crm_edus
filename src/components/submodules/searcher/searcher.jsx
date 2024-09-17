import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase'; 
import './searcher.css';

const Searcher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const clientsCollection = collection(db, 'clients');
      const clientsSnapshot = await getDocs(clientsCollection);

      let allClientResults = [];
      for (const clientDoc of clientsSnapshot.docs) {
        const clientDBCollection = collection(db, `clients/${clientDoc.id}/ClientDB`);
        const q = query(
          clientDBCollection,
          where('name', '==', searchTerm)
        );

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => doc.data());
        allClientResults = [...allClientResults, ...results];
      }
      setSearchResults(allClientResults);
    } catch (error) {
      console.error('Ошибка поиска: ', error);
    }
  };

  return (
    <div>
      <form action="" className="search-bar" onSubmit={handleSearch}>
        <input
          type="search"
          name="search"
          pattern=".*\S.*"
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((client, index) => (
            <li key={index}>
              {client.name} {client.surname} - {client.city} - {client.phone}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Searcher;
