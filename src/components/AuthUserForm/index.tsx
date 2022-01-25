import { FC, useEffect, useState } from "react";

// npm
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// recoil
import { useSetRecoilState } from "recoil";
import { userInfoState } from "../../state/atoms/user";
import { isLoggedState } from "../../state/atoms/auth";

// mui
import { TextField, Button, CircularProgress } from "@mui/material";

// styles
import { Container } from "./style";

// services
import { loginService } from "../../services/Auth";

interface Props {
  isLoginForm: boolean;
  setIsLoginForm: any;
  handleClose: any;
}

export const AuthUserForm: FC<Props> = ({
  isLoginForm,
  setIsLoginForm,
  handleClose,
}) => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const setLoggedState = useSetRecoilState(isLoggedState);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (values: any) => {
    setIsLoading(true);
    loginService(values)
      .then(({ data }) => {
        if (data.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_info", JSON.stringify(data.user));
          setUserInfo(data.user);
          setLoggedState(true);
          handleClose();
        } else {
          toast.error(data.error.message);
        }
      })
      .catch((err) => toast.error(err.response.data.err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line
  }, [isLoginForm]);

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      {!isLoginForm && (
        <>
          <TextField
            label="First name"
            variant="outlined"
            style={{ marginBottom: 10 }}
            {...register("first_name", { required: true })}
            error={errors.first_name}
          />
          <TextField
            label="Last name"
            variant="outlined"
            style={{ marginBottom: 10 }}
            {...register("last_name", { required: true })}
            error={errors.last_name}
          />
        </>
      )}
      <TextField
        label="Email"
        variant="outlined"
        style={{ marginBottom: 10 }}
        {...register("email", { required: true })}
        error={errors.email}
      />
      <TextField
        label="Password"
        variant="outlined"
        type={"password"}
        style={{ marginBottom: 10 }}
        {...register("password", { required: true })}
        error={errors.password}
      />

      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" type="submit">
            Send
          </Button>
        )}

        <Button
          style={{ marginTop: 20 }}
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm ? "Register" : "Login"}
        </Button>
      </div>
    </Container>
  );
};
