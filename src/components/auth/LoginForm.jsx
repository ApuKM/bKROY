"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Input,
  Button,
  Separator,
  Link,
  TextField,
  FieldError,
  Label,
} from "@heroui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
     const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { data: authData, error: authError } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: "/",
        });
      if (authError) {
        setError("root", {
          message:
            authError.message || "Failed to create account. Please try again.",
        });
        return;
      }
      console.log("Login succesful:", data);
      router.push("/")
    } catch (err) {
      setError("root", { message: "Network error. Please try again later." });
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  return (
    <>
      <Button
        fullWidth
        className="bg-[#111] border-white/10 text-gray-200 hover:bg-[#161616] h-12 rounded-xl text-sm font-medium transition-colors flex items-center"
        onPress={() => console.log("Google Auth Triggered")}
      >
        <FcGoogle className="text-xl" />
        Log in with Google
      </Button>

      <div className="flex items-center my-6 gap-4">
        <Separator className="flex-1 bg-white/10" />
        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium shrink-0">
          or
        </span>
        <Separator className="flex-1 bg-white/10" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex w-full flex-col gap-4"
      >
        {/* Email Field - Removed HeroUI's isRequired */}
        <TextField fullWidth isInvalid={!!errors.email}>
          {/* Added manual asterisk if you want to keep the visual indicator */}
          <Label>
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            placeholder="user@example.com"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <FieldError className="text-red-500 text-xs mt-1">
              {errors?.email?.message}
            </FieldError>
          )}
        </TextField>

        {/* Password Field - Removed HeroUI's isRequired */}
        <TextField fullWidth isInvalid={!!errors.password}>
          <Label>
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative flex w-full items-center">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pr-10"
              {...register("password", {
                required: "Password is required.",
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 focus:outline-none text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <FiEyeOff className="text-lg" />
              ) : (
                <FiEye className="text-lg" />
              )}
            </button>
          </div>
          {errors.password && (
            <FieldError className="text-red-500 text-xs mt-1">
              {errors?.password?.message}
            </FieldError>
          )}
        </TextField>

        {errors.root && (
          <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg mt-2">
            {errors?.root?.message}
          </p>
        )}

        <div className="flex justify-end w-full">
          <Link
            href="/auth/reset-password"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          fullWidth
          type="submit"
          className="bg-[#0A7C6E] hover:bg-[#08685d] font-medium text-white text-sm h-12 rounded-xl shadow-lg shadow-[#5a45ff]/20 transition-all mt-4"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Dont have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#0A7C6E] hover:underline font-medium text-xs ml-1 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
