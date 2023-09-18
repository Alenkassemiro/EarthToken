import { motion } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";

import Backdrop from "../Backdrop";

import styles from "./modal.module.scss";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    }
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, children }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible" 
        exit="exit"
      >
        <AiOutlineCloseCircle size={25} onClick={handleClose} className={styles.closeBtn}/>
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
