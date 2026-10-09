<script setup lang="ts">
import { isValidEmail, submitSignup } from "~/utils/waitlist";

const config = useRuntimeConfig();
const email = ref("");
const company = ref("");
const busy = ref(false);
const message = ref("");
const isError = ref(false);
const emailInvalid = ref(false);
const messageClasses = computed(() => ({
  "is-visible": Boolean(message.value),
  "is-error": isError.value,
  "is-success": !isError.value,
}));
const emailInput = useTemplateRef<HTMLInputElement>("emailInput");

function clearMessage() {
  message.value = "";
  emailInvalid.value = false;
}

async function submit() {
  if (busy.value) return;
  clearMessage();
  if (!isValidEmail(email.value)) {
    message.value = "Vul een geldig e-mailadres in.";
    isError.value = true;
    emailInvalid.value = true;
    emailInput.value?.focus();
    return;
  }

  busy.value = true;
  try {
    const result = await submitSignup(config.public, email.value, company.value);
    isError.value = false;
    message.value = result === "existing"
      ? "U staat al op de lijst."
      : "Bedankt. We houden u op de hoogte zodra LexFlow meer kan tonen.";
    if (result === "created") {
      email.value = "";
      company.value = "";
    }
  } catch {
    isError.value = true;
    message.value = !config.public.supabaseUrl || !config.public.supabasePublishableKey
      ? "Inschrijven is momenteel niet beschikbaar. Probeer het later opnieuw."
      : "Dat lukte niet. Probeer het later opnieuw.";
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <form id="waitlist-form" class="waitlist-form company-email-inline" novalidate :aria-busy="busy" @submit.prevent="submit">
    <label class="sr-only" for="company">Bedrijf</label>
    <label class="sr-only" for="email">Email</label>
    <div class="company-email-row">
      <div class="company-email-field company-field">
        <i class="ph ph-buildings field-icon" aria-hidden="true"></i>
        <input
          id="company"
          v-model="company"
          name="company"
          type="text"
          autocomplete="organization"
          placeholder="Bedrijf"
          aria-describedby="form-message"
          :disabled="busy"
          @input="clearMessage"
        />
      </div>
      <div class="company-email-field email-field">
        <i class="ph ph-envelope field-icon" aria-hidden="true"></i>
        <input
          id="email"
          ref="emailInput"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          inputmode="email"
          placeholder="E-mail"
          aria-describedby="form-message"
          :aria-invalid="emailInvalid"
          :disabled="busy"
          required
          @input="clearMessage"
        />
      </div>
      <button type="submit" class="submit-button" :disabled="busy">
        <span>{{ busy ? "Even verwerken..." : "Ik heb interesse" }}</span>
        <i class="ph ph-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
    <p
      id="form-message"
      class="form-message"
      :class="messageClasses"
      role="status"
      aria-live="polite"
    >{{ message }}</p>
  </form>
</template>

<style scoped>
.waitlist-form {
  width: min(670px, 100%);
  margin-top: 26px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr auto;
  overflow: hidden;
  padding: 4px;
  border: 1px solid rgba(10, 59, 48, 0.14);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 14px 34px rgba(31, 62, 51, 0.07);
  backdrop-filter: blur(10px);
}

.input-wrap {
  display: flex;
  align-items: center;
  min-width: 0;
}

.input-wrap:focus-within {
  outline: 3px solid rgba(34, 118, 93, 0.2);
  outline-offset: -2px;
}

.mail-icon {
  font-size: 18px;
  line-height: 1;
  margin-left: 16px;
  flex: 0 0 auto;
  color: #6d817a;
}

input[type="email"] {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  padding: 17px 16px;
  color: var(--ink);
  background: transparent;
}

input[type="email"]::placeholder {
  color: #74867f;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  min-width: 228px;
  border: 0;
  border-radius: 11px;
  padding: 0 22px;
  color: white;
  background: linear-gradient(135deg, #0f664f, #0a503f);
  font-family: var(--sans);
  font-size: 1.03rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
}

.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(13, 94, 73, 0.14);
}

.submit-button:focus-visible {
  outline: 3px solid rgba(34, 118, 93, 0.2);
  outline-offset: 2px;
}

.submit-button:disabled {
  cursor: wait;
  opacity: 0.72;
  transform: none;
}

.submit-button .ph {
  font-size: 18px;
  line-height: 1;
}

.form-note,
.form-message {
  margin: 26px 0 0;
  color: #6c7d77;
  font-size: 0.79rem;
}

.form-message {
  display: none;
}

.form-message.is-visible {
  display: block;
}

.form-message.is-error {
  color: #944839;
}

.form-message.is-success {
  color: #21654f;
}

.company-email-inline {
  width: min(860px, 100%);
}

.company-email-row {
  display: grid;
  grid-template-columns: minmax(170px, 0.78fr) minmax(230px, 1.15fr) auto;
  align-items: stretch;
  overflow: hidden;
  padding: 0;
  border: 1px solid rgba(10, 59, 48, 0.14);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 14px 34px rgba(31, 62, 51, 0.07);
  backdrop-filter: blur(10px);
}

.company-email-field {
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 4px 0;
  background: transparent;
}

.company-email-field.company-field {
  border-right: 1px solid rgba(10, 59, 48, 0.10);
}

.company-email-field .field-icon {
  flex: 0 0 auto;
  margin-left: 16px;
  color: #6d817a;
  font-size: 1.15rem;
}

.company-email-field input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  padding: 17px 14px;
  color: var(--ink);
  background: transparent;
  font: inherit;
}

.company-email-field input::placeholder {
  color: #74867f;
}

.company-email-field:focus-within {
  box-shadow: inset 0 0 0 2px var(--green);
}

.company-field:focus-within {
  border-radius: 13px 0 0 13px;
}

.company-email-inline .submit-button {
  min-width: 220px;
  margin: 4px;
  border-radius: 11px;
}

@media (max-width: 820px) {
  .company-email-row {
    grid-template-columns: 1fr;
  }

  .company-email-field.company-field {
    border-right: 0;
    border-bottom: 1px solid rgba(10, 59, 48, 0.10);
  }

  .company-email-field.email-field {
    border-bottom: 1px solid rgba(10, 59, 48, 0.10);
  }

  .company-email-inline .submit-button {
    width: 100%;
    min-height: 56px;
  }
}

@media (max-width: 760px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .input-wrap {
    min-height: 58px;
  }

  .submit-button {
    width: 100%;
    min-height: 56px;
  }
}
</style>
