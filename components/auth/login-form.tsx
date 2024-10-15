"use client";
import React from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField } from "../common/input";
import { Button } from "../common/button";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/login", {
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
        throw new Error(data.error);
      } else {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to protected page (e.g., /admin)
        router.push("/home");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleRedirectToSignup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.push("/register");
  };

  return (
    <div className="bg-white box-border w-96 p-6 rounded-2xl shadow-card">
      <h1 className="font-semibold mb-4 text-center text-xl">Login Form</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <InputField
              name="email"
              type="email"
              className=""
              placeholder="E-mail"
            />
            <InputField
              name="password"
              type="password"
              className=""
              placeholder="Password"
            />
            <Button
              className="w-full"
              disabled={isSubmitting || !isValid}
              variant="secondary"
            >
              Log In
            </Button>
            <div className="text-center">
              <span className="text-sm">Not a member?</span>
              <Button onClick={handleRedirectToSignup}>Signup now</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
