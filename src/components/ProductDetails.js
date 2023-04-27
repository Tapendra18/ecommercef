import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, Typography, Box, Button } from "@mui/material";
import Slider from "react-slick";
import InsertEmoticonTwoToneIcon from "@mui/icons-material/InsertEmoticonTwoTone";
import OfflineBoltTwoToneIcon from "@mui/icons-material/OfflineBoltTwoTone";
const ProductDetails = () => {
  var settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    fade: true,
  };
  const id = useParams().id;
  const [value, setValue] = useState();

  const getproduct = async () => {
    await axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setValue(res?.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getproduct();
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item md={3} marginLeft={30}>
        <Card
          sx={{
            marginTop: "70px",
            width: "850px",
            height: "670px",
            borderRadius: "15px",
          }}
        >
          <Box>
            <Slider {...settings}>
              {value?.images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={"value"}
                    width={"850px"}
                    height={"300"}
                  />
                </div>
              ))}
            </Slider>
            {/* <img
              src={value?.images[3]}
              alt={value?.title}
              width={370}
              height={350}
            /> */}
            <Box marginTop={6}>
              <Typography
                sx={{
                  marginLeft: "45px",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
                variant="body1"
              >
                {value?.brand}
              </Typography>
              <Typography
                sx={{ marginLeft: "45px", marginBottom: "30px" }}
                variant="body1"
              >
                {value?.title}
              </Typography>
              <Typography
                sx={{ marginLeft: "45px", marginBottom: "30px" }}
                variant="h6"
              >
                {value?.description}
              </Typography>
              <Typography
                sx={{ marginLeft: "45px", marginBottom: "10px" }}
                variant="h6"
              >
                Price={value?.price}-{value?.discountPercentage}
              </Typography>
              <Typography
                sx={{ marginLeft: "45px", marginBottom: "10px" }}
                variant="h6"
              >
                stock={value?.stock}
              </Typography>
              <Box marginTop={5} marginLeft={5}>
                <Button
                  endIcon={<OfflineBoltTwoToneIcon />}
                  sx={{
                    bgcolor: "#f4cccc",
                    border: "none",
                    outline: "none",
                    color: "#001A1A",
                    ":hover": {
                      bgcolor: "#da9b9b",
                      color: "#001A1A",
                      outline: "none",
                      border: "none",
                    },
                  }}
                  variant="outlined"
                >
                  ADD TO CART
                </Button>
                <Button
                  endIcon={<InsertEmoticonTwoToneIcon />}
                  sx={{
                    bgcolor: "#f4cccc",
                    border: "none",
                    outline: "none",
                    color: "#001A1A",

                    marginLeft: "20px",
                    ":hover": {
                      bgcolor: "#da9b9b",
                      color: "#001A1A",
                      outline: "none",
                      border: "none",
                    },
                  }}
                  variant="outlined"
                >
                  BUY NOW{" "}
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
