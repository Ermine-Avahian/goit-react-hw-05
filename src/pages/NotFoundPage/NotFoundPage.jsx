import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h2>Page is not found!</h2>
      <Link to="/" className={s.link}>
        Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
