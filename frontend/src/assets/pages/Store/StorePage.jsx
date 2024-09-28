import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import NavBarC from "../../components/NavBarC";
import axios from "axios";
import BackGround from "../../images/wbg.jpeg";
import BackGround1 from "../../images/3dStore.jpg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StorePage = () => {
  const [storeData, setStoreData] = useState([]);
  const [cart, setCart] = useState([]); // Cart state
  const [background, setBackground] = useState(BackGround); // Track current background

  useEffect(() => {
    // Auto switch backgrounds every 5 seconds
    const intervalId = setInterval(() => {
      setBackground((prevBackground) =>
        prevBackground === BackGround ? BackGround1 : BackGround
      );
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8077/Store");
        setStoreData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStoreData();
  }, []);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item._id === product._id); // Using _id here
      if (itemInCart) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item._id === product._id); // Using _id here
      if (itemInCart.quantity === 1) {
        return prevCart.filter((item) => item._id !== product._id);
      }
      return prevCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBarC cart={cart} /> {/* Pass cart to NavBarC to show cart items */}

      {/* Hero Section */}
      <div
        className="relative bg-center top-16 z-10 mb-20"
        style={{
          backgroundImage: `url(${background})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">
            Welcome to Our Store
          </h1>
        </div>
      </div>

      <h2 className="text-3xl text-center font-semibold mb-8">Spareparts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 mb-20">
        {storeData.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
            }}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out"
          >
            <Card
              className="bg-white"
              style={{
                fontFamily: "'Poppins', sans-serif",
                borderRadius: "15px",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                image={product.photoURL}
                alt={product.name}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  {product.Name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {product.Description}
                </Typography>
                <Typography
                  variant="h6"
                  className="font-bold mt-4"
                  style={{ color: "#6c1c1d", fontWeight: "700" }}
                >
                  ${product.Price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  fullWidth
                  style={{
                    backgroundColor: "#6c1c1d",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "600",
                    borderRadius: "8px",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => addToCart(product)} // Add to cart on button click
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#a32729")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#6c1c1d")
                  }
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-section px-8">
        <h2 className="text-3xl text-center font-semibold mb-8">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {cart.map((cartItem) => (
              <motion.div
                key={cartItem._id}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                }}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out"
              >
                <Card
                  className="bg-white"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: "15px",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={cartItem.photoURL}
                    alt={cartItem.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ fontWeight: "600" }}
                    >
                      {cartItem.Name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {cartItem.Description}
                    </Typography>
                    <Typography
                      variant="h6"
                      className="font-bold mt-4"
                      style={{ color: "#6c1c1d", fontWeight: "700" }}
                    >
                      ${cartItem.Price} x {cartItem.quantity}
                    </Typography>

                    <div className="flex justify-between items-center mt-4">
                      <IconButton
                        color="primary"
                        onClick={() => removeFromCart(cartItem)} // Decrease quantity
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2">
                        {cartItem.quantity}
                      </Typography>
                      <IconButton
                        color="primary"
                        onClick={() => addToCart(cartItem)} // Increase quantity
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2024 Your Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default StorePage;
