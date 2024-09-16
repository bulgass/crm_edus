import React from 'react';
import { Route, Routes } from 'react-router-dom';
import B1Page from './folders/B1/b1';
import F1Page from './folders/F1/f1';
import ClientDBPage from './folders/ClientDB/client';
import GreenCardPage from './folders/GreenCard/greencard';
import InterviewPage from './folders/Interview/interview';
import WorkMaterialsPage from './folders/Workmaterials/workmaterials';
import FlexPage from './folders/FLEX/flex';

const FoldersRoutes = () => {
  return (
    <Routes>
      <Route path="b1" element={<B1Page />} />
      <Route path="f1" element={<F1Page />} />
      <Route path="clientdb" element={<ClientDBPage />} />
      <Route path="greencard" element={<GreenCardPage />} />
      <Route path="interview" element={<InterviewPage />} />
      <Route path="flex" element={<FlexPage/>} />
      <Route path="workmaterials" element={<WorkMaterialsPage />} />
    </Routes>
  );
};

export default FoldersRoutes;
