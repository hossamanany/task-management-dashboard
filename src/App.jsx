import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { fetchTasks } from "./store/taskSlice";
import Dashboard from "./components/Dashboard.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Header from "./components/Header.jsx";
import TaskDetails from "./components/TaskDetails";

const App = () => {
  const [mode, setMode] = useState("light");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header
            toggleDarkMode={() => setMode(mode === "light" ? "dark" : "light")}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="/details/:id" element={<TaskDetails />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
