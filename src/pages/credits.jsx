import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ToucanClient from 'toucan-sdk';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';

import Header from '@/components/Header/Header';
import TokenCard from '@/components/TokenCard/TokenCard';


import styles from '@/styles/Credits.module.scss';

const Credits = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const storedProviderData = JSON.parse(localStorage.getItem('provider'));
    if (storedProviderData) {
      const { network } = storedProviderData;
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        network
      );
      setProvider(provider);
    }
  }, []);

  const toucan = new ToucanClient('smartchain', provider);

  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const tco2 = await toucan.fetchAllTCO2Tokens();

      setTokens(tco2);
      setLoading(false);
    };

    fetchData();
  }, []);

  const [tco2address, setTco2address] = useState('');

  let addressArray = [];

  tokens.map((token) => {
    addressArray.push(token.address);
  });

  const redeemPoolToken = async () => {
    const redeemedTokenAddress = await toucan.redeemMany(
      'NCT',
      addressArray,
      parseEther('1.0')
    );
    redeemedTokenAddress && setTco2address(redeemedTokenAddress[0].address);
  };

  return (
    <div>
      <Header />
      <div className={styles.background}>
        <div />
      </div>
      <main className={styles.main}>
        <h1
          className={styles.titlePage}
          onClick={() => console.log(addressArray)}
        >
          Credits
        </h1>
        <div className={styles.TokenContainer}>
          {!loading &&
            tokens.map((token) => {
              return (
                <TokenCard
                  redeemPoolToken={redeemPoolToken}
                  token={token}
                  key={token.projectId}
                />
              );
            })}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Credits;
