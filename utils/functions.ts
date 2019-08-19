import { Topic } from "../types/types";

export const compareTopics = (a: Topic, b: Topic): boolean => !!a && !!b && a.id === b.id

export const checkIfYInBox = (y: number, box: { y: number, heigth: number }): boolean => y >= box.y && y <= (box.y + box.heigth)