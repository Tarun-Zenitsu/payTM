import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signin = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            label={"First Name"}
            placeholder={"Jho"}
            type={"text"}
            onChange={onchange}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Deo"}
            type={"text"}
            onChange={onchange}
          />
          <InputBox
            label={"Email"}
            placeholder={"jhondeo@gmail.com"}
            type={"email"}
            onChange={onchange}
          />
          <Button label={"Submit"} onClick={onclick} />
          <BottomWarning
            label={"Don't have an account ?"}
            to={"/signup"}
            buttonText={"Sign up"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
