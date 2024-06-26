import React, { useState } from "react";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DefaultMessage from "../../DefaultMessage/DefaultMessage";
import * as api from "../../../api/index";
import useStyles from "./styles";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


function MealsheetForm() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [checked, setChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [prices, setPrices] = useState([55, 160, 80, 75, 45, 200, 35]);
  const [items, setItems] = useState([
    "Chicken",
    "Beef",
    "Rui Fish",
    "Katol Fish",
    "Vegetable",
    "Mutton",
    "Egg",
  ]);
  const [vals, setVals] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const generateSheet = async () => {
    console.log(checked);
    const { data } = await api.getHotelByOwnerId(user?.result?._id);
    console.log(data.has_meal_system);
    if (data.has_meal_system) {
      const valsData = await api.getMealItemsByHotel(data._id);
      setVals(valsData.data);
      for (let i = 0; i < valsData.data.length; i++) {
        console.log(valsData.data[i]);
        await api.deleteMealItem(valsData.data[i]._id);
      }
    }
    let x = 0;
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        x++;
        const curForm = {
          name: items[i],
          hotel_id: data._id,
          hotel_name: data.name,
          unit_price: prices[i],
        };
        await api.createMealItem(curForm);
      }
    }
    if (x === 0) {
      Swal.fire({
        title: "At least one item required",
        icon: "error",
      });
    } else {
      await api.updateHotel(data._id, { has_meal_system: true });
      Swal.fire({
        title: `successfully added ${x} items into your meal system`,
        icon: "success",
      }).then(() => {
        window.location.reload(false);
      });
    }

    //First for loop into the mealItemmaking hehe
    //Then update the hotel so that its has_meal_system is true
  };
  const handleChange1 = (event) => {
    const newChecked = [...checked];
    console.log(checked);
    for (let i = 0; i < checked.length; i++) {
      newChecked[i] = event.target.checked;
    }
    setChecked(newChecked);
  };

  const handleChange3 = (event, id) => {
    //console.log(id)
    const newChecked = [...checked];
    newChecked[id] = event.target.checked;
    setChecked(newChecked);
    // setChecked([...checked, checked[id]=event.target.checked]);
  };
  const children = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: 3,
        marginLeft: "50px",
      }}
    >
      <Card className={classes.checkBox}>
        <Typography className={classes.prices}>Price:{prices[0]}c</Typography>
        <FormControlLabel
          className={classes.checkBoxItem}
          label={items[0]}
          control={
            <Checkbox
              style={{ color: "#3a3b7b" }}
              checked={checked[0]}
              onChange={(event) => handleChange3(event, 0)}
            />
          }
        />
      </Card>

      <Card className={classes.checkBox}>
        <Typography className={classes.prices}>Price:{prices[1]}c</Typography>
        <FormControlLabel
          className={classes.checkBoxItem}
          label={items[1]}
          control={
            <Checkbox
              style={{ color: "#3a3b7b" }}
              checked={checked[1]}
              onChange={(event) => handleChange3(event, 1)}
            />
          }
        />
      </Card>

      <Card className={classes.checkBox}>
        <Typography className={classes.prices}>Price:{prices[2]}c</Typography>
        <FormControlLabel
          className={classes.checkBoxItem}
          label={items[2]}
          control={
            <Checkbox
              style={{ color: "#3a3b7b" }}
              checked={checked[2]}
              onChange={(event) => handleChange3(event, 2)}
            />
          }
        />
      </Card>

      <Card className={classes.checkBox}>
        <Typography className={classes.prices}>Price:{prices[3]}c</Typography>
        <FormControlLabel
          className={classes.checkBoxItem}
          label={items[3]}
          control={
            <Checkbox
              style={{ color: "#3a3b7b" }}
              checked={checked[3]}
              onChange={(event) => handleChange3(event, 3)}
            />
          }
        />
      </Card>

      <Card className={classes.checkBox}>
        <Typography className={classes.prices}>Price:{prices[4]}c</Typography>
        <FormControlLabel
          className={classes.checkBoxItem}
          label={items[4]}
          control={
            <Checkbox
              style={{ color: "#3a3b7b" }}
              checked={checked[4]}
              onChange={(event) => handleChange3(event, 4)}
            />
          }
        />
      </Card>

      <Card className={classes.checkBox}>
        <Typography className={classes.prices}>Price:{prices[5]}c</Typography>
        <FormControlLabel
          className={classes.checkBoxItem}
          label={items[5]}
          control={
            <Checkbox
              style={{ color: "#3a3b7b" }}
              checked={checked[5]}
              onChange={(event) => handleChange3(event, 5)}
            />
          }
        />
      </Card>
      <Card className={classes.checkBox}>
        <Typography className={classes.prices}>Price:{prices[6]}c</Typography>
        <FormControlLabel
          className={classes.checkBoxItem}
          label={items[6]}
          control={
            <Checkbox
              style={{ color: "#3a3b7b" }}
              checked={checked[6]}
              onChange={(event) => handleChange3(event, 6)}
            />
          }
        />
      </Card>
    </Box>
  );
  return (
    <div>
      <Grid>
        <DefaultMessage message="Select the food options for your mealsystem" />
        <FormControlLabel
          label="Select all"
          control={
            <Checkbox
              style={{ color: "#3a3b7b" }}
              checked={checked[0] && checked[1]}
              indeterminate={checked[0] !== checked[1]}
              onChange={handleChange1}
            />
          }
        />
        {children}
      </Grid>
      <Button
        onClick={generateSheet}
        style={{
          color: "white",
          backgroundColor: "#3a3b7b",
          marginLeft: "55px",
          marginTop: "10px",
        }}
      >
        Generate sheet
      </Button>
    </div>
  );
}

export default MealsheetForm;
