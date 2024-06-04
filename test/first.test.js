const { describe } = require("node:test");
const sum = require("./first.tsx");
const { render } = require("@testing-library/react");

test("first test", () => {
    expect(
        sum(1,2)
    ).toBe(3);
})

describe("click button", () => {
    it("on click", () => {
        const {} = render();
    })
})