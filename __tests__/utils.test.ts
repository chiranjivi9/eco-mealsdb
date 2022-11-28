import { processFetchById } from "../src/utils";
import { EXPECTED_OUTPUT, MOCK_DATA } from "./constants/TestConstants";

describe("utils.ts tests", () => {
  test("METHOD processFetchById() ", async () => {
    let res = await processFetchById(MOCK_DATA);
    expect(res.isSuccess).toEqual(true);
    expect(res).toEqual(EXPECTED_OUTPUT);
  });
});
