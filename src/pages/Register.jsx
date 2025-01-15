import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import animationData from "../animations/login_animation.json";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "../Auth/firebase.init";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import useAxiosPublic from "../hooks/useAxiosPublic";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]);
    }
  };

  const uploadImageToImgBB = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const imgbbAPIKey = import.meta.env.VITE_IMGBB_IMAGE_API_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;

    try {
      const response = await axiosPublic.post(url, formData);
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handleRegister = async (data) => {
    const { name, email, password } = data;
    setIsLoading(true);

    try {
      let profileImageUrl = null;

      if (imageFile) {
        profileImageUrl = await uploadImageToImgBB(imageFile);
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
        photoURL: profileImageUrl || "",
      });
      const userInfo = {
        name: name,
        email: email,
        admin: false,
      };
      axiosPublic.post("/user", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log(`user added ${userInfo}`);
          toast.success("Registration successful!");
          navigate("/");
        }
      });
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "This email is already in use. Please try a different one."
        );
      } else {
        toast.error("Registration failed. Please try again.");
      }
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
        toast.success("Successfully logged in!");
        navigate("/");
      });
    } catch (error) {
      console.error(error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageDrop,
    accept: "image/*",
    maxFiles: 1,
  });

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
            Register
          </Typography>
        </CardHeader>

        <form onSubmit={handleSubmit(handleRegister)}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              type="text"
              {...register("name", { required: "Name is required" })}
              error={errors.name ? true : false}
            />
            {errors.name && (
              <Typography variant="small" color="red">
                {errors.name.message}
              </Typography>
            )}

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

            <div
              {...getRootProps()}
              className={`border-dashed border-2 p-4 rounded-lg ${
                isDragActive ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              <Typography
                variant="small"
                color="blue-gray"
                className="text-center"
              >
                {imageFile
                  ? `Selected file: ${imageFile.name}`
                  : isDragActive
                  ? "Drop the image here..."
                  : "Drag and drop an image here, or click to select one"}
              </Typography>
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
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
              Already have an account?
              <Link to="/login" className="ml-1 text-blue-500 font-bold">
                Login
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
