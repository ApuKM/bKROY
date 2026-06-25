"use client";

import { authClient } from "@/lib/auth-client";
import { Separator } from "@heroui/react";
import { TextField } from "@heroui/react";
import { Input } from "@heroui/react";
import { FieldError } from "@heroui/react";
import { Description } from "@heroui/react";
import { Label } from "@heroui/react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
  });
  const router = useRouter();

  // Processing & UI States
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Real-time Validation Logic ---
  // Using derived state ensures validation is always perfectly in sync with input values.
  const isUsernameInvalid = React.useMemo(() => {
    return formData.username.length > 0 && formData.username.length < 3;
  }, [formData.username]);

  const isEmailInvalid = React.useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formData.email.length > 0 && !emailRegex.test(formData.email);
  }, [formData.email]);

  const isPasswordInvalid = React.useMemo(() => {
    const password = formData.password;

    // Do not show an error if the user hasn't typed anything yet
    if (password.length === 0) return false;

    // Validation rules
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password); // Checks for anything that is NOT a letter or number

    // Returns true (invalid) if ANY of the conditions are false
    return !(hasMinLength && hasUpperCase && hasLowerCase && hasSpecialChar);
  }, [formData.password]);

  // General handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear global API errors once the user starts typing again
    if (apiError) setApiError("");
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // Prevent submission if fields are currently invalid or empty
    if (isUsernameInvalid || isEmailInvalid || isPasswordInvalid) return;
    if (!formData.username || !formData.email || !formData.password) {
      setApiError("Please fill out all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error: authError } = await authClient.signUp.email({
        name: formData.username,
        email: formData.email,
        password: formData.password,
        image: formData.imageUrl ? formData.imageUrl : undefined,
      });
      if (authError) {
        setApiError(
          authError.message || "Failed to create account. Please try again.",
        );
        return;
      }
      console.log("Account successfully created:", data);
      router.push("/");
      // Proceed to routing or success state here
    } catch (err) {
      setApiError(
        "Something went wrong establishing a connection. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* OAuth Button */}
      <Button
        fullWidth
        className="bg-[#111] border-white/10 text-gray-200 hover:bg-[#161616] h-12 rounded-xl text-sm font-medium transition-colors flex items-center"
        onPress={() => console.log("Google Auth Triggered")}
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center my-6 gap-4">
        <Separator className="flex-1 bg-white/10" />
        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium shrink-0">
          or
        </span>
        <Separator className="flex-1 bg-white/10" />
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        {/* Username Field */}
        <TextField
          isRequired
          fullWidth
          isInvalid={isUsernameInvalid}
          name="username"
        >
          <Label>Username</Label>
          <Input
            name="username"
            placeholder="jane_doe"
            value={formData.username}
            onChange={handleChange}
          />
          {isUsernameInvalid ? (
            <FieldError className="text-red-500 text-xs mt-1">
              Username must be at least 3 characters.
            </FieldError>
          ) : (
            <Description className="text-gray-500 text-xs mt-1">
              Choose a unique username for your profile.
            </Description>
          )}
        </TextField>

        {/* Email Field */}
        <TextField isRequired fullWidth isInvalid={isEmailInvalid} name="email">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {isEmailInvalid && (
            <FieldError className="text-red-500 text-xs mt-1">
              Please enter a valid email address.
            </FieldError>
          )}
        </TextField>

        {/* Password Field */}
        {/* Password Field */}
        <TextField
          isRequired
          fullWidth
          isInvalid={isPasswordInvalid}
          name="password"
        >
          <Label>Password</Label>
          {/* Relative wrapper to hold the input and the absolute button */}
          <div className="relative flex w-full items-center">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full pr-10" // Padding right to prevent text overlap with the icon
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
          {isPasswordInvalid && (
            <FieldError className="text-red-500 text-xs mt-1">
              Password must be at least 8 characters long. 1 uppercase, 1
              lowercase and special character.
            </FieldError>
          )}
        </TextField>

        {/* Optional Avatar Field */}
        <TextField fullWidth name="imageUrl">
          <Label>Avatar URL (Optional)</Label>
          <Input
            type="url"
            name="imageUrl"
            placeholder="https://example.com/avatar.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </TextField>

        {/* Global Form Error */}
        {apiError && (
          <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
            {apiError}
          </p>
        )}

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          isDisabled={isUsernameInvalid || isEmailInvalid || isPasswordInvalid}
          className="bg-[#0A7C6E] hover:bg-[#08685d] font-medium text-white text-sm h-12 rounded-xl shadow-lg shadow-[#0A7C6E]/20 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#0A7C6E]  hover:underline font-medium text-xs ml-1 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
