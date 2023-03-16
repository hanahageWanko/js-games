import { commonMemberTypes } from "./@types/commonMemberTypes";

type iFloatingMessageRequired = Required<{
  value: string;
  x: commonMemberTypes.x;
  y: commonMemberTypes.y;
  targetX: number;
  targetY: number;
  markedForDeletion: boolean;
  timer: number;
}>;

type iFloatingMessagePartial = Partial<{
  update: () => void;
  draw: (context: CanvasRenderingContext2D) => void;
}>;

type iFloatingMessage = iFloatingMessageRequired & iFloatingMessagePartial;
