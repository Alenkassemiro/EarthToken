import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header/Header";
import Forms from "@/components/Forms/Forms";
import Modal from "@/components/Modal/Modal";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  return (
    <>
      <div className="pageContainer">
        <Header />
        <div className={styles.background}>
          <div />
        </div>
        <main className={styles.main}>
          <section className={styles.firstSection}>
            <div className={styles.textContent}>
              <h1>
                Your actions <br />
                <span>matter</span>.
              </h1>
              <p>
                Awareness is the first step towards change. <br />
                Your Carbon Journey Starts Here: Tokenization for <br />
                Sustainable Living and Corporate Responsibility.
              </p>
              <div className={styles.actions}>
                <button onClick={() => (showModal ? close() : open())}>
                  Carbon footprint
                </button>
                <Link href="/credits">Available credits</Link>
              </div>
            </div>
            <div className={styles.imgContent}>
              <Image
                src="nftImages.svg"
                alt="nft_examples"
                width={531}
                height={604}
              />
            </div>
          </section>
          <section className={styles.secondSection}>
            <h1>
              <span>Our</span> Pillars
            </h1>
            <div className={styles.content}>
              <div className={styles.row}>
                <div className={styles.box}>
                  <div>
                    <Image
                      src="/transparency.svg"
                      alt="transparency_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <h2>Transparency</h2>
                  <p>
                    Tokenization leverages the power of blockchain technology to
                    establish a decentralized network where carbon credit
                    transactions can be securely recorded, eliminating the need
                    for intermediaries and reducing administrative complexities.
                    This not only streamlines the process but also enhances
                    trust among participants, as the immutable nature of
                    blockchain ensures the integrity of transaction records.
                  </p>
                </div>
                <div className={styles.box}>
                  <div>
                    <Image
                      src="/innovation.svg"
                      alt="innovation_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <h2>Technology and innovation</h2>
                  <p>
                    The Toucan Technology, an infrastructure blockchain, provides
                    a secure and decentralized environment for asset
                    tokenization. Integration with the SmartChain network allows for
                    the exchange and transaction of carbon credit tokens within
                    the ZENIQ ecosystem, leveraging its trusted and efficient
                    infrastructure.
                  </p>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.box}>
                  <div>
                    <Image
                      src="/democratization.svg"
                      alt="democratization_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <h2>Democratization</h2>
                  <p>
                    The democratization of blockchain technology is
                    revolutionizing various industries by providing
                    decentralized and transparent systems for secure
                    transactions. It empowers individuals by enabling direct
                    control over financial transactions, offering opportunities
                    for the unbanked and underbanked populations. Beyond
                    finance, blockchain{"'"}s decentralization enhances supply
                    chain management, healthcare, voting systems, and
                    intellectual property. Decentralized applications (DApps)
                    and smart contracts further enable efficient, secure, and
                    transparent processes. Overall, the democratization of
                    blockchain fosters a more inclusive and transparent society,
                    disrupting traditional systems and empowering individuals.
                  </p>
                </div>
                <div className={styles.box}>
                  <div>
                    <Image
                      src="/sustainability.svg"
                      alt="sustainability_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <h2>Sustainability</h2>
                  <p>
                    Blockchain technology offers innovative solutions for
                    sustainability by promoting transparency and accountability.
                    It enables transparent supply chains, facilitating
                    responsible production and consumption. In the field of
                    renewable energy, blockchain enables peer-to-peer energy
                    trading, supporting the adoption of clean energy.
                    Blockchain-based systems also enhance carbon credit tracking
                    and verification, fostering environmental sustainability.
                    Additionally, blockchain improves transparency and
                    accountability in charitable donations. Overall, blockchain
                    contributes to a more sustainable future across industries
                    and sectors.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && (
          <Modal handleClose={close}>
            <Forms />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
