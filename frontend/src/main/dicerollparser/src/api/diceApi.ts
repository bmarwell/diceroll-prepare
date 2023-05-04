import type { DiceGroup } from "../models/dice";

const url_roll = "./api/roll";
const url_eval = "./api/eval";

export async function roll(
  dice: DiceGroup,
  showDetails: boolean
): Promise<string> {
  const path = showDetails ? url_roll : url_eval;
  const queryString = serialize(dice);
  const query = new URLSearchParams({
    dice: queryString,
  });
  try {
    const response = await fetch(path + "?" + query, {
      headers: {
        accept: "text/plain",
      },
    });
    if (response.ok) {
      return response.text();
    }
  } catch (error) {
    return Promise.resolve("error");
  }

  return Promise.resolve("");
}

function serialize(die: DiceGroup): string {
  let out = "";
  if (die.count && die.count > 0) {
    out += "" + die.count;
  }

  out += "d";

  if (die.faces) {
    out += "" + die.faces;
  }

  if (die.multiply && die.multiply === true) {
    out += "X";
  }

  if (die.options) {
    if (die.options.keep && die.options.keep.enabled) {
      out += die.options.keep.type + die.options.keep.count;
    }
    if (die.options.order && die.options.order.enabled) {
      out += die.options.order.type.toLowerCase();
    }
  }

  if (die.chain && die.chain.operation) {
    out += "" + die.chain.operation;
    out += "" + serialize(die.chain.diceGroup);
  }

  return out;
}

export function serializeDice(dice: DiceGroup): string {
  return serialize(dice);
}
