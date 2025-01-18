import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { addTask, updateTask } from "../store/taskSlice";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  dueDate: Yup.date().required("Due date is required"), // I can use past dates because I can add a new "Done" task
  priority: Yup.string().required("Priority is required"),
  status: Yup.string().required("Status is required"),
});

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.find((t) => t.id === id));

  // In case of editing a task, I need to initialize the form with the task data
  const initialValues = task || {
    id: "",
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "medium",
    status: "todo",
  };

  // TODO: I need to fix the navigation to task details after adding a new task
  const handleSubmit = async (values) => {
    try {
      if (id) {
        await dispatch(updateTask(values)).unwrap();
        navigate(`/tasks/${id}`);
      } else {
        const newTask = await dispatch(addTask(values)).unwrap();
        navigate(`/tasks/${newTask.id}`);
      }
    } catch (error) {
      console.error("Failed to save the task:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: { xs: "100%", sm: 600 }, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Task" : "Add Task"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="title"
              label="Title"
              fullWidth
              margin="normal"
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
            <Field
              as={TextField}
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
            <Field
              as={TextField}
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={touched.dueDate && Boolean(errors.dueDate)}
              helperText={touched.dueDate && errors.dueDate}
            />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Field
                as={TextField}
                name="priority"
                label="Priority"
                select
                fullWidth
                margin="normal"
                error={touched.priority && Boolean(errors.priority)}
                helperText={touched.priority && errors.priority}
                sx={{ flex: 1, minWidth: 120 }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Field>
              <Field
                as={TextField}
                name="status"
                label="Status"
                select
                fullWidth
                margin="normal"
                error={touched.status && Boolean(errors.status)}
                helperText={touched.status && errors.status}
                sx={{ flex: 1, minWidth: 120 }}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Field>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
            >
              {id ? "Update Task" : "Add Task"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TaskForm;
