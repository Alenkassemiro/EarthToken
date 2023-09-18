import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ToucanClient from 'toucan-sdk';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import { AnimatePresence } from 'framer-motion';
import { TailSpin } from 'react-loader-spinner';
import { FiExternalLink } from 'react-icons/fi';

import Imagens from '@/components/TokenImages/TokenImages';
import Modal from '@/components/Modal/Modal';
import Header from '@/components/Header/Header';
import TokenCard from '@/components/TokenCard/TokenCard';

import styles from '@/styles/Credits.module.scss';
import Link from 'next/link';

const Credits = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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
      console.log(tco2);

      setTokens(tco2);
      setLoading(false);
    };

    fetchData();
  }, []);

  let addressArray = [];

  tokens.map((token) => {
    addressArray.push(token.address);
  });

  const retireToken = async (index) => {
    setShowModal(true);
    setModalLoading(true);
    await toucan
      .retire(parseEther('1'), tokens[index].address)
      .then((response) => {
        setModalContent(response);
      });

    setModalLoading(false);
  };

  return (
    <>
      <div>
        <Header />
        <div className={styles.background}>
          <div />
        </div>
        <main className={styles.main}>
          <h1
            className={styles.titlePage}
          >
            Credits
          </h1>
          <di className={styles.TokenContainer}>
            {!loading &&
              tokens.map((token, index) => {
                return (
                  <TokenCard
                    token={token}
                    key={token.projectId}
                    retireToken={retireToken}
                    image={index <= 6 ? Imagens[index] : ''}
                    index={index}
                  />
                );
              })}
          </di>
        </main>
        <Toaster />
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && (
          <Modal handleClose={close}>
            {modalLoading ? (
              <TailSpin
                height="80"
                width="80"
                color="#39b044"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <div className={styles.modalContent}>
                <h1>Transaction Prof</h1>
                <div className={styles.field}>
                  <p>
                    <span>BlockHash:</span>
                    <br />
                    <p>{modalContent.blockHash}</p>
                  </p>
                </div>
                <div className={styles.field}>
                  <p>
                    <span>BlockNumber:</span>
                    <br />
                    <p>{modalContent.blockNumber}</p>
                  </p>
                </div>
                <div className={styles.field}>
                  <p>
                    <span>Transaction Hash:</span>
                    <br />
                    <p>{modalContent.transactionHash}</p>
                  </p>
                </div>
                <div className={styles.field}>
                  <p>
                    <span>From:</span>
                    <br />
                    <p>{modalContent.from}</p>
                  </p>
                </div>
                <div className={styles.field}>
                  <p>
                    <span>To:</span>
                    <br />
                    <p>{modalContent.to}</p>
                  </p>
                </div>
                <Link
                  href={`https://smart.zeniq.net/tx/${modalContent.transactionHash}`}
                  target="_blank"
                >
                  <FiExternalLink />
                  View on Explorer
                </Link>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Credits;
