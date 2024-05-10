import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkOutShippingData } from "../../../redux/CheckOutRedux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));
function ShipAddress() {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const moveToNext = () => {
    console.log("Button clicked, checking form validation...");
    const { firstName, lastName, address, city, state, zip, country } =
      inputValues;
    if (firstName && lastName && address && city && state && zip && country) {
      toast.success("go to payment details");
      navigate("/checkout/paymentdetails");
    } else {
      toast.error("please fill all the fields");
    }
  };

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInputValues({ ...inputValues, [name]: value });
  };
  useEffect(() => {
    const { firstName, lastName, address } = inputValues;
    dispatch(checkOutShippingData(firstName, lastName, address));
  }, [inputValues, dispatch]);
  const navigate = useNavigate("");
  return (
    <>
      <ToastContainer />
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="firstName"
            name="firstName"
            value={inputValues.firstName}
            type="name"
            placeholder="John"
            autoComplete="first name"
            onChange={handleChange}
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="lastName"
            name="lastName"
            value={inputValues.lastName}
            type="last-name"
            placeholder="Snow"
            autoComplete="last name"
            onChange={handleChange}
            required
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address1" required>
            Address
          </FormLabel>
          <OutlinedInput
            id="address"
            name="address"
            value={inputValues.address}
            type="address"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            onChange={handleChange}
            required
          />
        </FormGrid>

        <FormGrid item xs={6}>
          <FormLabel htmlFor="city" required>
            City
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            value={inputValues.city}
            type="city"
            placeholder="New York"
            autoComplete="City"
            onChange={handleChange}
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="state" required>
            State
          </FormLabel>
          <OutlinedInput
            id="state"
            name="state"
            value={inputValues.state}
            type="state"
            placeholder="NY"
            autoComplete="State"
            onChange={handleChange}
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="zip" required>
            Zip / Postal code
          </FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            value={inputValues.zip}
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            onChange={handleChange}
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
            Country
          </FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            value={inputValues.country}
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            onChange={handleChange}
            required
          />
        </FormGrid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px 10px", // Adjust as needed
        }}
      >
        <Button
          type="button"
          onClick={moveToNext}
          sx={{
            width: "fit-content",
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#0056b3", // Change background color on hover
            },
          }}
        >
          NEXT
        </Button>
      </div>
    </>
  );
}

export default ShipAddress;
