import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import GeradorSenhas from './pages/GeradorSenhas/GeradorSenhas';
import BibliotecaLista from './pages/BibliotecaLista/BibliotecaLista';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './layout/RootLayout';
import User from './pages/User/User';
import Equipament from './pages/Equipament/Equipament';
import loadEquipament from './loaders/EquipamentsLoader';
import EquipamentBoundary from './error-boundaries/EquipamentBoundary';

const router = createBrowserRouter(
  [
      {
          path: "/",
          element: <Login/>,
      },
      {
        path: "/main",
        element: <RootLayout/>,
        children: [
            {   
                index: true,
                element: <Main/>
            },
            {
                path: 'user', 
                element: <User/>,      
            },
            {
                path: 'user/:userId', 
                element: <User/>,      
            },
            {
                path: 'equipament/:equipamentId', 
                element: <Equipament/>,      
                loader: loadEquipament, //acess params,request,context?  
                errorElement: <EquipamentBoundary/>  
            },
            {
                path: 'geradorsenhas',
                element: <GeradorSenhas/>               
            },
            {
                path: 'bibliotecalista',
                element: <BibliotecaLista/>               
            }
        ]
    },
      
  ]
)

export default router;
export { router };