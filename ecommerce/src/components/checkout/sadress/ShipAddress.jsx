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

function ShipAddress( {formData , setFormData}) {
 /* const dispatch = useDispatch();
  const [inputValues, setInputValues] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });*/

  const moveToNext = () => {
    console.log("Button clicked, checking form validation...");
    const { Fullname, phone, address, city, state, zip, country } = formData;
    if (Fullname && phone && address && city && state && zip && country) {
      toast.success("Go to payment details");
      navigate("/checkout/paymentdetails");
    } else {
        toast.error("Please fill all the fields");
    }
  };
/*
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
  */const navigate = useNavigate("");
  return (
    <>
      <ToastContainer />
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
           // id="firstName"
            //name="firstName"
            value={formData.Fullname}
            type="name"
            placeholder="John"
            autoComplete="first name"
            onChange={(e) => setFormData({...formData , Fullname:e.target.value})}
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Phone
          </FormLabel>
          <OutlinedInput
           //  id="lastName"
            //name="lastName"
            value={formData.phone}
            type="Number"
            placeholder="Phone"
            autoComplete="last name"
            onChange={(e) => setFormData({...formData , phone:e.target.value})}
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
            value={formData.address}
            type="address"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            onChange={(e) => setFormData({...formData , address:e.target.value})}
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
            value={formData.city}
            type="city"
            placeholder="New York"
            autoComplete="City"
            onChange={(e) => setFormData({...formData , city:e.target.value})}
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
            value={formData.state}
            type="state"
            placeholder="NY"
            autoComplete="State"
            onChange={(e) => setFormData({...formData , state:e.target.value})}
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
            value={formData.zip}
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            onChange={(e) => setFormData({...formData , zip:e.target.value})}
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
            value={formData.country}
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            onChange={(e) => setFormData({...formData , country:e.target.value})}
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
       
      </div>
    </>
  );
}

export default ShipAddress;
