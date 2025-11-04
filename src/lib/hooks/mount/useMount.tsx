import { useEffect, useState } from "react";

export function useMount(): {
  mounted: boolean;
  setMounted: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), [setMounted]);
  return { mounted, setMounted };
}
