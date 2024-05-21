import React, { useEffect } from "react";
import aboutText from "../data/aboutText";
import { Link, useNavigate, useParams } from "react-router-dom";

function SingleTextAbout() {
  const navigate = useNavigate();
  const { id } = useParams();

  const textItem = aboutText.find((item) => item.id === Number(id));

  useEffect(() => {
    if (!textItem) {
      const timer = setTimeout(() => {
        navigate("..", { relative: "path" });
      }, 3000);

      return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }
  }, [textItem, navigate]);

  if (!textItem) {
    return <h2>Text not found. Redirecting...</h2>; // Показываем сообщение пользователю
  }

  return (
    <>
      <h2>{textItem.title}</h2>
      <Link to={".."} relative={"path"}>
        About
      </Link>
    </>
  );
}

export default SingleTextAbout;
