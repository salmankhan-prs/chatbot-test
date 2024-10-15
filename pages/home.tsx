import Head from "next/head";
import HomePage from "@/components/home/home-page";
import Navbar from "@/components/common/navbar";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Navbar />
      <HomePage />
      <ToastContainer />
    </div>
  );
}
