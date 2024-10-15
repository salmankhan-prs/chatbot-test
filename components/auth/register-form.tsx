"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField } from "../common/input";
import { Button } from "../common/button";
import { useRouter } from "next/router";
import { toast } from "sonner";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        return;
      }

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const handleRedirectToLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <div className="bg-white box-border w-96 p-6 rounded-2xl shadow-card">
      <h1 className="font-semibold mb-4 text-center text-xl">Signup Form</h1>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <InputField name="fullName" type="text" placeholder="Full Name" />
            <InputField name="email" placeholder="E-mail" type="email" />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
            />
            <InputField
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
            <Button
              className="w-full"
              disabled={isSubmitting || !isValid}
              variant="secondary"
            >
              Sign Up
            </Button>
            <div className="text-center">
              <span className="text-sm">Already a member?</span>
              <Button onClick={handleRedirectToLogin}>Log in</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
