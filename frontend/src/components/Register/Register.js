import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "../Input/Input.js";
import Swal from "sweetalert2";
import { signup } from "../../actions/Register.js";
import { AUTH } from "../../constants/actionTypes";
import MuiPhoneNumber from "material-ui-phone-number";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getNumberType,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import parseMax from "libphonenumber-js/max";


const Register = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    role: 1,
  };
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paperStyle = { padding: "30px 20px", width: 600, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 20 };
  const [userRole, setUserRole] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("0");

  const handleSubmit = (e) => {
    e.preventDefault();
    form.phone = phoneNumber;
    console.log(form);
    console.log(form.password === form.confirmPassword);
    if (form.password === form.confirmPassword) {
      if (!isValidPhoneNumber(phoneNumber)) {
        Swal.fire({
          text: "That is an invalid phone number!",
          customClass: {
            container: "position-absolute",
          },
          confirmButtonColor: "#3a3b7b",
          toast: true,
          position: "top-end",
        });
      } else {
        if (userRole === 1) form.role = 2;
        else form.role = 1;

        dispatch(signup(form, navigate, form.role));
      }
    } else {
      Swal.fire({
        text: "Passwords don't match!",
        customClass: {
          container: "position-absolute",
        },
        confirmButtonColor: "#3a3b7b",
        toast: true,
        position: "top-end",
      });
    }
  };
  const onCheckedOwner = () => {
    setUserRole((prevUser) => (prevUser = 1));
  };
  const onCheckTenant = () => {
    setUserRole((prevUser) => (prevUser = 2));
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            {/* <h2 style={headerStyle}>Sign Up</h2> */}
            <Typography variant="h4">Register to Horizon</Typography>
            <Typography variant="caption" gutterBottom>
              If you already have an account, please &nbsp;
              <Link to="/Login">Login to continue</Link>
            </Typography>
          </Grid>
          <form style={{ marginTop: "10px" }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                isRequired={true}
                name="firstName"
                label="First Name"
                handleChange={handleChange}
                autoFocus
                half
              />
              <Input
                isRequired={true}
                name="lastName"
                label="Last Name"
                handleChange={handleChange}
                half
              />

              <Input
                isRequired={true}
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Grid item xs={12} sm={12}>
                <MuiPhoneNumber
                  variant="outlined"
                  name="phone"
                  fullWidth
                  required
                  label="phone"
                  defaultCountry={"ru"}
                  onChange={(c, t) => {
                    console.log(c, t);
                    setPhoneNumber(c);
                    return true;
                  }}
                />
              </Grid>

              <Input
                isRequired={true}
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              <Input
                isRequired={true}
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />

              <FormControl
                component="fieldset"
                style={{ marginLeft: "10px", marginTop: "10px" }}
              >
                <FormLabel component="legend">
                  {userRole == 0
                    ? "Choose your role"
                    : userRole == 1
                    ? "I am a Hotel Owner"
                    : "I am a Tenant"}{" "}
                </FormLabel>
                <RadioGroup
                  defaultValue="Hotel Owner"
                  onChange={handleChange}
                  aria-label="userType"
                  name="userType"
                  style={{ display: "initial" }}
                >
                  <FormControlLabel
                    onClick={onCheckedOwner}
                    value="Hotel Owner"
                    control={<Radio style={{ color: "#3a3b7b" }} />}
                    label="Hotel Owner"
                  />
                  <FormControlLabel
                    onClick={onCheckTenant}
                    value="Tenant"
                    control={<Radio style={{ color: "#3a3b7b" }} />}
                    label="Tenant"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Button
              style={{ marginTop: "20px", backgroundColor: "#3a3b7b" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
