import { Button } from "./Button";
import { Modal } from "./Modal";

export const InfoModal = ({ toggle, modal }) => {
  return (
    <Modal name={"Info"} modal={modal} toggle={toggle}>
      <div className="text-slate-400">Info</div>
    </Modal>
  );
};
