import React from 'react';
import Layout from './components/Layout';

const Home = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
