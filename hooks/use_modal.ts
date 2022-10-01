import { useState } from "react";

export function useModal<T>(defaultValue = false) {
  const [isOpen, setOpen] = useState(defaultValue);
  const [data, setData] = useState<T>();

  function onClose() {
    console.log("onClose");
    setOpen(false);
  }
  function onCloseWith(value?: T) {
    onClose();
    setData(value);
  }

  return {
    isOpen,
    setOpen,
    onClose,
    onCloseWith,
    data,
    setData,
  };
}
