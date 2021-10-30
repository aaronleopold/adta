import React from 'react';
import { DefaultProps } from '../@types';
import Loader from './ui/Loader';
// import Topbar from './window/Topbar';

const Layout: React.FC<DefaultProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-white dark:bg-trout-900">
      {/* <Topbar /> */}
      <main className="h-full w-full">
        <React.Suspense fallback={<Loader active />}>{children}</React.Suspense>
      </main>
    </div>
  );
};

export default Layout;
