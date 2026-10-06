export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
}

export async function submitSignup(
  config: { supabaseUrl: string; supabasePublishableKey: string },
  email: string,
  company: string,
): Promise<"created" | "existing"> {
  if (!isValidEmail(email)) {
    throw new Error("Vul een geldig e-mailadres in.");
  }
  if (!config.supabaseUrl || !config.supabasePublishableKey.startsWith("sb_publishable_")) {
    throw new Error("Inschrijven is momenteel niet beschikbaar. Probeer het later opnieuw.");
  }
  const endpoint = new URL("/rest/v1/email_list", config.supabaseUrl);
  if (endpoint.protocol !== "https:") {
    throw new Error("Inschrijven is momenteel niet beschikbaar. Probeer het later opnieuw.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: config.supabasePublishableKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.trim(), ...(company.trim() ? { company: company.trim() } : {}) }),
    signal: AbortSignal.timeout(15_000),
  });

  if (response.ok) return "created";
  if (response.status === 409) {
    const body: unknown = await response.json().catch(() => null);
    if (body && typeof body === "object" && "code" in body && body.code === "23505") {
      return "existing";
    }
  }
  throw new Error("Dat lukte niet. Probeer het later opnieuw.");
}
