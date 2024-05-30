const sum = require("./first.tsx")


test("first test", () => {
    expect(
        sum(1,2)
    ).toBe(3);
})