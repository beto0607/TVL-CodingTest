import { Topic } from "../types/types";

export const compareTopics = (a: Topic, b: Topic): boolean => !!a && !!b && a.id === b.id

export const checkIfPointInBox = ({ x, y }: { x: number, y: number }, box: { x: number, width: number, y: number, heigth: number }): boolean =>
    y >= box.y && y <= (box.y + box.heigth) &&
    x >= box.x && x <= (box.x + box.width)
