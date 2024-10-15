import Head from "next/head";
import HomePage from "@/components/home/home-page";
import Navbar from "@/components/common/navbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Head>
        <title>Home</title>
      </Head>

      <Navbar />
      <HomePage />
    </div>
  );
}
