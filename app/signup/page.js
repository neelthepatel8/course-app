"use client";
import React from "react";
import signUp from "@/auth/firebase/signup";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput/FormInput";
import Image from "next/image";
function Page() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [isPassCorrect, setPassCorrect] = React.useState(true);

  const router = useRouter();

  function confirmPassword(pass, main) {
    let first = pass;
    let second = main ? confirmPass : password;
    setPassCorrect(first == second);
  }
  function setMainPassword(pass) {
    setPassword(pass);
    confirmPassword(pass, true);
  }
  function setConfirmPassword(pass) {
    setConfirmPass(pass);
    confirmPassword(pass, false);
  }
  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(username, email, password);

    if (error) {
      return console.log(error);
    }

    console.log(result);
    return router.push("/admin");
  };
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="">
        <Image src="/husky.png" alt="Husky" width={700} height={900} />
      </div>
      <div className="flex flex-col justify-center h-screen">
        <div className="flex items-center">
          <form
            onSubmit={handleForm}
            className="flex flex-col gap-8 text-xl items-start w-full"
          >
            <div className="font-bold text-8xl text-white h-1/2">Register</div>

            <label htmlFor="username">
              <FormInput
                onChange={setUsername}
                type="text"
                name="username"
                placeholder="Username"
              />
            </label>
            <label htmlFor="email">
              <FormInput
                onChange={setEmail}
                type="email"
                name="email"
                placeholder="Email"
              />
            </label>
            <label htmlFor="password">
              <FormInput
                errorHighlight={!isPassCorrect}
                onChange={setMainPassword}
                type="password"
                name="password"
                placeholder="Password"
              />
            </label>
            {console.log(isPassCorrect)}
            <label htmlFor="confirm-password">
              <FormInput
                errorHighlight={!isPassCorrect}
                onChange={setConfirmPassword}
                type="password"
                name="confpassword"
                placeholder="Confirm Password"
              />
            </label>
            <button
              className="my-6 self-center text-white bg-red-700 py-3 rounded-full w-1/2 hover:bg-red-400 font-sans font-semibold text-md"
              type="submit"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;