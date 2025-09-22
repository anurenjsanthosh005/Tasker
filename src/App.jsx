import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import Completed from "./pages/Completed";
import Deleted from "./pages/Deleted";
import ErrorPage from "./pages/ErrorPage";
import Tasks from "./pages/Tasks";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Tasks />} /> 
            <Route path="completed" element={<Completed />} />
            <Route path="deleted" element={<Deleted />} />
          </Route>
          <Route element={<SimpleLayout />}>
            {/* <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
