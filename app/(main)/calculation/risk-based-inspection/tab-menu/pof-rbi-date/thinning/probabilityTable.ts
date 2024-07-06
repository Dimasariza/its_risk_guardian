const prior = [
    {
        state: "Pr1",
        low: 0.5,
        medium: 0.7,
        high: 0.8
    },
    {
        state: "Pr2",
        low: 0.3,
        medium: 0.2,
        high: 0.15
    },
    {
        state: "Pr3",
        low: 0.2,
        medium: 0.1,
        high: 0.05
    }
]

const conditional = [
    {
        state: "Co1",
        e: 0.33,
        d: 0.4,
        c: 0.5,
        b: 0.7,
        a: 0.9
    },
    {
        state: "Co2",
        e: 0.33,
        d: 0.33,
        c: 0.3,
        b: 0.2,
        a: 0.09
    },
    {
        state: "Co3",
        e: 0.33,
        d: 0.27,
        c: 0.2,
        b: 0.1,
        a: 0.01
    }
]

export { prior, conditional }