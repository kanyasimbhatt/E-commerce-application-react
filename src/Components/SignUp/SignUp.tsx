import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  IconButton,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

const schema = z.object({
  name: z
    .string()
    .refine(
      (value) => /^[a-zA-Z]+\s+[a-zA-Z]+$/.test(value ?? ""),
      "Please enter both firstname and lastname"
    ),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .refine(
      (value) => /^(\d{10})$/.test(value ?? ""),
      "Please Enter a 10 digit number"
    ),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value ?? ""
        ),
      `Enter Proper password having minimum 8 length, atleast 1 uppercase, 1 lowercase, 1 special character`
    ),
});

type UserFormField = z.infer<typeof schema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickOnShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormField>({
    resolver: zodResolver(schema),
  });

  const slotPropsForPassword = {
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label={
              showPassword ? "hide the password" : "display the password"
            }
            onClick={handleClickOnShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  const slotPropsForPhoneNumber = {
    input: {
      startAdornment: <InputAdornment position="start">+91</InputAdornment>,
    },
  };

  const onSubmit: SubmitHandler<UserFormField> = (data) => {
    const users: Array<User> =
      JSON.parse(localStorage.getItem("users-array") as string) || [];
    const id = crypto.randomUUID();
    users.push({ ...data, id: id });
    localStorage.setItem("users-array", JSON.stringify(users));
    localStorage.setItem("user-id", id);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={"column"}
        spacing={3}
        maxWidth={"600px"}
        margin={"auto"}
        marginTop={"80px"}
        padding={"80px"}
        boxShadow={"0px 0px 20px gray"}
        borderRadius={"7px"}
      >
        <Typography variant="h4" textAlign={"center"}>
          Sign Up
        </Typography>
        <Stack>
          <TextField
            {...register("name")}
            type="text"
            label="Full Name"
            variant="outlined"
            color="primary"
            size="medium"
            required
          ></TextField>
          {errors.name && (
            <Typography color={red[500]}>{errors.name.message}</Typography>
          )}
        </Stack>

        <Stack>
          <TextField
            {...register("email")}
            type="email"
            label="Email"
            variant="outlined"
            color="primary"
            size="medium"
            required
          ></TextField>
          {errors.email && (
            <Typography color={red[500]}>{errors.email.message}</Typography>
          )}
        </Stack>
        <Stack>
          <TextField
            {...register("phoneNumber")}
            type="text"
            label="Phone Number"
            variant="outlined"
            color="primary"
            slotProps={slotPropsForPhoneNumber}
            size="medium"
            required
          ></TextField>
          {errors.phoneNumber && (
            <Typography color={red[500]}>
              {errors.phoneNumber.message}
            </Typography>
          )}
        </Stack>
        <Stack>
          <TextField
            {...register("password")}
            type={showPassword ? "text" : "password"}
            label="Password"
            slotProps={slotPropsForPassword}
            variant="outlined"
            color="primary"
            size="medium"
            helperText="Do not share your password with anyone"
            required
          ></TextField>
          {errors.password && (
            <Typography color={red[500]}>{errors.password.message}</Typography>
          )}
        </Stack>
        <Stack>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Sign Up"}
          </Button>
          <Typography variant="subtitle2" color="gray">
            Already a user: <a href="/login">Login</a>
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}
