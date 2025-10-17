import { Route, Routes } from 'react-router-dom';
import LeadsPage from './pages/LeadsPage.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LeadsPage />} />
    </Routes>
  );
};

export default App;
