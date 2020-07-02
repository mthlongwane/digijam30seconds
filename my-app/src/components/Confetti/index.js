import React, { useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

const printAlert = (title, text) => {
  Swal.fire({
    position: "top",
    allowOutsideClick: false,
    title: title,
    text: text,
    width: 275,
    padding: "0.7em",
    // Custom CSS to change the size of the modal
    customClass: {
      heightAuto: false,
      title: "title-class",
      popup: "popup-class",
      confirmButton: "button-class"
    }
  });
};

export default props => {
  const { width, height } = useWindowSize();
  useEffect(() => {
    printAlert("Congratulations!", `Congratulations Team ${props.winner}`);
  }, [props.winner]);

  return <Confetti width={width} height={height} />;
};
