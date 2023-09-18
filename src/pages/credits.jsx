import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ToucanClient from 'toucan-sdk';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import imagens from '@/components/TokenImages/TokenImages';
import Header from '@/components/Header/Header';
import TokenCard from '@/components/TokenCard/TokenCard';

import styles from '@/styles/Credits.module.scss';

const Credits = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    const storedProviderData = JSON.parse(localStorage.getItem('provider'));
    if (storedProviderData) {
      const { network } = storedProviderData;
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        network
      );
      const signer = provider.getSigner();
      setSigner(signer);
      setProvider(provider);
    }
  }, []);

  const toucan = new ToucanClient('alfajores', provider);
  signer && toucan.setSigner(signer);

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
    const tco2addresses = await toucan.redeemAuto2("NCT", parseEther("1"));
    console.log(tco2addresses);

    const redeemedTokenAddress = await toucan.redeemAuto2(
      "NCT",
      parseEther("1")
    );
    console.log(redeemedTokenAddress);
    redeemedTokenAddress && setTco2address(redeemedTokenAddress[0].address);
  };

  const retireToken = async () => {
    await toucan.retire(parseEther("1"), tokens[0].address);
}

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
        <di className={styles.TokenContainer}>
          {!loading &&
            tokens.map((token, index) => {
              return (
                <TokenCard
                  redeemPoolToken={redeemPoolToken}
                  token={token}
                  key={token.projectId}
                  retireToken={retireToken}
                  index={index <= 6 ? index : ""}
                />
              );
            })}
        </di>
      </main>
      <Toaster />
    </div>
  );
};

export default Credits;
