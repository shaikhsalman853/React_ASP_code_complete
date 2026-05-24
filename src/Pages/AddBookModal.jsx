
import {  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";

import axios from "axios";

import { useState } from "react";

const AddBookModal = ({
  open,
  handleClose,
  refreshBooks,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleClear = () => {
    reset();
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const loginInfo = JSON.parse(
        sessionStorage.getItem("loginInfo")
      );

      const token = loginInfo?.token;

      const response = await axios.post(
        `${apiUrl}books`,
        {
          title: data.title,
          description: data.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          withCredentials: true,
        }
      );

      if (response.data) {
        alert("Book added successfully");

        handleClose();

        reset();

        // Refresh book list
        refreshBooks();
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to add book"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "24px",
          p: 1,
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1b4965",
          }}
        >
          Add New Book
        </Typography>
      </DialogTitle>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogContent>
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Book Title"
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{
                  mb: 2,

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                  },
                }}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{
              required: "Description is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label="Description"
                margin="normal"
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                  },
                }}
              />
            )}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          <Button
            onClick={handleClear}
            variant="outlined"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              px: 3,
            }}
          >
            Clear
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              px: 3,

              background:
                "linear-gradient(135deg, #4ea8de 0%, #56cfe1 100%)",

              boxShadow:
                "0 8px 20px rgba(78,168,222,0.35)",
            }}
          >
            {loading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddBookModal;