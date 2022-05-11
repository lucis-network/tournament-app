import { observer } from "mobx-react-lite";
import {Checkbox, InputRef, Modal} from "antd";
import Input from "antd/lib/input/Input";
import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import s from "./AddFavoriteGame.module.sass";
import {CHOOSE_GAME} from "hooks/tournament/useCreateTournament";
import debounce from "lodash/debounce";
import MyProfileStore from "../../../../../../src/store/MyProfileStore";
import {Game} from "../../../../../../src/generated/graphql";
import client from "../../../../../../utils/apollo_client";
import {CheckboxValueType} from "antd/lib/checkbox/Group";

type AddFavoriteGameModalProps = {
  handleCallbackAddGame?: any;
  favoriteGameIDs: string[];
};

export default observer(function AddFavoriteGameModal({handleCallbackAddGame, favoriteGameIDs}: AddFavoriteGameModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGameIDs, setSelectedGameIDs] = useState<CheckboxValueType[]>([]);
  const [gameData, setGameData] = useState<Game[]>([]);
  const inputRef = useRef<InputRef>(null);

  const getDataChooseGame = (gameName: string) => {
    client.query({
      query: CHOOSE_GAME,
      variables: {
        name: gameName
      }
    })
      .then(response => {
        setGameData(response.data.getGame)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const isModalVisible = MyProfileStore.chooseGameModalVisible,
    setIsModalVisible = (isVisible: boolean) =>
      (MyProfileStore.chooseGameModalVisible = isVisible);

  const handleCancel = () => {
    setSearchQuery('');
    setSelectedGameIDs([]);
    setIsModalVisible(false);
    getDataChooseGame('');
  };

  const onSearch = (event: FormEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
    setSelectedGameIDs([]);
    delayedSearch(event.currentTarget.value);
  };

  const onGameSelected = (gameIDs: CheckboxValueType[]) => {
    setSelectedGameIDs(gameIDs);
  };

  const handleOk = () => {
    if ((gameData.length > 0) && (selectedGameIDs.length > 0)) {
      handleCallbackAddGame(selectedGameIDs);
    }
    handleCancel();
  };

  const delayedSearch = useCallback(
    debounce((name: string) => {
      getDataChooseGame(name);
    }, 600),
    []
  );

  useEffect(() => {
    getDataChooseGame(searchQuery)
  }, []);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current!.focus();
    }
  });

  return (
    <Modal
      centered
      title={<span className="font-[600]">Choose Game</span>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className={`${s.container}`}
    >
      <Input placeholder="Search by name" onChange={onSearch} ref={inputRef} value={searchQuery} />
      <div className="mt-10">
        <Checkbox.Group
          onChange={onGameSelected}
          value={selectedGameIDs}
          className={`flex flex-wrap`}
        >
          {gameData.length > 0
            ? gameData.filter((game: Game) => !favoriteGameIDs.includes(game.uid)).map((game: Game) => {
              return (
                <div className={`${s.item}`} key={game.uid}>
                  <Checkbox className={`${s.itemRadio}`} value={game.uid}>
                    {game.logo ? (
                      <img
                        src={game.logo}
                        width="100"
                        height="100"
                        alt={`${game.name}`}
                      />
                    ) : (
                      <img
                        src="/assets/avatar.jpg"
                        width="100"
                        height="100"
                        alt=""
                      />
                    )}
                    <p className="mt-5px">{game.name}</p>
                  </Checkbox>
                </div>
              );
            })
            : ""}
        </Checkbox.Group>
      </div>
    </Modal>
  );
});
