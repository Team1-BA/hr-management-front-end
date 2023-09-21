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
import { API_URLS } from "../../../../config/apiUrls";

import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 MUI base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

//Edit button
import { Button, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function CompanyManagerInfoCard({ title, description, info, social, action }) {
  const propertyLabels = {
    name: "Name",
    surname: "Surname",
    companyEmail: "Company Email",
    personalEmail: "Personal Email",
    phone: "Phone",
    address: "Address",
    info: "Info",
    birthday: "Birthday",
    role: "Role",
  };
  const storedToken = localStorage.getItem("Authorization");
  const { socialMediaColors } = colors;
  const { size } = typography;

  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...info });

  useEffect(() => {
    setEditedInfo({ ...info });
  }, [info]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({
      ...editedInfo,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedInfo({
      ...info,
    });
  };

  const handleSubmit = () => {
    const decodedToken = jwt_decode(storedToken);
    axios
      .put(`${API_URLS.user.localhost}/update/${decodedToken.id}`, editedInfo)
      .then((response) => {
        console.log("User data updated:", response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("An error occurred while updating user information:", error);
      });

    setEditMode(false);
  };

  const handleGoToEmployeeProfile = () => {
    const decodedToken = jwt_decode(storedToken);
    decodedToken.role = "EMPLOYEE";
    console.log(decodedToken);
  };

  // Create sets to store unique labels and values
  const uniqueLabelsSet = new Set();
  const uniqueValuesSet = new Set();

  // Convert this form `objectKey` of the object key into this `object key`
  Object.keys(info).forEach((el) => {
    const label = el.match(/[A-Z\s]+/)
      ? el.replace(/[A-Z]+/g, (match) => ` ${match.toLowerCase()}`)
      : el;

    uniqueLabelsSet.add(label);
    uniqueValuesSet.add(editedInfo[el]);
  });

  // Convert sets back to arrays
  const uniqueLabels = [...uniqueLabelsSet];
  const uniqueValues = [...uniqueValuesSet];

  const renderItems = Object.keys(info).map((key, index) => {
    const label = propertyLabels[key]; // Label'ı burada tanımlıyoruz
    return (
      <ArgonBox key={key} display="flex" alignItems="center" py={1} pr={2}>
        <ArgonBox>
          <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
            {label}: &nbsp;
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox>
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            &nbsp;
            {editMode ? (
              <TextField
                label={label}
                name={label}
                value={uniqueValues[index]}
                onChange={handleFieldChange}
                fullWidth
                sx={{
                  width: "200%",
                  marginTop: "-20px",
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "0.01rem",
                    display: "none",
                  },
                }}
              />
            ) : (
              editedInfo[key]
            )}
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    );
  });

  const renderSocial = social.map(({ link, icon, color }) => (
    <ArgonBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </ArgonBox>
  ));

  return (
    <Card sx={{ width: "309%" }}>
      <Grid container>
        <Grid item xs={12}>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
            <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              {title}
            </ArgonTypography>

            <ArgonTypography component={Link} to={action.route} variant="body2" color="secondary">
              <Tooltip title={action.tooltip} placement="top">
                <Stack direction="row">
                  <ArgonBox sx={{ padding: "0 1em 0 0" }}>
                    <ArgonButton
                      color="primary"
                      size="medium"
                      fullWidth
                      onClick={handleGoToEmployeeProfile}
                      component={Link}
                      to="/employee/profile"
                    >
                      Go to Employee Profile
                    </ArgonButton>
                  </ArgonBox>
                  <ArgonBox>
                    <ArgonButton
                      size="medium"
                      color="info"
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={handleEditClick}
                      sx={{ p: "8px 16px", fontSize: "0.9rem" }}
                    >
                      Edit
                    </ArgonButton>
                  </ArgonBox>
                </Stack>
              </Tooltip>
            </ArgonTypography>
          </ArgonBox>
        </Grid>
        <Grid item xs={12}>
          <ArgonBox p={2}>
            <ArgonBox mb={2} lineHeight={1}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                {description}
              </ArgonTypography>
            </ArgonBox>

            <ArgonBox width="185%" ml={2}>
              {editMode ? (
                <form>
                  {renderItems}
                  <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 2, mx: "auto", p: "8px 16px", fontSize: "0.75rem" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleCancelEdit}
                      sx={{ mt: 2, mx: "auto", p: "8px 16px", fontSize: "0.75rem" }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </form>
              ) : (
                renderItems
              )}
            </ArgonBox>
          </ArgonBox>
        </Grid>
      </Grid>
    </Card>
  );
}

CompanyManagerInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default CompanyManagerInfoCard;