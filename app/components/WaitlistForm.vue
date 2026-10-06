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
    <label class="sr-only" for="email">E-mailadres</label>
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
          placeholder="Werk e-mailadres"
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
