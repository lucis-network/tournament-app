import { useEffect, useState } from "react";

export function useCopy() {
  const [isCopied, setCopied] = useState(false);
  useEffect(() => {
    let timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  function onCopy(content: string) {
    navigator.clipboard.writeText(content);
  }
  return {
    isCopied,
    setCopied,
    onCopy,
  };
}
