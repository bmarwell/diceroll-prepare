import { describe, it, expect } from "vitest";
import { DiceOrderType, type DiceGroup } from "../../models/dice";
import { serializeDice } from "../../api/diceApi";

describe("diceSerializer", () => {
  it("serializes 2d6", () => {
    // given
    const dice: DiceGroup = { count: 2, faces: 6 };

    // when
    const out = serializeDice(dice);

    // then
    expect(out).toContain("2d6");
  });

  it("multiplies dice", () => {
    // given
    const dice: DiceGroup = { count: 2, faces: 6, multiply: true };

    // when
    const out = serializeDice(dice);

    // then
    expect(out).toContain("2d6X");
  });

  it("adds multiple dice", () => {
    // given
    const dice: DiceGroup = {
      count: 2,
      faces: 6,
      chain: {
        operation: "+",
        diceGroup: { count: 4, faces: 12 },
      },
    };

    // when
    const out = serializeDice(dice);

    // then
    expect(out).toBe("2d6+4d12");
  });

  it("orders and multiplies dice", () => {
    // given
    const dice: DiceGroup = {
      count: 2,
      faces: 6,
      options: { order: DiceOrderType.ASC },
      multiply: true,
    };

    // when
    const out = serializeDice(dice);

    // then
    expect(out).toBe("2d6Xasc");
  });
});
