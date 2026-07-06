// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <BrowserRouter>
              <AppRoutes />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
                toastClassName="!rounded-2xl !shadow-glass-lg !font-sans !text-sm"
                bodyClassName="!text-slate-700"
              />
            </BrowserRouter>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
