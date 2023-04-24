import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import RollOptions from "../RollOptions.vue";

const vuetify = createVuetify();

describe("RollOptions", () => {
  it("renders properly", () => {
    const wrapper = mount(RollOptions, {
      props: { advanced: true },
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toContain("detail mode");
  });
});
