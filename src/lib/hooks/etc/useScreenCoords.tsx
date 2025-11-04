import {
  Dispatch,
  RefObject,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
interface Coords {
  x: number;
  y: number;
}
export default function useScreenCoords(): {
  coords: Coords;
  isTracking: boolean;
  activeSwipe: RefObject<boolean>;
  setIsTracking: Dispatch<SetStateAction<boolean>>;
  setTouchCoords: Dispatch<SetStateAction<Coords>>;
} {
  const [touchCoords, setTouchCoords] = useState({ x: 0, y: 0 }),
    [isTracking, setIsTracking] = useState<boolean>(false),
    activeSwipe = useRef<boolean>(false),
    { x, y } = useMemo(() => {
      return { x: touchCoords.x, y: touchCoords.y };
    }, [touchCoords.x, touchCoords.y]);
  return {
    coords: { x, y },
    isTracking,
    setIsTracking,
    setTouchCoords,
    activeSwipe,
  };
}
