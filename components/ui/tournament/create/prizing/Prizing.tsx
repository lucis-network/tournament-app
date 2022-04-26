import { observer } from "mobx-react-lite";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  InputRef,
  message,
  Popconfirm,
  Row,
  Select,
} from "antd";
import s from "./index.module.sass";
import { ChainOption } from "utils/Enum";
import { Table } from "antd";
import {
  createContext,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Item from "antd/lib/list/Item";
import { useLocalObservable } from "mobx-react";
import AuthStore from "components/Auth/AuthStore";
import { isBuffer } from "util";
import TournamentStore from "src/store/TournamentStore";

const LUCIS_FEE = 10;
const REFEREER_FEE = 1;
type Props = {};
const { Option } = Select;

const EditableContext = createContext<FormInstance<any> | null>(null);

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface Item {
  key: string;
  name: string;
  quantity: number;
  total: number;
  estimated: number;
}

interface EditableRowProps {
  index: number;
}

interface DataType {
  key: string;
  name: string;
  quantity: number;
  total: number;
  estimated: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

let dataTable = {
  dataSource: [
    {
      key: "0",
      name: "1st place",
      quantity: 1,
      total: 50,
      estimated: 10000,
    },
    {
      key: "1",
      name: "2nd place",
      quantity: 1,
      total: 40,
      estimated: 8000,
    },
    {
      key: "2",
      name: "3rd place",
      quantity: 1,
      total: 10,
      estimated: 2000,
    },
  ],
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const authStore = useLocalObservable(() => AuthStore);

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const calculatePrizing = (record: Item, values: number) => {
    record.total = values;
    record.estimated = (20000 * values) / 100;
    return record;
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      const row = calculatePrizing(record, Number.parseFloat(values.total));
      handleSave({ ...row, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {/* <InputNumber
          formatter={(value) => `${value}%`}
          parser={(value: any) => value.replace("%", "")}
          style={{ color: "black" }}
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          max={100}
          min={1}
        /> */}
        <Input
          //formatter={(value) => `${value}%`}
          //parser={(value: any) => value.replace("%", "")}
          style={{ color: "white" }}
          type="number"
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          max={100}
          min={1}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 20 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default observer(function Prizing(props: Props) {
  const [state, setState] = useState(dataTable);
  const [poolSize, setPoolSize] = useState(20000);
  const [chain, setChain] = useState("USDT");
  let columnsHeader = [
    {
      title: "Team place",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
    },
    {
      title: "Total Allocation (%)",
      dataIndex: "total",
      width: "20%",
      editable: true,
      render: (_: any, record: { key: React.Key; total: number }) => (
        <span>{record.total} %</span>
      ),
    },
    {
      title: "Estimated",
      dataIndex: "estimated",
      render: (_: any, record: { key: React.Key; estimated: number }) => (
        <span>
          {record.estimated} {chain}
        </span>
      ),
    },
    {
      title: "Delete",
      dataIndex: "operation",
      render: (_: any, record: { key: React.Key }) =>
        state.dataSource.length >= 1 ? (
          <Popconfirm
            style={{ color: "white" }}
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
            disabled={record.key != state.dataSource.length - 1 ? true : false}
          >
            <img src="/assets/iconDelete.png" width={15} height={15} alt="" />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key: React.Key) => {
    const dataSource = [...state.dataSource];
    setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  };

  const handleAdd = () => {
    const { dataSource } = state;
    const newData: DataType = {
      key: dataSource.length.toString(),
      name: (dataSource.length + 1).toString() + "th place",
      quantity: 1,
      total: 0,
      estimated: 0,
    };
    setState({
      dataSource: [...dataSource, newData],
    });
  };

  const handleSave = (row: DataType) => {
    let newData = [...state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    const total = calculateTotalAllocation(newData);
    if (total > 100) message.error("Total Allocation must be equal to 100%");
    else {
      setState({ dataSource: newData });
    }
  };

  const calculateTotalAllocation = (newData: any) => {
    let total = 0;
    newData.forEach((item: { total: any }, idx: number) => {
      total += Number.parseFloat(item.total);
    });
    return total;
  };

  function onChange(value: number) {
    setPoolSize(value);
  }

  useEffect(() => {
    TournamentStore.pool_size = poolSize;
    recalculateEstimated();
  }, [poolSize]);

  useEffect(() => {}, [state]);

  useEffect(() => {
    TournamentStore.currency_uid = chain;
  }, [chain]);

  const recalculateEstimated = () => {
    const dataSource = [...state.dataSource];
    dataSource.forEach((item) => {
      item.estimated = (poolSize * item.total) / 100;
    });
    setState({ dataSource: dataSource });
  };

  const { dataSource } = state;
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = columnsHeader.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  const totalPool = () => {
    return (
      poolSize +
      (poolSize * LUCIS_FEE) / 100 +
      (poolSize * REFEREER_FEE) / 100
    ).toFixed(2);
  };
  return (
    <div className={s.container}>
      <div>
        <p>Initial pool size</p>
        <Row>
          <Col span={3}>
            <InputNumber
              type="number"
              prefix="$"
              style={{ width: "99%" }}
              min={1}
              defaultValue={20000}
              onChange={onChange}
            />
          </Col>
          <Col span={3}>
            <Select
              defaultValue="USDT"
              onChange={(value) => {
                setChain(value);
              }}
            >
              {ChainOption.map((item, index) => {
                return (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </div>

      <div className="pt-4">
        <p>Prize Allocation</p>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table
          className={s.container_table}
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          pagination={false}
        />
      </div>

      <div className="pt-4">
        <Row>
          <Col span={2}>
            <p>Lucis fee</p>
          </Col>
          <Col span={2}></Col>
          <Col span={2}>
            <p>Referees fee</p>
          </Col>
        </Row>
        <Row>
          <Col span={2}>
            <Input
              prefix="$"
              //type="number"
              defaultValue={LUCIS_FEE + "%"}
              disabled
            />
          </Col>
          <Col span={2}></Col>
          <Col span={2}>
            <Input
              prefix="$"
              //type="number"
              defaultValue={REFEREER_FEE + "%"}
              disabled
            />
          </Col>
          <Col span={12}></Col>
          <Col span={6}>
            <p>
              Total : {totalPool()} {chain}
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
});
