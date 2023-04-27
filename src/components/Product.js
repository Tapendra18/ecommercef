import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

const Product = () => {
  const [value, setValue] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState("");
  const [items, setItem] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = async (e) => {
    setSelectedValue(e.target.value);
    const filterData = value.filter((item) => {
      return item.category?.toLowerCase() === e.target.value?.toLowerCase();
    });
    setFilteredResults(filterData);
  };

  const categoryGet = async () => {
    await axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  };

  const getData = async () => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => setValue(res.data.products))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    categoryGet();
  }, []);

  const Handlesearch = async (searchvalue) => {
    setSearch(searchvalue);
    const filterData = value.filter((item) => {
      return Object.values(item.title)
        .join("")
        .toLowerCase()
        .includes(searchvalue);
    });
    setFilteredResults(filterData);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} marginTop={1}>
        <TextField
          name="category"
          placeholder="search"
          sx={{ minWidth: "300px" }}
          onChange={(e) => Handlesearch(e.target.value)}
        />
        <Box sx={{ minWidth: 250, marginLeft: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">category</InputLabel>
            <Select
              value={selectedValue}
              label="category"
              // placeholder="select Category"
              onChange={handleChange}
            >
              <MenuItem disabled>select category</MenuItem>
              {items?.map((value) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={5}>
        {search?.length > 1 || selectedValue !== ""
          ? filteredResults?.map((value, index) => {
              return (
                <Grid key={index} item md={3} marginLeft={10}>
                  <Card sx={{ marginTop: "10px", width: "350px" }}>
                    <img
                      src={value?.thumbnail}
                      alt={value?.title}
                      width={350}
                      height={300}
                      style={{ borderRadius: "10px" }}
                    />
                    <Box>
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
                      {/* <Typography
                        sx={{ marginLeft: "45px", marginBottom: "30px" }}
                        variant="body2"
                      >
                        {item.title}
                      </Typography> */}
                      <Link
                        style={{
                          textDecoration: "none",
                          marginLeft: "45px",
                          color: "black",
                        }}
                        to={`/productdetail/${value?.id}`}
                      >
                        {value?.title}
                      </Link>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-around"}
                      marginTop={5}
                    >
                      <Typography sx={{ fontWeight: "600" }}>
                        ₹{value?.price}-{value?.discountPercentage}(%)
                      </Typography>
                      <Typography sx={{ display: "flex" }}>
                        {" "}
                        <StarIcon sx={{ marginRight: "5px" }} /> {value?.rating}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              );
            })
          : value?.map((item, index) => (
              <Grid key={index} item md={3} marginLeft={10}>
                <Card sx={{ marginTop: "10px", width: "350px" }}>
                  <img
                    src={item?.thumbnail}
                    alt={item?.title}
                    width={350}
                    height={300}
                    style={{ borderRadius: "10px" }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        marginLeft: "45px",
                        fontWeight: "600",
                        marginBottom: "5px",
                      }}
                      variant="body1"
                    >
                      {item?.brand}
                    </Typography>
                    {/* <Typography
                sx={{ marginLeft: "45px", marginBottom: "30px" }}
                variant="body2"
              >
                {item.title}
              </Typography> */}
                    <Link
                      style={{
                        textDecoration: "none",
                        marginLeft: "45px",
                        color: "black",
                      }}
                      to={`/productdetail/${item?.id}`}
                    >
                      {item?.title}
                    </Link>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    marginTop={5}
                  >
                    <Typography sx={{ fontWeight: "600" }}>
                      ₹{item?.price}-{item?.discountPercentage}(%)
                    </Typography>
                    <Typography sx={{ display: "flex" }}>
                      {" "}
                      <StarIcon sx={{ marginRight: "5px" }} /> {item?.rating}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Product;
