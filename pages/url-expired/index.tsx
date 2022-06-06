import React from 'react'
import s from './UrlExpired.module.sass'
import DocHead from "../../components/DocHead";
import {Button} from "antd";
import Footer from "../../components/ui/footer/Footer";
import Link from "next/link";

const UpdateEmailSuccess = () => {
  return (
    <>
      <DocHead />
      <main style={{minHeight: "100vh"}} className={`pt-20 ${s.homeWrap}`}>
        <div className="lucis-container-2">
          <div className={s.urlExpired}>
            <h2>The link has expired, please try again.</h2>
            <div>
              <Link href="/" passHref>
                <Button>Go to homepage</Button>
              </Link>
              <Link href="/profile" passHref>
                <Button>Back to my profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default UpdateEmailSuccess