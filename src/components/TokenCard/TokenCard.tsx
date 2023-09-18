import { FC } from 'react';

import styles from './TokenCard.module.scss';

export type Props = {
  token: {
    address: string;
    name: string;
    date: string;
    projectId: string;
    symbol: string;
  };
  retireToken: (index: number) => {};
  image: string;
  index: number;
};

const TokenCard: FC<Props> = (props: Props) => {
  const { name, date, symbol, projectId } = props.token;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImage}>
         <img src={`/images/${props.index}.png`} alt="" />
        </div>
        <div className={styles.cardText}>
          <h1 onClick={() => {console.log(props.index)}}>{name}</h1>
          <div className={styles.columnItens}>
            <p>{projectId}</p>
            <p>{date}</p>
          </div>
          <div className={styles.redeemButton}>
            <p>{symbol}</p>
            <button onClick={() => props.retireToken(props.index)}>Retire Token</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenCard;
