import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./not-found.module.css";

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>404</h1>
        <p>Oops! Page not found</p>
        <Link to="/" className={styles.link}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
