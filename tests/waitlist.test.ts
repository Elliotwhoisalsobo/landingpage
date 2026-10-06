import assert from "node:assert/strict";
import { test } from "node:test";
import { isValidEmail, submitSignup } from "../app/utils/waitlist.ts";

const config = {
  supabaseUrl: "https://voorbeeld.supabase.co",
  supabasePublishableKey: "sb_publishable_test",
};

test("wachtlijst valideert invoer en verwerkt API-antwoorden zonder echt netwerk", async (t) => {
  const requests: { url: string; options?: RequestInit }[] = [];
  let response = new Response(null, { status: 201 });
  let networkError = false;
  t.mock.method(globalThis, "fetch", async (input: URL | string, options?: RequestInit) => {
    requests.push({ url: String(input), options });
    if (networkError) throw new TypeError("Geen verbinding");
    return response;
  });

  assert.ok(isValidEmail(" bo+test@voorbeeld.be "));
  for (const email of ["", "geen-adres", "a@b", "a b@c.be"]) {
    assert.equal(isValidEmail(email), false);
    await assert.rejects(submitSignup(config, email, ""), /geldig e-mailadres/);
  }
  await assert.rejects(submitSignup({ ...config, supabaseUrl: "" }, "bo@voorbeeld.be", ""), /niet beschikbaar/);
  for (const key of ["", "sb_secret_geheim", "eyJ_geheim"]) {
    await assert.rejects(submitSignup({ ...config, supabasePublishableKey: key }, "bo@voorbeeld.be", ""), /niet beschikbaar/);
  }
  await assert.rejects(submitSignup({ ...config, supabaseUrl: "http://voorbeeld.be" }, "bo@voorbeeld.be", ""), /niet beschikbaar/);
  await assert.rejects(submitSignup({ ...config, supabaseUrl: "ongeldig" }, "bo@voorbeeld.be", ""));
  assert.equal(requests.length, 0);

  assert.equal(await submitSignup(config, " bo@voorbeeld.be ", " LexFlow "), "created");
  assert.equal(requests[0]?.url, "https://voorbeeld.supabase.co/rest/v1/email_list");
  assert.equal(requests[0]?.options?.method, "POST");
  assert.deepEqual(JSON.parse(String(requests[0]?.options?.body)), { email: "bo@voorbeeld.be", company: "LexFlow" });
  const headers = new Headers(requests[0]?.options?.headers);
  assert.equal(headers.get("apikey"), config.supabasePublishableKey);
  assert.equal(headers.get("Content-Type"), "application/json");
  assert.equal(headers.has("Authorization"), false);
  assert.ok(requests[0]?.options?.signal instanceof AbortSignal);

  response = new Response(null, { status: 201 });
  await submitSignup(config, "bo@voorbeeld.be", "  ");
  assert.deepEqual(JSON.parse(String(requests[1]?.options?.body)), { email: "bo@voorbeeld.be" });

  response = Response.json({ code: "23505" }, { status: 409 });
  assert.equal(await submitSignup(config, "bo@voorbeeld.be", ""), "existing");
  for (const failure of [
    Response.json({ code: "23503" }, { status: 409 }),
    new Response("geen JSON", { status: 409 }),
    Response.json(null, { status: 409 }),
    new Response("geen JSON", { status: 500 }),
    new Response(null, { status: 401 }),
  ]) {
    response = failure;
    await assert.rejects(submitSignup(config, "bo@voorbeeld.be", ""), /Dat lukte niet/);
  }
  networkError = true;
  await assert.rejects(submitSignup(config, "bo@voorbeeld.be", ""), /Geen verbinding/);
});
