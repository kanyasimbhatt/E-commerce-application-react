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
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
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
    setError,
    formState: { isSubmitting, errors },
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

  const onSubmit: SubmitHandler<UserFormField> = (data) => {
    const users = JSON.parse(localStorage.getItem("users-array") as string);
    const index = users.findIndex((user: User) => user.email === data.email);
    if (index === -1) {
      setError("root", {
        type: "authentication",
        message: "Enter a correct email ID",
      });
      return;
    }

    if (users[index].password === data.password) {
      localStorage.setItem("user-id", users[index].id);
      navigate("/");
    } else {
      setError("root", {
        type: "authentication",
        message: "Enter correct password",
      });
    }
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
          Login
        </Typography>

        <TextField
          {...register("email")}
          type="email"
          label="Email"
          variant="outlined"
          color="primary"
          size="medium"
          required
        ></TextField>

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
        <Stack>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </Button>
          {errors.root && (
            <Typography color="red">{errors.root.message}</Typography>
          )}
          <Typography variant="subtitle2" color="gray">
            A new User: <a href="/signup">Sign Up</a>
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}
