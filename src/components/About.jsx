import aboutText from "../data/aboutText";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <h1>About</h1>
      {aboutText.map((text) => (
        <div key={text.id}>
          <Link to={`${text.id}`}>{text.name}</Link>
        </div>
      ))}
    </>
  );
};

export default About;
