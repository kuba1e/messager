import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import eyeOpenImg from "../assets/img/eyeOpen.svg";
import eyeCloseImg from "../assets/img/eyeClose.svg";
import okImg from "../assets/img/ok.svg";
import xnoneImg from "../assets/img/x-non.svg";
import validator from "validator";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { Loader } from "../components/UI/Loader";
import dialogsStore from "../stores/dialogsStore";
import { ViewStateContext } from "contexts/ViewStateContext";
import userStore from "stores/userStore";

export const Login = () => {
  const { viewState, updateViewState } = useContext(ViewStateContext);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [openPass, setOpenPass] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [validName, setValidName] = React.useState<null | boolean>(null);
  const [validPass, setValidPass] = React.useState<null | boolean>(null);
  const [validEmail, setValidEmail] = React.useState<null | boolean>(null);

  const routeLocation = useLocation(); // current route value
  const navigate = useNavigate();

  const [validateUsernameMsg, setValidateUsernameMsg] = React.useState("");
  const [validatePassMsg, setValidatePassMsg] = React.useState("");
  const [validateEmailMsg, setValidateEmailMsg] = React.useState("");

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      userStore.getUser().then((user) => {
        updateViewState((prevState) => ({ ...prevState, user }));
        navigate(RouteNames.CHATS);
      });
    }
  }, []);

  const resetValidResult = () => {
    setValidName(null);
    setValidPass(null);
    setValidEmail(null);
    setValidateUsernameMsg("");
    setValidatePassMsg("");
    setValidateEmailMsg("");
  };

  const logIn = () => {
    setIsLoading(true);
    authStore
      .login(email, password)
      .then(() => {
        setIsLoading(false);
        navigate(RouteNames.CHATS);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const register = async () => {
    const user = await authStore.registration(
      email,
      nickname,
      password,
      firstName,
      lastName,
      phoneNumber
    );

    updateViewState((prevState) => ({ ...prevState, user }));

    user ? navigate(RouteNames.CHATS) : alert("This mail is busy");
  };
  return (
    <LoginWraper>
      <Animation>
        <div className="view">
          <div className="plane main">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </Animation>
      <div className="loginform-container">
        <LoginForm>
          <h1 className="header">
            {routeLocation.pathname == "/login" ? "Log In" : "Registration"}
          </h1>

          <div className="loginForm__fields">
            <div>
              <Input
                placeholder="Email"
                type="text"
                value={email}
                setValue={setEmail}
                width={"300px"}
              />
            </div>
            {routeLocation.pathname == "/registration" && (
              <div>
                <Input
                  placeholder="Your first name"
                  type="text"
                  value={firstName}
                  setValue={setFirstName}
                  width={"300px"}
                />
                <Input
                  placeholder="Your last name"
                  type="text"
                  value={lastName}
                  setValue={setLastName}
                  width={"300px"}
                />
                <Input
                  placeholder="Your nickname"
                  type="text"
                  value={nickname}
                  setValue={setNickname}
                  width={"300px"}
                />
                <Input
                  placeholder="Your phone number"
                  type="text"
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  width={"300px"}
                />
              </div>
            )}
            <div>
              <div className="passBlock">
                <Input
                  placeholder="Password"
                  type={openPass ? "text" : "password"}
                  value={password}
                  setValue={setPassword}
                  width={"300px"}
                />
                <ViewPass
                  onClick={() => setOpenPass(!openPass)}
                  src={openPass ? eyeOpenImg : eyeCloseImg}
                />
              </div>
            </div>
          </div>
          <div className="loginForm__buttons">
            {routeLocation.pathname == "/login" ? (
              <Button
                isLoading={isLoading}
                height="45px"
                width="240px"
                onClick={logIn}
              >
                {isLoading ? <Loader width="35px" top="-14px" /> : "LOG IN"}
              </Button>
            ) : (
              <Button
                height="45px"
                width="240px"
                isLoading={isLoading}
                onClick={register}
              >
                {isLoading ? <Loader width="35px" top="-14px" /> : "SIGN UP"}
              </Button>
            )}

            {routeLocation.pathname == "/login" ? (
              <p>
                Don't have an account yet?{" "}
                <Link to="/registration" onClick={() => resetValidResult()}>
                  Register
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link to="/login" onClick={() => resetValidResult()}>
                  Login
                </Link>
              </p>
            )}
          </div>
        </LoginForm>
      </div>
    </LoginWraper>
  );
};

const Animation = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  .view {
    transform: scale(2);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    perspective: 400;
  }

  .plane {
    width: 120px;
    height: 120px;
    transform-style: preserve-3d;
  }
  .plane.main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotateX(60deg) rotateZ(-30deg);
    -webkit-animation: rotate 20s infinite linear;
    animation: rotate 20s infinite linear;
  }
  .plane.main .circle {
    width: 120px;
    height: 120px;
    position: absolute;
    transform-style: preserve-3d;
    border-radius: 100%;
    box-sizing: border-box;
    box-shadow: 0 0 60px crimson, inset 0 0 60px crimson;
  }
  .plane.main .circle::before,
  .plane.main .circle::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 10%;
    height: 10%;
    border-radius: 100%;
    background: crimson;
    box-sizing: border-box;
    box-shadow: 0 0 60px 2px crimson;
  }
  .plane.main .circle::before {
    transform: translateZ(-90px);
  }
  .plane.main .circle::after {
    transform: translateZ(90px);
  }
  .plane.main .circle:nth-child(1) {
    transform: rotateZ(72deg) rotateX(63.435deg);
  }
  .plane.main .circle:nth-child(2) {
    transform: rotateZ(144deg) rotateX(63.435deg);
  }
  .plane.main .circle:nth-child(3) {
    transform: rotateZ(216deg) rotateX(63.435deg);
  }
  .plane.main .circle:nth-child(4) {
    transform: rotateZ(288deg) rotateX(63.435deg);
  }
  .plane.main .circle:nth-child(5) {
    transform: rotateZ(360deg) rotateX(63.435deg);
  }

  @-webkit-keyframes rotate {
    0% {
      transform: rotateX(0) rotateY(0) rotateZ(0);
    }
    100% {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotateX(0) rotateY(0) rotateZ(0);
    }
    100% {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .loginForm__fields {
    display: flex;
    flex-direction: column;
    margin-top: -20%;
    div {
      margin-top: 25px;
    }
  }
  .loginForm__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .passBlock {
    position: relative;
  }
`;

const LoginWraper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 3fr 1fr;
  .loginform-container {
    height: 100%;
    background-color: #1c1d2c;
  }
`;

const ValidateMsg = styled.p<{
  validPass?: boolean | null;
  validName?: boolean | null;
  validEmail?: boolean | null;
}>`
  color: ${(props) =>
    props.validPass || props.validName || props.validEmail
      ? "#7BF996"
      : "#e25c5c"};
  position: absolute;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 5px;

  img {
    width: 20px;
    margin-right: 5px;
  }
`;

const ViewPass = styled.img`
  position: absolute;
  top: 50%;
  right: -35px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #fff;
  width: 25px;
`;
