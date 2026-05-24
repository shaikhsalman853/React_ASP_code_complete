/* eslint-disable react-hooks/incompatible-library */
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      setSuccessMessage("");
      setErrorMessage("");

      const response = await axios.post(
        `${apiUrl}account/signup`,
        {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          confirmpassword: data.confirmpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );

      const responseData = response.data;

      if (responseData.isSuccess) {
        setSuccessMessage(
          responseData.message ||
            "Signup Successful"
        );
        reset();
        setTimeout(() => {
   navigate("/");
}, 1500);
      } else {
        alert(responseData.message)
        setErrorMessage(
          responseData.message ||
            "Signup Failed"
        );
      }

    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #f8fbff 0%, #eef7ff 50%, #f5fcff 100%)",
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: "28px",
            background:
              "rgba(255,255,255,0.95)",

            boxShadow:
              "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "#1b4965",
              mb: 1,
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#6c757d",
              mb: 4,
            }}
          >
            Signup to continue
          </Typography>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
            </Alert>
          )}

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* First Name */}

            <Controller
              name="firstname"
              control={control}
              rules={{
                required:
                  "First Name is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name"
                  margin="normal"
                  error={!!errors.firstname}
                  helperText={
                    errors.firstname?.message
                  }
                  sx={{
                    "& .MuiOutlinedInput-root":
                      {
                        borderRadius: "14px",
                      },
                  }}
                />
              )}
            />

            {/* Last Name */}

            <Controller
              name="lastname"
              control={control}
              rules={{
                required:
                  "Last Name is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  error={!!errors.lastname}
                  helperText={
                    errors.lastname?.message
                  }
                  sx={{
                    "& .MuiOutlinedInput-root":
                      {
                        borderRadius: "14px",
                      },
                  }}
                />
              )}
            />

            {/* Email */}

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  margin="normal"
                  error={!!errors.email}
                  helperText={
                    errors.email?.message
                  }
                  sx={{
                    "& .MuiOutlinedInput-root":
                      {
                        borderRadius: "14px",
                      },
                  }}
                />
              )}
            />

            {/* Password */}

            <Controller
              name="password"
              control={control}
              rules={{
                required:
                  "Password is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label="Password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={
                    errors.password?.message
                  }
                  sx={{
                    "& .MuiOutlinedInput-root":
                      {
                        borderRadius: "14px",
                      },
                  }}
                />
              )}
            />

            {/* Confirm Password */}

            <Controller
              name="confirmpassword"
              control={control}
              rules={{
                required:
                  "Confirm Password is required",

                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  margin="normal"
                  error={
                    !!errors.confirmpassword
                  }
                  helperText={
                    errors.confirmpassword
                      ?.message
                  }
                  sx={{
                    mb: 3,

                    "& .MuiOutlinedInput-root":
                      {
                        borderRadius: "14px",
                      },
                  }}
                />
              )}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: "14px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,

                background:
                  "linear-gradient(135deg, #4ea8de 0%, #56cfe1 100%)",

                boxShadow:
                  "0 8px 20px rgba(78,168,222,0.35)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg, #3a86c4 0%, #48b8c9 100%)",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Sign Up"
              )}
            </Button>
            <Box
  sx={{
    mt: 3,
    textAlign: "center",
  }}
>
  <Typography
    variant="body1"
    sx={{
      color: "#6c757d",
      fontSize: "0.95rem",
    }}
  >
    Already have an account?
  </Typography>

  <Typography
    onClick={() => navigate("/")}
    sx={{
      mt: 1,
      display: "inline-block",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "1rem",

      background:
        "linear-gradient(135deg, #4ea8de 0%, #56cfe1 100%)",

      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",

      transition: "all 0.3s ease",

      "&:hover": {
        transform: "translateY(-2px)",
        opacity: 0.85,
      },
    }}
  >
    Login Here
  </Typography>
</Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;