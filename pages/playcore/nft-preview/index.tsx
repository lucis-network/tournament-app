import React, {useEffect, useState} from "react"
import {Button, Form, Select, Space} from "antd";
import qs from 'querystring';

import P2EWrapper from "components/ui/p2e/p2eWrapper";
import Img from "components/ui/common/Img";

const { Option } = Select;

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const NftPreviewPage = () => {
  const [character, setCharacter] = useState('');
  const [cloth, setCloth] = useState('chuot');
  const [hat, setHat] = useState('chuot');
  const [glasses, setGlasses] = useState('chuot');
  const [weapon, setWeapon] = useState('chuot');
  const [nftImg, setNftImg] = useState('chuot');

  useEffect(() => {
    // weapon=pig&hat=mouse&clother=mouse&face=pig&glass=mouse
    const queryString = qs.stringify({
      character: character,
      clother: cloth,
      hat: hat,
      glass: glasses,
      weapon: weapon,
    })
    const genNftUrl = 'http://localhost:8080/v1/image/mixin?' + queryString;
    console.log('{genNft} genNftUrl: ', genNftUrl);
    // postData(genNftUrl).then((data) => {
    //   console.log('{genNft} data: ', data);
    //   const img = '';
    //   setNftImg(img)
    // });
  }, [character, cloth, hat, glasses, weapon])

  return (
    <P2EWrapper>
      <p style={{color: "white"}}>Select a your NFT parts</p>
      <Space style={{
        color: "white"
      }}>
        <div>
          <p>Character</p>
          <Select defaultValue="chuot" style={{ width: 120 }} onChange={setCharacter}>
            <Option value="chuot">Mouse</Option>
            <Option value="lon">Pig</Option>
            <Option value="trau">Buff</Option>
            <Option value="cho" disabled>Dog</Option>
          </Select>
        </div>

        <div>
          <p>Cloth</p>
          <Select defaultValue="chuot" style={{ width: 120 }} onChange={setCloth}>
            <Option value="chuot">Mouse</Option>
            <Option value="lon">Pig</Option>
            <Option value="trau">Buff</Option>
            <Option value="cho" disabled>Dog</Option>
          </Select>
        </div>

        <div>
          <p>Hat</p>
          <Select defaultValue="chuot" style={{ width: 120 }} onChange={setHat}>
            <Option value="chuot">Mouse</Option>
            <Option value="lon">Pig</Option>
            <Option value="trau">Buff</Option>
            <Option value="cho" disabled>Dog</Option>
          </Select>
        </div>

        <div>
          <p>Glasses</p>
          <Select defaultValue="chuot" style={{ width: 120 }} onChange={setGlasses}>
            <Option value="chuot">Mouse</Option>
            <Option value="lon">Pig</Option>
            <Option value="trau">Buff</Option>
            <Option value="cho" disabled>Dog</Option>
          </Select>
        </div>

        <div>
          <p>Weapon</p>
          <Select defaultValue="chuot" style={{ width: 120 }} onChange={setWeapon}>
            <Option value="chuot">Mouse</Option>
            <Option value="lon">Pig</Option>
            <Option value="trau">Buff</Option>
            <Option value="cho" disabled>Dog</Option>
          </Select>
        </div>

        {/*<div>*/}
        {/*  <p>&nbsp;</p>*/}
        {/*  <Button type="primary">Preview</Button>*/}
        {/*</div>*/}

      </Space>

      <div>
        <Img src={nftImg} srcFallback={'/assets/Raffles/imageReward.png'}/>
      </div>
    </P2EWrapper>
  );
}

export default NftPreviewPage;
