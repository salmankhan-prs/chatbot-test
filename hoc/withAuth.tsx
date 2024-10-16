import { useEffect, ComponentType } from "react";
import { useRouter } from "next/router";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!(token || user.id)) {
        // Redirect to public route if not authenticated
        router.replace("/login");
      } else if (router.pathname === "/admin" && !user.superAdmin) {
        // Redirect to home page if not superAdmin
        router.replace("/home");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
