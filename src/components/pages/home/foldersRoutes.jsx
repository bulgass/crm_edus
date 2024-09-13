import React from 'react';
import { Route, Routes } from 'react-router-dom';
import B1Page from './folders/B1/B1Page';
import F1Page from './folders/F1/F1Page';
import ClientDBPage from './folders/ClientDB/ClientDBPage';
import GreenCardPage from './folders/GreenCard/GreenCardPage';
import InterviewPage from './folders/Interview/InterviewPage';
import WorkMaterialsPage from './folders/WorkMaterials/WorkMaterialsPage';

const FoldersRoutes = () => {
  return (
    <Routes>
      <Route path="b1" element={<B1Page />} />
      <Route path="f1" element={<F1Page />} />
      <Route path="clientdb" element={<ClientDBPage />} />
      <Route path="greencard" element={<GreenCardPage />} />
      <Route path="interview" element={<InterviewPage />} />
      <Route path="workmaterials" element={<WorkMaterialsPage />} />
    </Routes>
  );
};

export default FoldersRoutes;
