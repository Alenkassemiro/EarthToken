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
  image: {
    id: number;
    url: string;
    nome: string;
    descricao: string;
  };
  index: number
};

const TokenCard: FC<Props> = (props: Props) => {
  const { name, date, symbol, projectId } = props.token;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          {props.image && props.image.url ? (
            <img src={props.image.url} alt="image" />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.cardText}>
          <h1>{name}</h1>
          <div className={styles.columnItens}>
            <p>{projectId}</p>
            <p>{date}</p>
          </div>
          <div className={styles.redeemButton}>
            <p>{symbol}</p>
            <button onClick={() => props.retireToken(props.index)}>
              Redeem Token
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenCard;
