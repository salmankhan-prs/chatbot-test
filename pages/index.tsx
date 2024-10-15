import Head from "next/head";
import HomePage from "@/components/home/home-page";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <HomePage />
    </div>
  );
}
