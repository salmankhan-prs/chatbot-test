import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/common/navbar";
import withAuth from "@/hoc/withAuth";

interface Response {
  _id: string;
  userId: string;
  message: {
    content: string;
    role: string;
  };
  timestamp: string;
}

function AdminPanel() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch("/api/get-all-responses");
        if (!res.ok) throw new Error("Failed to fetch responses");
        const data = await res.json();
        setResponses(data.responses);
      } catch (err) {
        setError("Failed to load responses");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponses();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Message</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => (
              <tr key={response._id}>
                <td className="py-2 px-4 border-b">{response.userId}</td>
                <td className="py-2 px-4 border-b">
                  {response.message.content}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(response.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAuth(AdminPanel);
