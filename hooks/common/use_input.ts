import { useState } from "react";

export function useInput() {
  const [value, setValue] = useState<string>();
  const [err, setErr] = useState<string | undefined>();

  const onChange = function (_value: any) {
    // console.log("_value: ", _value);
    setErr(undefined);
    if (
      _value &&
      typeof _value === "object" &&
      _value.target != null &&
      _value.target.value != null
    ) {
      setValue(_value.target.value);
    } else {
      setValue(`${_value}`);
    }
  };

  return { value, onChange, setValue, err, setErr };
}
