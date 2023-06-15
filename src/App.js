import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SideDrawer from "./components/SideDrawer";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const AuthContext = React.createContext();

const initialState = {
  user: null,
  isConnected: false,
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [authDetails, setAuth] = React.useState(initialState);

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthContext.Provider value={{ authDetails, setAuth }}>
            <CssBaseline />
            <Box display="flex">
              <SideDrawer />
              <Box sx={{ flexGrow: 1, p: 3 }}>
                <Router />
              </Box>
            </Box>
          </AuthContext.Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
