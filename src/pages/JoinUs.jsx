import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import animationData from "../animations/login_animation.json";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "../Auth/firebase.init";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";

export function JoinUs() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const handleEmailPasswordLogin = async (data) => {
    const { email, password } = data;

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        admin: false,
      };
      axiosPublic.post("/user", userInfo).then((res) => {
        toast.success(`Welcome, ${user.displayName}!`);
        navigate("/");
      });
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse items-center justify-center mx-4">
      <div className="ml-2 hidden md:flex">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Join Us
          </Typography>
        </CardHeader>

        <form onSubmit={handleSubmit(handleEmailPasswordLogin)}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.email ? true : false}
            />
            {errors.email && (
              <Typography variant="small" color="red">
                {errors.email.message}
              </Typography>
            )}

            <Input
              label="Password"
              size="lg"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password ? true : false}
            />
            {errors.password && (
              <Typography variant="small" color="red">
                {errors.password.message}
              </Typography>
            )}

            {/* <div className="flex items-center justify-between -ml-2.5">
              <Checkbox label="Remember Me" />
              <Typography
                as="a"
                href="#forgot-password"
                variant="small"
                color="blue"
                className="font-medium underline"
              >
                Forgot Password?
              </Typography>
            </div> */}
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Join us"}
            </Button>

            <Button
              variant="outlined"
              color="blue"
              fullWidth
              className="mt-3 flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5"
              />
              {isLoading ? "Please wait..." : "Continue with Google"}
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Link to="/register" className="ml-1 text-blue-500 font-bold">
                Register
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
