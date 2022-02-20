import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe("Pruebas en el helper Fetch", () => {
  let token = "";

  test("fetchSinToken debe de funcionar ", async () => {
    const resp = await fetchSinToken(
      "auth",
      { email: "paul@gmail.com", password: "123456" },
      "POST"
    );
    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(body.ok).toBe(true);
    token = body.token;
  });

  test("ftchConToken debe de funcionar", async () => {
    localStorage.setItem("token", token);
    const resp = await fetchConToken("events");
    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(resp.status != 401).toBe(true)
    expect(body.ok).toBe(true);
  });
});
