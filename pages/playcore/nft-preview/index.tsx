import React, {useCallback, useEffect, useState} from "react"
import {Button, Form, Select, Space} from "antd";
import qs from 'querystring';

import P2EWrapper from "components/ui/p2e/p2eWrapper";
import Img from "components/ui/common/Img";
import {randomPick} from "../../../utils/Array";
import s from './nft-preview.module.sass'

const { Option } = Select;

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const characters_config: Record<string, string> = {
  "mouse": "Mouse",
  "buffalo": "Buffalo",
  "tiger": "Tiger",
  "cat": "Cat",
  "dragon": "Dragon",
  "snake": "Snake",
  "horse": "Horse",
  "goat": "Goat",
  "monkey": "Monkey",
  "chicken": "Chicken",
  "dog": "Dog",
  "pig": "Pig",
}
const characters = Object.keys(characters_config)

const NftPreviewPage = () => {
  const [character, setCharacter] = useState('mouse');
  const [cloth, setCloth] = useState('mouse');
  const [hat, setHat] = useState('mouse');
  const [glasses, setGlasses] = useState('mouse');
  const [weapon, setWeapon] = useState('mouse');
  const [nftImg, setNftImg] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    // weapon=pig&hat=mouse&clother=mouse&face=pig&glass=mouse
    const queryString = qs.stringify({
      face: character,
      clother: cloth,
      hat: hat,
      glass: glasses,
      weapon: weapon,
    })
    const genNftUrl = 'https://nft-img-mixer.lucis.network/v1/image/mixin?' + queryString;
    console.log('{genNft} genNftUrl: ', genNftUrl);

    setGenerating(true);
    postData(genNftUrl)
      .then((res) => {
        console.log('{genNft} res: ', res);
        setGenerating(false);

        if (res.status !== 200) {
          return;
        }

        const img = res.data.medium;
        const baseImgUri = 'https://nft-img-mixer.lucis.network'
        setNftImg(baseImgUri + img)
      });
  }, [character, cloth, hat, glasses, weapon])

  const randomNft = useCallback(() => {
    setCharacter(randomPick(characters));
    setCloth(randomPick(characters));
    setHat(randomPick(characters));
    setGlasses(randomPick(characters));
    setWeapon(randomPick(characters));
  }, [
    setCharacter,
    setCloth,
    setHat,
    setGlasses,
    setWeapon,
  ])

  return (
    <P2EWrapper>
      <div className="lucis-container-2" style={{
        padding: '12px 24px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h3 style={{color: "white"}}>Select your NFT specs:</h3>
        <Space className={s.nftForm} align={"center"}>
          <div>
            <p>Character</p>
            <Select defaultValue="mouse" style={{ width: 120 }} onChange={setCharacter} value={character}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Cloth</p>
            <Select defaultValue="mouse" style={{ width: 120 }} onChange={setCloth} value={cloth}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Hat</p>
            <Select defaultValue="mouse" style={{ width: 120 }} onChange={setHat} value={hat}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Glasses</p>
            <Select defaultValue="mouse" style={{ width: 120 }} onChange={setGlasses} value={glasses}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Weapon</p>
            <Select defaultValue="mouse" style={{ width: 120 }} onChange={setWeapon} value={weapon}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>&nbsp;</p>
            <Button type="primary" onClick={randomNft} loading={generating}>Randomize</Button>
          </div>

        </Space>

        <div style={{
          padding: 50,
          display: "flex",
          justifyContent: "center",
        }}>
          <div style={{
            border: '1px solid #000',
            background: '#e6e6e6',
            width: '60%',
          }}>
            <Img src={nftImg} srcFallback={'/assets/Raffles/imageReward.png'} />
          </div>
        </div>
      </div>
    </P2EWrapper>
  );
}

export default NftPreviewPage;
