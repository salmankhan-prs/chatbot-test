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
      }
      //FIXME: here we need to check if the user is admin
      //then only allow him to access the admin page
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
