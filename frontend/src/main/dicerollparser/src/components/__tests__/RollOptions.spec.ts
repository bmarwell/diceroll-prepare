import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import RollOptions from "../RollOptions.vue";

describe("RollOptions", () => {
  it("renders properly", () => {
    const wrapper = mount(RollOptions, { props: { advanced: true } });
    expect(wrapper.text()).toContain("detail mode");
  });
});
