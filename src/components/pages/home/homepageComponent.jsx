import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import Loader from "../../submodules/Loader/loader";

const HomepageComponent = () => {
  const [folders, setFolders] = useState({
    B1: [],
    F1: [],
    ClientDB: [],
    GreenCard: [],
    Interview: [],
    WorkMaterials: []
  });

  useEffect(() => {
    const fetchFolders = async () => {
      const foldersCollection = collection(db, 'folders');
      const foldersSnapshot = await getDocs(foldersCollection);
      const foldersData = foldersSnapshot.docs.map(doc => doc.data());
      setFolders(foldersData);
    };

    fetchFolders();
  }, []);

  if (loading) {
    return <Loader/>;
  }
  
  return (
    <div>
      {/* Логика для отображения данных папок или управления ими */}
    </div>
  );
};

export default HomepageComponent;
