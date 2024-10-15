import Head from "next/head";
import LoginForm from "@/components/auth/login-form";

const Login = () => {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
