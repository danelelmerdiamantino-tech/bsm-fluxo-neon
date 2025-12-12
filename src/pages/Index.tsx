import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { Outlet } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Index;
