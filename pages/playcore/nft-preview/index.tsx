import React, {useCallback, useEffect, useState} from "react"
import {Button, Form, Select, Space} from "antd";
import qs from 'querystring';

import P2EWrapper from "components/ui/p2e/p2eWrapper";
import Img from "components/ui/common/Img";
import {randomPick} from "../../../utils/Array";
import s from './nft-preview.module.sass'
import { isClient } from "../../../utils/Env";
import { useRouter } from 'next/router';

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

const halo_items: Record<string, string> = {
  'galaxy': 'Galaxy',
  'fire': 'Fire',
  'metal': 'Metal',
  'wood': 'Wood',
  'soil': 'Soil',
  'water': 'Water',
}

const characters = Object.keys(characters_config)
const halos = Object.keys(halo_items)

const NftPreviewPage = () => {
  const queryString = isClient ? window.location.search : '';
  const queryParams = qs.parse(queryString.substring(1, queryString.length))
  console.log('{NftPreviewPage} queryParams: ', queryParams);

  const {
    character: _character,
    cloth: _cloth,
    hat: _hat,
    glasses: _glasses,
    weapon: _weapon,
    halo: _halo,
    haloLv: _haloLv,
    rarityLv: _rarityLv,
  } = queryParams;


  const [character, setCharacter] = useState(_character ?? 'mouse');
  const [cloth, setCloth] = useState(_cloth ?? 'mouse');
  const [hat, setHat] = useState(_hat ?? 'mouse');
  const [glasses, setGlasses] = useState(_glasses ?? 'mouse');
  const [weapon, setWeapon] = useState(_weapon ?? 'mouse');
  const [halo, setHalo] = useState(_halo ?? 'water');
  const [haloLv, setHaloLv] = useState(_haloLv ?? 1);
  const [rarityLv, setRarityLv] = useState(_rarityLv ?? 1);

  const [bg, setBg] = useState('black');
  const [nftImg, setNftImg] = useState('');
  const [generating, setGenerating] = useState(false);
  const [cpBtnText, setCpBtnText] = useState("Copy Link");
  const [errorMsg, setErrorMsg] = useState("");

  const defaultImgUri = '/assets/Raffles/imageReward.png';
  const trelloLink = '<a href="https://trello.com/c/5K2jvFzl/411-gh%C3%A9p-nft-ch%C6%B0a-chu%E1%BA%A9n" target="_blank" rel="noreferrer">Trello Check list này</a>';

  const router = useRouter();

  const getMixerQueryStr = useCallback(() => {
    return {
      face: character,
      clother: cloth,
      hat,
      glass: glasses,
      weapon,
      halo,
      halo_level: haloLv,
      level: rarityLv,
    }
  }, [character, cloth, hat, glasses, weapon, halo, haloLv, rarityLv])

  const getAppQueryStr = useCallback(() => {
    return {
      character, cloth, hat, glasses, weapon, halo, haloLv, rarityLv
    } as Record<string, string>
  }, [character, cloth, hat, glasses, weapon, halo, haloLv, rarityLv])

  const aliasToLinkWithoutRouterChange = useCallback(() => {
    const newParams: Record<string, string> = getAppQueryStr();
    console.log('{aliasToLinkWithoutRouterChange.replace} newParams: ', newParams);

    const url = new URL(location.href);

    const keys = Object.keys(newParams);
    for (let i = 0, c = keys.length; i < c; i++) {
      const k = keys[i];
      const v = newParams[k];
      url.searchParams.set(k, v);
    }

    history.pushState(null, '', url);
  }, [getAppQueryStr]);

  useEffect(() => {
    // weapon=pig&hat=mouse&clother=mouse&face=pig&glass=mouse
    const newQueryString = getMixerQueryStr();
    const genNftUrl = 'https://nft-img-mixer.lucis.network/v1/image/mixin?' + qs.stringify(newQueryString);
    console.log('{genNft} genNftUrl: ', genNftUrl);

    setGenerating(true);
    postData(genNftUrl)
      .then((res) => {
        console.log('{genNft} res: ', res);
        setGenerating(false);
        aliasToLinkWithoutRouterChange();

        if (res.status !== 200) {
          setNftImg(defaultImgUri)
          setErrorMsg("Image cannot be generated due to Internal server error: Please click `Copy Link` and then paste it to " + trelloLink + " to fix this.")
          return;
        }

        const img = res.data.medium;
        const baseImgUri = 'https://nft-img-mixer.lucis.network'
        setNftImg(baseImgUri + img)
        setErrorMsg("")
      });
  }, [getMixerQueryStr, aliasToLinkWithoutRouterChange])

  const randomNft = useCallback(() => {
    setCharacter(randomPick(characters));
    setCloth(randomPick(characters));
    setHat(randomPick(characters));
    setGlasses(randomPick(characters));
    setWeapon(randomPick(characters));
    setHalo(randomPick(halos));
    setHaloLv(randomPick([1,2,3,4,5,6]));
    setRarityLv(randomPick([1,2,3,4,5,6]));
  }, [
    setCharacter,
    setCloth,
    setHat,
    setGlasses,
    setWeapon,
    setHalo,
    setHaloLv,
    setRarityLv,
  ])

  const copyLink = useCallback(() => {
    const baseLink = 'https://play-beta.lucis.network/playcore/nft-preview';
    const nftParams = qs.stringify(getAppQueryStr());
    const nftPreviewLink = baseLink + '?' +  nftParams;

    navigator.clipboard.writeText(nftPreviewLink);

    setCpBtnText('Copied');
    setTimeout(() => {
      setCpBtnText('Copy Link');
    }, 3000)
  }, [getAppQueryStr, setCpBtnText])

  return (
    <P2EWrapper>
      <div className="lucis-container-2" style={{
        padding: '12px 24px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Space className={s.nftForm} align={"center"}>
          <div>
            <p>Character</p>
            <Select defaultValue="mouse" style={{ width: 100 }} onChange={setCharacter} value={character}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Cloth</p>
            <Select defaultValue="mouse" style={{ width: 100 }} onChange={setCloth} value={cloth}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Hat</p>
            <Select defaultValue="mouse" style={{ width: 100 }} onChange={setHat} value={hat}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Glasses</p>
            <Select defaultValue="mouse" style={{ width: 100 }} onChange={setGlasses} value={glasses}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Weapon</p>
            <Select defaultValue="mouse" style={{ width: 100 }} onChange={setWeapon} value={weapon}>
              {characters.map(i => (
                <Option key={i} value={i}>{characters_config[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Halo</p>
            <Select style={{ width: 100 }} onChange={setHalo} value={halo}>
              {halos.map(i => (
                <Option key={i} value={i}>{halo_items[i]}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Halo Level</p>
            <Select style={{ width: 100 }} onChange={setHaloLv} value={haloLv}>
              {[1,2,3,4,5,6].map(i => (
                <Option key={i} value={i}>{i}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Rarity Level</p>
            <Select style={{ width: 100 }} onChange={setRarityLv} value={rarityLv}>
              {[1,2,3,4,5,6].map(i => (
                <Option key={i} value={i}>{i}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Background</p>
            <Select style={{ width: 100 }} onChange={setBg} value={bg}>
              {['black', 'white', 'green'].map(i => (
                <Option key={i} value={i}>{i}</Option>
              ))}
            </Select>
          </div>

          <div>
            <p>&nbsp;</p>
            <Button type="primary" onClick={randomNft} loading={generating}>Randomize</Button>
          </div>
          {/*<div>*/}
          {/*  <p>&nbsp;</p>*/}
          {/*  <Button type="ghost" onClick={copyLink}>{cpBtnText}</Button>*/}
          {/*</div>*/}

        </Space>

        <div className={s.previewWrapper}>
          <div className={s.previewImgC} style={{background: bg,}}>
            <Img src={nftImg} srcFallback={defaultImgUri} />
          </div>

          {errorMsg
            ? <p className={s.errMsg} dangerouslySetInnerHTML={{__html: errorMsg}} />
            : <p
              className={s.infoMsg}
              dangerouslySetInnerHTML={{__html: 'Nếu thấy ảnh nào bị xấu/lệch/đè layer thì copy link paste vào ' + trelloLink + ' nhá ae!'}}
            />
          }
        </div>

      </div>
    </P2EWrapper>
  );
}

export default NftPreviewPage;
