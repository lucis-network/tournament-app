import { useEffect, useState } from "react";
import s from "./Header.module.sass";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Divider, List } from "antd";

const InfiniteList = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className={s.infinite}>
      <div className={s.infiniteContainer} id="list">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 100}
          loader={
            <Divider style={{ color: "white" }} plain>
              Loading...
            </Divider>
          }
          endMessage={
            <Divider style={{ color: "white" }} plain>
              It is all, nothing more 🤐
            </Divider>
          }
          scrollableTarget="list"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={
                    <p style={{ color: "white", margin: 0 }}>{item.email}</p>
                  }
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteList;
