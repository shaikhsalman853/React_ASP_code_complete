/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { useEffect, useState } from "react";
import axios from "axios";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";
import AddBookModal from "./AddBookModal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const BooksPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const loginInfo = JSON.parse(
    sessionStorage.getItem("loginInfo")
  );
const navigate = useNavigate();
  useEffect(() => {
    getBooks();
  }, []);
  const handleOpenModal = () => {
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
};
  const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );
  if (confirmLogout) {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  }
};

  const getBooks = async () => {
    try {
      setLoading(true);

      const token = loginInfo?.token;

      const response = await axios.get(
        `${apiUrl}books`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          withCredentials: true,
        }
      );

      setBooks(response.data);

    } catch (error) {
      console.error(
        "Books API Error:",
        error.response?.data || error.message
      );

    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );
  if (!confirmDelete) return;
  try {
    const token = loginInfo?.token;
    await axios.delete(
      `${apiUrl}books/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    alert("Book deleted successfully");
    // Refresh latest books list
    getBooks();
  } catch (error) {
    console.error(
      "Delete Book Error:",
      error.response?.data || error.message
    );
    alert(
      error.response?.data?.message ||
      "Failed to delete book"
    );
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fbff 0%, #eef7ff 50%, #f5fcff 100%)",

        py: 5,
      }}
    >
      <Container maxWidth="lg">

        {/* Header */}

       <Box
  sx={{
    mb: 5,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    flexWrap: "wrap",
    gap: 2,
  }}
>

  {/* Left Side */}

  <Box>
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        color: "#1b4965",
        mb: 1,
      }}
    >
      Welcome, {loginInfo?.username}
    </Typography>

    <Typography
      sx={{
        color: "#6c757d",
        fontSize: "1rem",
      }}
    >
      Explore your books collection
    </Typography>
  </Box>

  {/* Right Side */}

  <Button
    variant="contained"
    startIcon={<LogoutRoundedIcon />}
    onClick={handleLogout}
    sx={{
      borderRadius: "14px",

      px: 3,
      py: 1.2,

      textTransform: "none",

      fontWeight: 600,

      background:
        "linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)",

      boxShadow:
        "0 8px 20px rgba(255,107,107,0.35)",

      "&:hover": {
        background:
          "linear-gradient(135deg, #fa5252 0%, #ff6b6b 100%)",
      },
    }}
  >
    Logout
  </Button>
  <Button
  variant="contained"
  startIcon={<AddRoundedIcon />}
  onClick={handleOpenModal}
  sx={{
    borderRadius: "14px",

    px: 3,
    py: 1.2,

    textTransform: "none",

    fontWeight: 600,

    background:
      "linear-gradient(135deg, #4ea8de 0%, #56cfe1 100%)",

    boxShadow:
      "0 8px 20px rgba(78,168,222,0.30)",
  }}
>
  Add Book
</Button>
</Box>
        {/* Loading */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <AddBookModal
  open={openModal}
  handleClose={handleCloseModal}
  refreshBooks={getBooks}
/>

            {books.map((book) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={book.id}
              >
                <Card
                  sx={{
                    borderRadius: "24px",

                    background:
                      "rgba(255,255,255,0.85)",

                    backdropFilter: "blur(10px)",

                    boxShadow:
                      "0 8px 30px rgba(0,0,0,0.06)",

                    transition: "0.3s ease",

                    height: "100%",

                    "&:hover": {
                      transform: "translateY(-6px)",

                      boxShadow:
                        "0 12px 35px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,

                          borderRadius: "14px",

                          background:
                            "linear-gradient(135deg, #4ea8de 0%, #56cfe1 100%)",

                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",

                          mr: 2,
                        }}
                      >
                        <MenuBookRoundedIcon
                          sx={{
                            color: "white",
                          }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#1b4965",
                        }}
                      >
                        {book.title}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: "#6c757d",
                        mb: 3,
                        minHeight: "50px",
                      }}
                    >
                      {book.description}
                    </Typography>

                    {/* <Chip
                      label={`Book ID: ${book.id}`}
                      sx={{
                        borderRadius: "10px",

                        background:
                          "rgba(78,168,222,0.12)",

                        color: "#1b4965",

                        fontWeight: 600,
                      }}
                    /> */}
                    <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 2,
  }}
>

  <Chip
    label={`Book ID: ${book.id}`}
    sx={{
      borderRadius: "10px",

      background:
        "rgba(78,168,222,0.12)",

      color: "#1b4965",

      fontWeight: 600,
    }}
  />

  <Button
    size="small"

    startIcon={<DeleteRoundedIcon />}

    onClick={() =>
      handleDeleteBook(book.id)
    }

    sx={{
      borderRadius: "10px",

      textTransform: "none",

      fontWeight: 600,

      color: "#e63946",

      "&:hover": {
        background:
          "rgba(230,57,70,0.08)",
      },
    }}
  >
    Delete
  </Button>

</Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default BooksPage;