import Header from "@/components/Header/Header";

import styles from "@/styles/About.module.scss";

const About = () => {
  return (
    <div>
      <Header />
      <div className={styles.background}>
        <div />
      </div>
      <main className={styles.main}>
        <h1 className={styles.titlePage}>About</h1>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutRow}>
            <div className={styles.aboutText}>
              <h1>
                Redeem and Retirement of carbon credits for both companies and
                individuals
              </h1>
              <p>
                Our platform offers a comprehensive solution for companies and
                individuals who wish to offset their carbon footprint. Through
                the Redeem and Retirement feature, we facilitate the process of
                purchasing and redeeming carbon credits. Companies can acquire
                credits to compensate for their emissions, while individuals
                also have the opportunity to contribute to a more sustainable
                future. By being part of our community, you will have access to
                a wide range of trustworthy carbon offset projects and
                initiatives, allowing you to make a difference in combating
                climate change.
              </p>
            </div>
            <div className={styles.aboutImage}>
              <img src="/nftImages.svg" alt="nftImages" />
            </div>
          </div>
          <div className={styles.aboutRow}>
            <div className={styles.aboutText}>
              <h1>
                Calculation of your carbon footprint with artificial
                intelligence
              </h1>
              <p>
                We understand that awareness is the first step towards change.
                That{"'"}s why our platform offers an advanced carbon footprint
                calculation functionality. Using artificial intelligence, we
                collect relevant information about your lifestyle, consumption
                habits, and daily activities to provide an accurate estimate of
                your carbon footprint. With this data, you will gain a clear
                understanding of the environmental impact of your actions and
                make informed decisions to reduce your contribution to carbon
                emissions.
              </p>
            </div>
            <div className={styles.aboutImage}>
              <img
                className={styles.aiModal}
                src="/aiModal.png"
                alt="aiModal"
              />
            </div>
          </div>
          <div className={styles.aboutRow}>
            <div className={styles.aboutImage}>
              <img className={styles.aiModal} src="/news.png" alt="news_image" />
            </div>
            <div className={styles.aboutText}>
              <h1>News section about the world of carbon credits</h1>
              <p>
                In our platform, we believe in the importance of education and
                knowledge sharing. Therefore, we offer a dedicated news section
                with updated information about the world of carbon credits. In
                this section, you will find articles, analyses, and relevant
                insights about the latest trends, regulations, and innovations
                in this ever-evolving field. Stay informed about the latest
                developments and be inspired by success stories of
                sustainability projects worldwide.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
