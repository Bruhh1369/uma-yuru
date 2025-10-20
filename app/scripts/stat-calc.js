const rules = [
    {
        max: 49,
        cond: (i) => (i % 2 ? 1: 0)
    },
    {
        max: 99,
        cond: (i, d) => (d === 0 ? 0: 1)
    },
    {
        max: 149,
        cond: () => 1
    },
    {
        max: 199,
        cond: (i, d) => ([3, 6, 9].includes(d) ? 2: 1)
    },
    {
        max: 249,
        cond: (i, d) => ([0, 2, 5, 7].includes(d) ? 1: 2)
    },
    {
        max: 299,
        cond: (i, d) => ([0, 5].includes(d) ? 1: 2)
    },
    {
        max: 349,
        cond: (i, d) => (d === 9 ? 3: 2)
    },
    {
        max: 399,
        cond: (i, d) => ([2, 4, 7, 9].includes(d) ? 3: 2)
    },
    {
        max: 449,
        cond: (i, d) => ([0, 2, 5, 7].includes(d) ? 2: 3)
    },
    {
        max: 499,
        cond: (i, d) => ([0, 5].includes(d) ? 2: 3)
    },
    {
        max: 549,
        cond: (i, d) => (d === 0 ? 2: 3)
    },
    {
        max: 599,
        cond: () => 3
    },
    {
        max: 649,
        cond: (i, d) => (d === 9 ? 4: 3)
    },
    {
        max: 699,
        cond: (i, d) => ([3, 6, 9].includes(d) ? 4: 3)
    },
    {
        max: 749,
        cond: (i, d) => ([2, 4, 7, 9].includes(d) ? 4: 3)
    },
    {
        max: 799,
        cond: (i) => (i % 2 ? 4: 3)
    },
    {
        max: 849,
        cond: (i, d) => (d === 0 ? 3: 4)
    },
    {
        max: 899,
        cond: (i, d) => (d === 9 ? 5: 4)
    },
    {
        max: 949,
        cond: (i, d) => ([4, 9].includes(d) ? 5: 4)
    },
    {
        max: 999,
        cond: (i, d) => ([3, 6, 9].includes(d) ? 5: 4)
    },
    {
        max: 1049,
        cond: (i, d) => ([4, 9].includes(d) ? 6: 5)
    },
    {
        max: 1099,
        cond: (i) => (i % 2 ? 6: 5)
    },
    {
        max: 1149,
        cond: (i, d) => ([0, 2, 5, 7].includes(d) ? 6: 7)
    },
    {
        max: 1199,
        cond: (i, d) => ([0, 5].includes(d) ? 6: 7)
    },
    {
        max: Infinity,
        cond: () => 6
    },
];

const calculateStatusIncrease = (status) => {
    const last = status % 10;
    const rule = rules.find(r => status <= r.max);
    return rule ? rule.cond(status, last): 0;
};

export const getTotalStatusPoints = (status) => {
    return Array.from({
        length: status
    }, (_, i) => calculateStatusIncrease(i + 1))
    .reduce((a, b) => a + b, 0) - 5;
}