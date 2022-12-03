import {EventTime} from "./event-time";

describe("Test event time", () => {

  const dayInMillis = 24 * 60 * 60 * 1000;

  it("Throw exception when event time is before now", () => {
    // given

    // when
    expect(() => EventTime.of(dayBeforeNow())).toThrow(Error);
  })

  it("Create event time when date is ok.", () => {
    // given

    // when
    expect(() => EventTime.of(dayAfterNow())).not.toThrow(Error);
  })

  function dayBeforeNow() {
    const now = new Date().getTime()
    return new Date(now - dayInMillis);
  }

  function dayAfterNow() {
    const now = new Date().getTime()
    return new Date(now + dayInMillis);
  }

})