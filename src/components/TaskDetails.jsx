import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material";

const TaskDetails = () => {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.find((t) => t.id === id));
  const theme = useTheme();

  if (!task) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Task not found.</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        margin: "0 auto",
        width: "90%",
        bgcolor:
          theme.palette.mode === "dark" ? "grey.800" : "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "text.primary" }}>
        {task.title}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: "text.primary" }}>
        {task.description}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Due Date:</strong> {task.dueDate}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Priority:</strong>{" "}
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Status:</strong>{" "}
        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Back to Dashboard
        </Button>
        <Button
          component={Link}
          to={`/edit/${task.id}`}
          variant="outlined"
          color="secondary"
          sx={{
            borderColor: "secondary.main",
            color: "secondary.main",
            "&:hover": {
              backgroundColor: "secondary.light",
            },
          }}
        >
          Edit Task
        </Button>
      </Box>
    </Box>
  );
};

export default TaskDetails;
