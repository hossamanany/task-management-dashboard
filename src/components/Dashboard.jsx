import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Button,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import { deleteTask, updateTaskStatus } from "../store/taskSlice";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SyncIcon from "@mui/icons-material/Sync";

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority
      ? task.priority === filterPriority
      : true;
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const newStatus = destination.droppableId;
    dispatch(updateTaskStatus({ id: draggableId, status: newStatus }));
  };

  const taskLists = {
    todo: filteredTasks.filter((task) => task.status === "todo"),
    inProgress: filteredTasks.filter((task) => task.status === "inProgress"),
    done: filteredTasks.filter((task) => task.status === "done"),
  };

  const columnColors = {
    todo: "lightblue",
    inProgress: "lightgreen",
    done: "lightcoral",
  };

  const statusIcons = {
    todo: <MoreHorizIcon />,
    inProgress: <SyncIcon />,
    done: <CheckCircleIcon />,
  };

  const titleBackgroundColors = {
    todo: "blue.700",
    inProgress: "green.700",
    done: "red.700",
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Task Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <TextField
          label="Search tasks"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mt: { xs: 2, md: 0 },
          }}
        >
          <TextField
            label="Filter by Priority"
            variant="outlined"
            select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            label="Filter by Status"
            variant="outlined"
            select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>
        </Box>
        <Button
          component={Link}
          to="/add"
          variant="contained"
          color="primary"
          sx={{ mt: { xs: 2, md: 0 } }}
        >
          Add Task
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 2,
            width: "100%",
          }}
        >
          {Object.entries(taskLists).map(([status, tasks]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    width: { xs: "100%", md: "30%" },
                    minHeight: "300px",
                    bgcolor: columnColors[status],
                    p: 2,
                    borderRadius: 2,
                    mb: { xs: 2, md: 0 },
                    boxShadow: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: titleBackgroundColors[status],
                      padding: "8px",
                      borderRadius: "4px",
                      color: "white",
                      mb: 2,
                      width: "100%",
                      height: "48px",
                    }}
                  >
                    {statusIcons[status]}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Typography>
                  </Box>
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            mb: 2,
                            borderRadius: 2,
                            boxShadow: snapshot.isDragging ? 6 : 4,
                            backgroundColor: snapshot.isDragging
                              ? "grey.100"
                              : "background.paper",
                            cursor: "pointer",
                            width: "100%",
                            transition: "box-shadow 0.3s, background-color 0.3s",
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="h6"
                                component={Link}
                                to={`/details/${task.id}`}
                                sx={{
                                  textDecoration: "none",
                                  color: "text.primary",
                                  "&:hover": {
                                    textDecoration: "underline",
                                  },
                                }}
                              >
                                {task.title}
                              </Typography>
                              <Tooltip
                                title={`Priority: ${
                                  task.priority.charAt(0).toUpperCase() +
                                  task.priority.slice(1)
                                }`}
                              >
                                <Box>
                                  {task.priority === "high" && (
                                    <PriorityHighIcon color="error" />
                                  )}
                                  {task.priority === "medium" && (
                                    <PriorityHighIcon color="warning" />
                                  )}
                                  {task.priority === "low" && (
                                    <PriorityHighIcon color="success" />
                                  )}
                                </Box>
                              </Tooltip>
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {task.description}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                                color: "text.secondary",
                              }}
                            >
                              <ScheduleIcon
                                fontSize="small"
                                sx={{ mr: 0.5, color: "text.secondary" }}
                              />
                              <Typography variant="body2">
                                {task.dueDate}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              {task.status === "todo" && (
                                <RadioButtonUncheckedIcon
                                  color="action"
                                  sx={{ mr: 0.5 }}
                                />
                              )}
                              {task.status === "inProgress" && (
                                <HourglassEmptyIcon
                                  color="warning"
                                  sx={{ mr: 0.5 }}
                                />
                              )}
                              {task.status === "done" && (
                                <TaskAltIcon color="success" sx={{ mr: 0.5 }} />
                              )}
                              <Typography variant="body2">
                                {task.status.charAt(0).toUpperCase() +
                                  task.status.slice(1)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                component={Link}
                                to={`/edit/${task.id}`}
                                variant="outlined"
                                size="small"
                                sx={{
                                  flex: 1,
                                  borderColor: "primary.main",
                                  color: "primary.main",
                                  "&:hover": {
                                    backgroundColor: "action.hover",
                                  },
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => dispatch(deleteTask(task.id))}
                                variant="outlined"
                                color="error"
                                size="small"
                                sx={{
                                  flex: 1,
                                  borderColor: "error.main",
                                  color: "error.main",
                                  "&:hover": {
                                    backgroundColor: "error.light",
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default Dashboard;
