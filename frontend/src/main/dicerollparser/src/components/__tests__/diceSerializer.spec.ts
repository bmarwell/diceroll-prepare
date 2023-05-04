import { describe, expect, it } from "vitest";
import {
  DefaultDiceGroup,
  type DiceGroup,
  DiceOrderType,
} from "../../models/dice";
import { serializeDice } from "../../api/diceApi";

describe("diceSerializer", () => {
  it("serializes 2d6", () => {
    // given
    const dice: DiceGroup = new DefaultDiceGroup(2, 6);

    // when
    const out = serializeDice(dice);

    // then
    expect(out).toContain("2d6");
  });

  it("multiplies dice", () => {
    // given
    const dice: DiceGroup = new DefaultDiceGroup(2, 6);
    dice.multiply = true;

    // when
    const out = serializeDice(dice);

    // then
    expect(out).toContain("2d6X");
  });

  it("adds multiple dice", () => {
    // given
    const dice: DiceGroup = new DefaultDiceGroup(2, 6);
    dice.chain = { operation: "+", diceGroup: new DefaultDiceGroup(4, 12) };

    // when
    const out = serializeDice(dice);

    // then
    expect(out).toBe("2d6+4d12");
  });

  it("orders and multiplies dice", () => {
    // given
    const dice: DiceGroup = new DefaultDiceGroup(2, 6);
    dice.multiply = true;
    dice.options.order = DiceOrderType.ASC;

    // when
    const out = serializeDice(dice);

    // then
    expect(out).toBe("2d6Xasc");
  });
});
