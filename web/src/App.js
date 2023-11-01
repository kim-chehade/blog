import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Create from "./components/Create";
import Blog from "./components/Blog";
import Home from "./components/Home";
import Header from "./components/Header";
import "./style.scss";


function Dashboard(){
  return(
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/post/:id",
        element: <Blog/>,
      },
      {
        path: "/create",
        element: <Create/>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },

]);

function App() {
  return (
    <div className="app">
      <div className="container">
    <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
