import { FC } from "react";
import toast, { Toaster } from "react-hot-toast";

import styles from "./TokenCard.module.scss";

export type Token = {
  address: string;
  name: string;
  date: string;
  projectId: string;
  symbol: string;
  retireToken: () => {};
};

const TokenCard: FC<{
  token: Token;
  retireToken: () => {};
  redeemPoolToken: () => {};
  image: string;
}> = (props) => {
  const { name, date, symbol, projectId } = props.token;

  const toastHandler = () => {
    toast.loading("Feature under development", {
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImage}></div>

        <div className={styles.cardText}>
          <h1>{name}</h1>
          <div className={styles.columnItens}>
            <p>{projectId}</p>
            <p>{date}</p>
          </div>
          <div className={styles.redeemButton}>
            <p>{symbol}</p>
            <button onClick={props.redeemPoolToken}>Redeem Token</button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default TokenCard;
