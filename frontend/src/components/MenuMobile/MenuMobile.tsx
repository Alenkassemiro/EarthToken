import { FC, RefObject, useState } from 'react';
import styles from './MenuMobile.module.scss'; // Importe seus estilos CSS aqui
import Link from 'next/link';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { SiOpenbadges } from 'react-icons/si';
import Image from 'next/image';

interface Props {
  transformedAddress: string;
  isDropdownlOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  menuRef: RefObject<HTMLDivElement>;
  wallet: {
    address: string;
    balance: number;
  };
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const MobileMenu: FC<Props> = ({
  transformedAddress,
  isDropdownlOpen,
  setIsDropdownOpen,
  menuRef,
  wallet,
  connectWallet,
  disconnectWallet,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.mobileMenu}>
      {wallet.address !== '' && (
        <div className={styles.accountDetails}>
          <div>
            <div
              className={styles.userIcon}
              onClick={() => setIsDropdownOpen(!isDropdownlOpen)}
            >
              <Image
                width={200}
                height={200}
                src={
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt="Profile Image"
              />
            </div>
            <div
              className={`${styles.dropdownMenu} ${
                isDropdownlOpen ? styles.open : styles.closed
              }`}
              ref={menuRef}
            >
              <ul>
                <li className={styles.dropdownItem}>
                  <SiOpenbadges size={25} fill="black" />
                  <Link href="/retiredTokens">Retired Tokens</Link>
                </li>
                <li className={styles.dropdownItem}>
                  <BiLogOut size={25} fill="black" />
                  <Link onClick={disconnectWallet} href="#">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p>{transformedAddress}</p>
        </div>
      )}
      <div className={styles.menuButton}>
        <button className={styles.toggleBtn} onClick={toggleMenu}>
          <AiOutlineMenu size={40} fill="var(--neutral-0)" />
        </button>
      </div>
      <nav>
        <ul
          className={`${styles.menuItems} ${isOpen ? styles.active : ''} ${
            styles.stroke
          }`}
        >
          {wallet.address !== '' && (
            <div className={styles.accountDetails}>
              <div>
                <div
                  className={styles.userIcon}
                  onClick={() => setIsDropdownOpen(!isDropdownlOpen)}
                >
                  <Image
                    width={200}
                    height={200}
                    src={
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                    alt="Profile Image"
                  />
                </div>
                <div
                  className={`${styles.dropdownMenu} ${
                    isDropdownlOpen ? styles.open : styles.closed
                  }`}
                  ref={menuRef}
                >
                  <ul>
                    <li className={styles.dropdownItem}>
                      <SiOpenbadges size={25} fill="black" />
                      <Link href="/retiredTokens">Retired Tokens</Link>
                    </li>
                    <li className={styles.dropdownItem}>
                      <BiLogOut size={25} fill="black" />
                      <Link onClick={disconnectWallet} href="#">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <p>{transformedAddress}</p>
            </div>
          )}
          <button
            className={`${styles.toggleBtn} ${styles.closeBtn}`}
            onClick={toggleMenu}
          >
            <AiOutlineClose size={40} fill="var(--primary-100)" />
          </button>
          <li className={router.pathname === '/' ? styles.active : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={router.pathname === '/credits' ? styles.active : ''}>
            <Link href="/credits">Credits</Link>
          </li>
          <li className={router.pathname === '/news' ? styles.active : ''}>
            <Link href="/news">News</Link>
          </li>
          <li className={router.pathname === '/about' ? styles.active : ''}>
            <Link href="/about">About</Link>
          </li>

          {wallet.address === '' && (
            <li>
              <button className={styles.loginBtn} onClick={connectWallet}>
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
