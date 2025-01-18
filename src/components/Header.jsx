import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";

const Header = ({ toggleDarkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/add">
          Add Task
        </Button>
        <FormControlLabel
          control={<Switch onChange={toggleDarkMode} color="default" />}
          label="Dark Mode"
        />
      </Toolbar>
    </AppBar>
  );
};
Header.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Header;
