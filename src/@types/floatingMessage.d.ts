import commopnMemberTypes from "./commonMemberTypes";

type IFloatingMessageRequired = Required<{
  value: string;
  x: commopnMemberTypes.x;
  y: commopnMemberTypes.y;
  targetX: number;
  targetY: number;
  markedForDeletion: boolean;
  timer: number;
}>;

type IFloatingMessagePartial = Partial<{
  update: () => void;
  draw: (context: CanvasRenderingContext2D) => void;
}>;

type IFloatingMessage = IFloatingMessageRequired & IFloatingMessagePartial;
