import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import AlbumPage from './pages/album';
import MusicProvider from './context';







function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'album/:id',
      element: <AlbumPage />
    }
  ]);




  return (
    <MusicProvider>
      <RouterProvider router={router} />
    </MusicProvider>
  );
}

export default App;
