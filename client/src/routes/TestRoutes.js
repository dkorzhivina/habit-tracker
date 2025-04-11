import { Routes, Route } from 'react-router-dom';
import DesignTestPage from '../pages/DesignTestPage';

const TestRoutes = () => {
  return (
    <Routes>
      <Route path="/design-test" element={<DesignTestPage />} />
    </Routes>
  );
};

export default TestRoutes;
