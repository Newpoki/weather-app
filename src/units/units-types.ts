import z from "zod";
import { UNIT_MODE } from "./units-constants";

export const unitModeSchema = z.enum(UNIT_MODE);

export type UnitMode = z.infer<typeof unitModeSchema>;
