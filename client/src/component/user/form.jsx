import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import {
  FormControl,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Divider,
  Button,
  Stack,
  DialogContent,
  Dialog,
  TextField,
  Avatar,
  FormHelperText,
  LinearProgress,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "validate.js";

import { styled } from "@mui/material/styles";
import { postForm } from "../../redux/form/formThunk";
import { onAuth } from "../../redux/auth/authSlice";
import { turnOffSuccess } from "../../redux/form/formSlice";
import {
  selectLoadingForm,
  selectSuccessForm,
} from "../../redux/form/formSelector";
import { fetchDeparts } from "../../redux/depart/departThunk";
import { selectListDepart } from "../../redux/depart/departSelector";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "30px",
    },
  },
});

const CssSelect = styled(Select)({
  borderRadius: "30px",
});

export const Form = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoadingForm);
  const successForm = useSelector(selectSuccessForm);
  const listDepart = useSelector(selectListDepart);

  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
    depart: "",
  });
  // Validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  useEffect(() => {
    const schema = {
      name: {
        presence: {
          allowEmpty: false,
          message: "^Họ và tên không được trống",
        },
        format: {
          pattern: "[a-z A-Z]+",
          flags: "i",
          message: "^Họ và tên không bao gồm số",
        },
      },
      phone: {
        presence: {
          allowEmpty: false,
          message: "^Số điện thoại không được trống",
        },
        numericality: {
          notInteger: true,
          message: "^Số điện thoại không bao gồm ký tự hoặc chữ",
        },
        length: {
          minimum: 8,
          maximum: 12,
          message: "^Số điện thoại phải từ  8 - 12 chữ số",
        },
      },

      email: {
        presence: {
          allowEmpty: false,
          message: "^Email không được trống",
        },
        email: {
          message: "^Email không đúng định dạng (xxx@xx.xxx)",
        },
      },
      note: {
        presence: {
          allowEmpty: false,
          message: "^Nội dung không được trống",
        },
      },
      depart: {
        presence: {
          allowEmpty: false,
          message: "^Vui lòng chọn căn hộ cần tư vấn",
        },
      },
    };

    const errors = validate.validate(dataForm, schema);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataForm]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (event) => {
    setDataForm((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [event.target.name]: true,
      },
    }));
  };

  //------------------------------------------------------------

  React.useEffect(() => {
    dispatch(fetchDeparts());
  }, [dispatch]);

  const handleSend = () => {
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        name: true,
        phone: true,
        email: true,
        note: true,
        depart: true,
      },
    }));
    console.log(validation);
    if (validation.isvalid === true) {
      if (
        dataForm.name === process.env.REACT_APP_AUTH_USERNAME &&
        dataForm.phone === process.env.REACT_APP_AUTH_PHONE &&
        dataForm.email === process.env.REACT_APP_AUTH_EMAIL &&
        dataForm.note === process.env.REACT_APP_AUTH_NOTE
      ) {
        dispatch(onAuth());
        navigate("/admin/depart");
      } else {
        dispatch(postForm(dataForm));
      }
    }
  };
  const handleCloseDialogForm = () => {
    props.handleCallbackCloseDialog();
  };
  const handleCloseDialogSuccess = () => {
    handleCloseDialogForm();
    dispatch(turnOffSuccess());
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleCloseDialogForm}
        maxWidth="sm"
        fullWidth
      >
        <div id="idDiv">
          <span id="idTitle">ĐĂNG KÝ TƯ VẤN</span>
        </div>
        <hr />
        <Divider />
        <DialogContent>
          <Stack spacing={2} sx={{ paddingY: 2 }}>
            <CssTextField
              type="text"
              name="name"
              label="Họ và tên"
              fullWidth
              onChange={handleChange}
              InputProps={{
                startAdornment: <PersonIcon></PersonIcon>,
              }}
              error={hasError("name")}
              helperText={hasError("name") ? validation.errors.name?.[0] : null}
            ></CssTextField>
            <CssTextField
              type="text"
              name="phone"
              label="Số điện thoại"
              onChange={handleChange}
              InputProps={{
                startAdornment: <LocalPhoneIcon></LocalPhoneIcon>,
              }}
              error={hasError("phone")}
              helperText={
                hasError("phone") ? validation.errors.phone?.[0] : null
              }
            ></CssTextField>
            <CssTextField
              type="email"
              name="email"
              label="Email"
              onChange={handleChange}
              InputProps={{
                startAdornment: <EmailIcon></EmailIcon>,
              }}
              error={hasError("email")}
              helperText={
                hasError("email") ? validation.errors.email?.[0] : null
              }
            ></CssTextField>
            <FormControl fullWidth 
            error={hasError("depart")}
            >
              <InputLabel>Căn hộ cần tư vấn</InputLabel>
              <CssSelect
                // value={depart}
                name="depart"
                label="Căn hộ cần tư vấn"
                onChange={handleChange}
              >
                {listDepart?.map((data, index) => (
                  <MenuItem
                    value={data?._id}
                    key={index}
                    sx={{ display: "flex", rowGap: 5, columnGap: 5 }}
                  >
                    <Avatar
                      src={
                        process.env.REACT_APP_API_URL +
                        "/departs/" +
                        data?.photo?.[0]
                      }
                      alt=""
                      sx={{ marginBottom: 1 }}
                    />
                    <span
                      style={{
                        overflow: "auto",
                        fontSize: { xs: 10, sm: 15, md: 15, lg: 15 },
                        marginBottom: 1,
                      }}
                    >
                      {data?.name}
                    </span>
                  </MenuItem>
                ))}
              </CssSelect>
                <FormHelperText>
                  {hasError("depart") ? validation.errors.depart?.[0] : null}
                </FormHelperText>
            </FormControl>
            <CssTextField
              type="text"
              name="note"
              onChange={handleChange}
              label="Nội dung tư vấn"
              multiline
              rows={4}
              error={hasError("note")}
              helperText={hasError("note") ? validation.errors.note?.[0] : null}
            ></CssTextField>
            <Divider />
          </Stack>
          {isLoading === true ? (
            <Box sx={{ width: "100%",marginY:3 }}>
              <LinearProgress />
            </Box>
          ) : null}
          <Button
            id="idButton"
            type="submit"
            onClick={handleSend}
            disabled={isLoading}
          >
            GỬI
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={successForm} onClose={handleCloseDialogSuccess}>
        <DialogContent>
          <img
            src={require("../../assets/tick-xanh.png")}
            alt=""
            width={200}
            style={{ display: "block", margin: "auto" }}
          ></img>
          <Typography align="center">
            Đăng ký tư vấn thành công. Vui lòng đợi sẽ có bộ phận liên hệ tư vấn
            cho bạn. Xin cảm ơn
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};
