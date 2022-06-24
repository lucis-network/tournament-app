import { Modal } from "antd";
import { useRouter } from "next/router";
import s from "./index.module.sass";
import { WarningOutlined } from "@ant-design/icons";

type Props = {
  status?: boolean;
  onCancel: () => void;
};

const PopupNotifyProfile = (props: Props) => {
  const { status, onCancel } = props;
  const router = useRouter();

  const handleRoutes = (route: string) => {
    router.push(route);
  };

  return (
    <Modal
      visible={status}
      centered
      className={s.content_modal}
      footer={null}
      title="Notify"
      onCancel={onCancel}
    >
      <div>
        <div className="flex align-middle">
          <div className="w-8 mr-4">
            <WarningOutlined className="text-28px !text-white" />
          </div>
          <p className="text-left">
            You need to fill in your email first. We will notify you when the
            tournament has any updates
          </p>
        </div>
        <div className="flex justify-end align-middle items-center mt-2">
          <button
            className={`${s.button} mr-4 !w-max`}
            onClick={() => handleRoutes(`/profile?page=edit`)}
          >
            Go to my profile
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupNotifyProfile;
