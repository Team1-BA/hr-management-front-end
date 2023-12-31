/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
//api urls 
import {API_URLS} from '../../../config/apiUrls';

import axios from "axios";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { useEffect, useState } from "react";
import { Select } from "@mui/material";

//react-phone-input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

const turkishCities = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Düzce",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkâri",
  "Hatay",
  "Iğdır",
  "Isparta",
  "İstanbul",
  "İzmir",
  "Kahramanmaraş",
  "Karabük",
  "Karaman",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kilis",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Mardin",
  "Mersin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Osmaniye",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Şanlıurfa",
  "Şırnak",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Uşak",
  "Van",
  "Yalova",
  "Yozgat",
  "Zonguldak",
];
function GuestRegister() {
  const [isGuestRegistered, setisGuestRegistered] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestSurname, setGuestSurname] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  const [guestPassword, setGuestPassword] = useState("");

  const navigate = useNavigate();

  const handleGuestNameChange = (event) => {
    setGuestName(event.target.value);
  };

  const handleGuestSurnameChange = (event) => {
    setGuestSurname(event.target.value);
  };

  const handleGuestPhoneChange = (event) => {
    setGuestPhone(event.target.value);
  };

  const handleGuestAddressChange = (event) => {
    setGuestAddress(event.target.value);
  };

  const handleGuestEmailChange = (event) => {
    setGuestEmail(event.target.value);
  };

  const handleGuestPasswordChange = (event) => {
    setGuestPassword(event.target.value);
  };

  const handleGuestRegisterSuccess = () => {
    setisGuestRegistered(true);
  };

  function handleAddNewGuest(
    guestName,
    guestPhone,
    guestEmail,
    guestSurname,
    guestAddress,
    guestPassword
  ) {
    const guestRegisterRequestDto = {
      name: guestName,
      surname: guestSurname,
      phoneNumber: guestPhone,
      address: guestAddress,
      personalEmail: guestEmail,
      password: guestPassword,
    };
    
    axios
      .post(`${API_URLS.auth.localhost}/guest-register`, guestRegisterRequestDto)
      .then((response) => {
        console.log("Guest register successfull!", response.data);
        handleGuestRegisterSuccess();
        navigate("/authentication/login");
      })
      .catch((error) => {
        console.error("Guest register failed: ", error);
      })
      .finally(() => {
        console.log("isGuestRegistered: ", isGuestRegistered);
      });

    setGuestName("");
    setGuestSurname("");
    setGuestPhone("");
    setGuestEmail("");
    setGuestAddress("");
    setGuestName("");
    setGuestPassword("");
  }

  return (
    <CoverLayout
      title="Welcome!"
      description="You can keep and manage all your human resources information of your company."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card sx={{ width: "500px", margin: "0 auto" }} textAlign="center">
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Guest Registration
          </ArgonTypography>
        </ArgonBox>

        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox
            component="form"
            role="form"
            onSubmit={() => {
              handleSubmit;
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* First Column */}
              <div style={{ flex: 1, marginRight: "16px" }}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    placeholder="Name"
                    name="guest-name"
                    value={guestName}
                    onChange={handleGuestNameChange}
                  />
                </ArgonBox>
              </div>

              {/* Second Column */}
              <div style={{ flex: 1 }}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    placeholder="Surname"
                    name="guest-surname"
                    value={guestSurname}
                    onChange={handleGuestSurnameChange}
                  />
                </ArgonBox>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <ArgonBox mb={2}>
                  {/* <ArgonInput
                    placeholder="Phone"
                    name="guest-phone"
                    value={guestPhone}
                    onChange={handleGuestPhoneChange}
                  /> */}
                   <PhoneInput
                    inputProps={{
                      name: "guest-phone",
                      placeholder:"Phone",
                      style: {
                        width: "100%",
                      },
                    }}
                    country={"tr"}
                    value={guestPhone}
                    onChange={(value) => setGuestPhone(value)}
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonInput
                    placeholder="Address"
                    name="guest-address"
                    value={guestAddress}
                    onChange={handleGuestAddressChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonInput
                    type="email"
                    placeholder="Email"
                    name="guest-email"
                    value={guestEmail}
                    onChange={handleGuestEmailChange}
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonInput
                    type="password"
                    placeholder="Password"
                    name="guest-password"
                    value={guestPassword}
                    onChange={handleGuestPasswordChange}
                  />
                </ArgonBox>
              </div>
            </div>

            <ArgonBox mt={4} mb={1}>
              <ArgonButton
                variant="gradient"
                color="dark"
                fullWidth
                type="submit"
                to="/"
                onClick={() =>
                  handleAddNewGuest(
                    guestName,
                    guestPhone,
                    guestEmail,
                    guestSurname,
                    guestAddress,
                    guestPassword
                  )
                }
              >
                Register
              </ArgonButton>
            </ArgonBox>

            <ArgonBox mt={4} mb={1}>
              <ArgonButton
                component={Link}
                to="/authentication/company-register"
                variant="gradient"
                color="dark"
                fullWidth
                type="submit"
              >
                Register for Company
              </ArgonButton>
            </ArgonBox>

            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/login"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Login
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default GuestRegister;
