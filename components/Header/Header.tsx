import Link from "next/link";
import { useRouter } from "next/router";
import s from "./Header.module.sass";
import Image from "../Image";
import AuthBox from "../Auth/components/AuthBox";
import Logo from "assets/icon/logo.png";

type Props = {
  handleMenuOpen: Function;
};

export default function Header(props: Props) {
  const router = useRouter();

  return (
    <div className={`${s.pcMenu} bg-nav`}>
      <div className={`${s.menu_container}`}>
        <div
          className={`container lucis-container py-20px px-0 flex justify-between items-center relative z-10 `}
        >
          <div className={s.logo}>
            <Link href="/" passHref>
              <a>
                <Image src={Logo} alt="logo" priority />
              </a>
            </Link>
            {"IS_TESTNET" && <p>Testnet</p>}
          </div>
          <nav>
            <ul className="flex gap-4 justify-between items-center m-0">
              {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Home</a></li>*/}
              {/* <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                  }}
                  className="text-white text-24px leading-28px p-15px"
                >
                  Home
                </a>
              </li> */}

              <li className={s.groundSubMenu}>
                <a
                  href="https://launchpad-lucis.gitbook.io/lucis-lauchpad-docs/"
                  // onClick={(e) => e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-24px leading-28px "
                >
                  Guide
                </a>
                {/* <ul className={s.subMenu}>
                  <li>For Game Publisher</li>
                  <li>For Personal Investor</li>
                </ul> */}
              </li>

              {/* <li style={{ cursor: "pointer" }}>
                <Notification />
              </li> */}

              {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Roadmap</a></li>*/}
              <li>
                <AuthBox />
              </li>
              {/* TODO: Notification infinite scroll */}
              {/* <li>
                <Notification />
              </li> */}
            </ul>
          </nav>
        </div>
        {/* <InfiniteList /> */}
      </div>
    </div>
  );
}
