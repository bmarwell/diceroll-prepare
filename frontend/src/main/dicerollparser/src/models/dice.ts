export interface DiceGroup {
  count: number;
  faces: number;
  options: DiceGroupOptions;
  /** Multiply instead of add the dice results? */
  multiply: boolean;
  chain?: DiceGroupOperation;
}

export interface DiceGroupOperation {
  operation: String;
  diceGroup: DiceGroup;
}

export interface DiceGroupOptions {
  keep: DiceGroupKeepOptions;
  order?: DiceOrderType;
}

export interface DiceGroupKeepOptions {
  enabled: boolean;
  type: DiceKeepType;
  count: number;
}

export enum DiceOrderType {
  ASC = "asc",
  DESC = "desc",
}

export enum DiceKeepType {
  LOWEST = "l",
  HIGHEST = "k",
}

export class DefaultDiceGroup implements DiceGroup {
  count: number;
  faces: number;
  options: DiceGroupOptions;
  multiply: boolean;
  constructor(count: number, faces: number) {
    this.count = count;
    this.faces = faces;
    this.options = {
      keep: {
        enabled: false,
        type: DiceKeepType.HIGHEST,
        count: 1,
      },
    };
    this.multiply = false;
  }
}
