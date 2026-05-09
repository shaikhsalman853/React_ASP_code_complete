import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
const apiUrl = import.meta.env.VITE_API_URL;
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  try {
    setLoading(true);

    const response = await axios.post(
      `${apiUrl}account/login`,
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );

    const responseData = response.data;

    if (responseData.isSuccess) {
      alert(responseData.message);
sessionStorage.setItem('loginInfo',JSON.stringify(responseData))
navigate('/bookPage')
    } else {
      alert(responseData.message);
    }

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Login failed"
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
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: "28px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
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
            Welcome Back
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#6c757d",
              mb: 4,
            }}
          >
            Login to continue
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mb: 2,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                mb: 3,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
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
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;