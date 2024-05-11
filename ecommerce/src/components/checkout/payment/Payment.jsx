import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

// Import Stepper component

function Payment  ( {formData , setFormData})  {

 // console.log(formData)
  const navigate = useNavigate();
/*  const [paymentInputValues, setPaymentInputValues] = React.useState({
    cardNumber: Number,
    cvv: Number,
    nameOfCard: "",
    expirationDate: Number,
  });

  let name, value;

  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    if (name === "cardNumber" && value.length > 16) {
      value = value.slice(0, 16);
    }
    setPaymentInputValues({ ...paymentInputValues, [name]: value });
  };

  const goToPlaceOrder = () => {
    const { cardNumber, cvv, nameOfCard, expirationDate } = paymentInputValues;

    // Validation: Check if card number has exactly 16 characters
    if (cardNumber.toString().length !== 16) {
      toast.error("Invalid card number. Please enter 16 digits.");
    } else if (cardNumber && cvv && nameOfCard && expirationDate) {
      toast.success("Go to review order");
      navigate("/checkout/revieworder");
    } else {
      toast.error("Please fill all the fields");
    }
  };*/

  const goBack = () => {
    navigate("/checkout");
  };
  

  // Define steps array
  const steps = ["Shipping address", "Payment details", "Review your order"];

  return (
    <>
      <ToastContainer />
      {/* Display steps array using Stepper component */}
     
      <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            aria-label="Payment options"
            name="paymentType"
            sx={{
              flexDirection: { sm: "column", md: "row" },
              gap: 2,
            }}
          ></RadioGroup>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              margin: "0px 5 px",
              marginLeft: "1%",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: "90%",
              borderRadius: "20px",
              border: "1px solid ",
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle2">Payment Method</Typography>
              <CreditCardRoundedIcon sx={{ color: "text.secondary" }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: "rotate(90deg)",
                color: "text.secondary",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Card number
                </FormLabel>
                <OutlinedInput
               //   id="card-number"
                  autoComplete="card-number"
                 // name="cardNumber"
                  value={formData.CardNum}
                  placeholder="0000 0000 0000 0000"
                  onChange={(e) => setFormData({...formData , CardNum:e.target.value})}
                  maxLength={16}
                  required

                />
              </FormGrid>

              <FormGrid sx={{ maxWidth: "20%" }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
               //   id="cvv"
                  autoComplete="CVV"
                 // name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData , cvv:e.target.value})}
                  required
                  />
              </FormGrid>
            </Box>


            <Box sx={{ display: "flex", gap: 2 }}>
             
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                 // id="card-expiration"
                  autoComplete="card-expiration"
                  //name="expirationDate"
                  value={formData.dateEx}
                  placeholder="YYYY-MM-DD"
                  type="date"
                  onChange={(e) => setFormData({...formData , dateEx:e.target.value})}
                  required
                  />
              </FormGrid>
            </Box>


            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
           
            
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Payment;
