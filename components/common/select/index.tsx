import s from "./select.module.sass";
import { Select as AntSelect } from "antd";
const { Option } = AntSelect;

type DropdownItem = { id: string; title: string };
type Props = {
  defaultValue?: string;
  datas: DropdownItem[];
  onSelect: (value: string) => void;
  value?: string;
};
export function Select(props: Props) {
  return (
    <div className={s.input}>
      <AntSelect
        defaultValue={props.defaultValue}
        style={{ background: "transparent" }}
        onChange={props.onSelect}
        value={props.value}
        allowClear
        getPopupContainer={(trigger) =>
          trigger.parentElement.parentElement.parentElement.parentElement
        }
      >
        {props.datas.map((item, idx) => (
          <Option value={item.id} key={`${item.id}_${idx}`}>
            {item.title}
          </Option>
        ))}
      </AntSelect>
    </div>
  );
}