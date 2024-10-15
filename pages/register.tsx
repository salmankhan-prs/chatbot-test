import Head from "next/head";
import RegisterForm from "@/components/auth/register-form";

const Register = () => {
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
