import s from "./button.module.sass";
import { Select } from "antd";

const { Option } = Select;

export default function ButtonSort() {
  return (
    <div className={s.container}>
      <div className={s.item}>
        <div>
          <img src="/assets/home/ic_filter.svg" alt="" />
          Filter
        </div>
        <div>
          <Select defaultValue="Game" style={{ width: 110 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Select defaultValue="Bracket" style={{ width: 110 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Select defaultValue="Team size" style={{ width: 110 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        </div>
      </div>
      <div className={s.item}>
        <div>
          <img src="/assets/home/ic_sort.svg" alt="" />
          Sort
        </div>
        <div>
          <Select defaultValue="Prize pool" style={{ width: 110 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Select defaultValue="Time" style={{ width: 110 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}
