import { RefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ethers } from 'ethers';
import Image from 'next/image';

import { SiOpenbadges } from 'react-icons/si';
import { BiLogOut } from 'react-icons/bi';

import styles from './Header.module.scss';
import MobileMenu from '../MenuMobile/MenuMobile';

const Header = () => {
  const [provider, setProvider] = useState({});
  const [wallet, setWallet] = useState({
    address: '',
    balance: 0,
  });
  const [transformedAddress, setTransformedAddress] = useState('');
  const [isDropdownlOpen, setIsDropdownOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      // @ts-ignore
      typeof window.ethereum !== 'undefined' ||
      // @ts-ignore
      typeof window.web3 !== 'undefined'
    ) {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const providerData = {
        network: provider.network,
      };

      localStorage.setItem('provider', JSON.stringify(providerData));
      setProvider(provider);
    } else {
      console.log('Algum erro ocorreu');
    }
  }, []);

  const connectWallet = async () => {
    try {
      // @ts-ignore
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // @ts-ignore
      const wallet = provider.getSigner(account);
      const transformedAddressVar = `${account.substring(
        0,
        4
      )}...${account.slice(-4)}`;
      localStorage.setItem('wallet', JSON.stringify(account));
      
      setTransformedAddress(transformedAddressVar);
      const balance = ethers.utils.formatEther(await wallet.getBalance());
      setWallet({
        address: account,
        // @ts-ignore
        balance: Number(balance).toFixed(2),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      // @ts-ignore
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setWallet({
        address: '',
        balance: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const useOutsideAlerter = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoBx}>
          <Link href="/">
            <img
              src="/logo.png"
              alt="logo"
              onClick={() => console.log(wallet)}
            />
          </Link>
        </div>
        <nav className={styles.stroke}>
          <ul>
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
            {wallet.address !== '' && (
              <>
                <li>
                  <p>{transformedAddress}</p>
                </li>
                <li>
                  <div
                    className={styles.userIcon}
                    onClick={() => setIsDropdownOpen((prevState) => !prevState)}
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
                        <BiLogOut size={25} fill="black" />
                        <Link onClick={disconnectWallet} href="#">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}
            {wallet.address === '' && (
              <li>
                <button className={styles.loginBtn} onClick={connectWallet}>
                  Login
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <MobileMenu
        wallet={wallet}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        isDropdownlOpen={isDropdownlOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        transformedAddress={transformedAddress}
        menuRef={menuRef}
      />
    </>
  );
};

export default Header;
