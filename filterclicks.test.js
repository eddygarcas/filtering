const { promisify } = require("util");
const  filtering  = require('./filterclicks');

describe("When in the same hour period", () => {
   it ("should save only the most expensive click", async () => {
       const data = JSON.parse(filtering('checkamount.json'))
       expect(data[0].timestamp).toEqual("3/11/2020 02:12:32")
       expect(data[0].amount).toBe(12)
    });
});

describe("When more than one click from the same IP ties for the most expensive click in a one hour", () => {
    it ("should only place the earliest click into the result", async () => {
        const data = JSON.parse(filtering('earlierclick.json'))
        expect(data[0].timestamp).toEqual("3/11/2020 13:02:40")
        expect(data[0].amount).toBe(8)
    });
});

describe("When more than 10 clicks for an IP in the overall array of clicks", () => {
    it ("should not include any of those clicks in the result", async () => {
        const data = JSON.parse(filtering('toomanyclicks.json'))
        expect(data[0]).toBeUndefined()
    });
});

describe("When running a full set of clicks", () => {
    it ("should return a predefined results", async () => {
        const data = JSON.parse(filtering('fullsetclicks.json'))
        expect(data[0].amount).toBe(12)
        expect(data[0].ip).toEqual("11.11.11.11")
        expect(data[1].amount).toBe(7.25)
        expect(data[1].ip).toEqual("11.11.11.11")
        expect(data[2].amount).toBe(4.5)
        expect(data[2].ip).toEqual("11.11.11.11")
        expect(data[3].amount).toBe(11)
        expect(data[3].ip).toEqual("22.22.22.22")
        expect(data[4].amount).toBe(7)
        expect(data[4].ip).toEqual("22.22.22.22")
        expect(data[5].amount).toBe(2)
        expect(data[5].ip).toEqual("22.22.22.22")
        expect(data[6].amount).toBe(15.75)
        expect(data[6].ip).toEqual("33.33.33.33")
        expect(data[7].amount).toBe(8.75)
        expect(data[7].ip).toEqual("44.44.44.44")
        expect(data[8].amount).toBe(8)
        expect(data[8].ip).toEqual("55.55.55.55")
        expect(data[8].timestamp).toEqual("3/11/2020 13:02:40")
        expect(data[9].amount).toBe(5.25)
        expect(data[9].ip).toEqual("55.55.55.55")
        expect(data[10].amount).toBe(14.25)
        expect(data[10].ip).toEqual("66.66.66.66")
    });
});

