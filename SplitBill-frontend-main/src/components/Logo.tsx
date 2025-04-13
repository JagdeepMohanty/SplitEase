import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <span className="sr-only">Split Ease</span>
      <p className="text-2xl font-bold">
        Split <span className="text-blue-600">Ease</span>
      </p>
    </Link>
  );
};

export default Logo;
