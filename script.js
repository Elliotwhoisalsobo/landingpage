/**
 * LexFlow waitlist form.
 * - Validates the email address in the browser.
 * - Inserts into Supabase when configured.
 * - Falls back to localStorage for local/demo use.
 */
(() => {

  const form = document.querySelector('#waitlist-form');

  const emailInput = document.querySelector('#email');

  const submitButton = form?.querySelector('button[type="submit"]');

  const message = document.querySelector('#form-message');

  const companyInput = document.querySelector('#company');

  if (!form || !emailInput || !companyInput || !submitButton || !message) return;

  const originalButtonText = submitButton.querySelector('span')?.textContent || 'Blijf op de hoogte';

  function showMessage(text, type) {

    message.textContent = text;

    message.className = `form-message is-visible ${type === 'error' ? 'is-error' : 'is-success'}`;

  }

  function clearMessage() {

    message.textContent = '';

    message.className = 'form-message';

  }

  function setLoading(isLoading) {

    submitButton.disabled = isLoading;

    const label = submitButton.querySelector('span');

    if (label) label.textContent = isLoading ? 'Even verwerken...' : originalButtonText;

  }

  function isValidEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);

  }

  function saveDemoSignup(email, company) {

    const key = 'lexflow_waitlist_demo';

    const signups = JSON.parse(localStorage.getItem(key) || '[]');

    if (!signups.some((item) => item.email.toLowerCase() === email.toLowerCase())) {

      signups.push({

        email,
        company: company || null,

        createdAt: new Date().toISOString()

      });

      localStorage.setItem(key, JSON.stringify(signups));

    }

  }

  emailInput.addEventListener('input', clearMessage);

  form.addEventListener('submit', async (event) => {

    event.preventDefault();

    clearMessage();

    const email = emailInput.value.trim();
    const company = companyInput.value.trim();

    if (!isValidEmail(email)) {

      showMessage('Vul een geldig e-mailadres in.', 'error');

      emailInput.focus();

      return;

    }

    setLoading(true);

    try {

      const supabaseUrl = window.SUPABASE_URL;

      const supabaseKey = window.SUPABASE_KEY;

      if (supabaseUrl && supabaseKey) {

        const sb = supabase.createClient(supabaseUrl, supabaseKey);

        const insertData = { email }; // mandatory
        if (company) insertData.company = company; // optional 

        const { error } = await sb

          .from('email_list')

          .insert(insertData);
          

        if (error) {

          if (error.code === '23505') {

            showMessage('U staat al op de lijst.', 'success');

          } else {

            throw new Error(error.message);

          }

        } else {

          form.reset();

          showMessage('Bedankt. We houden u op de hoogte zodra LexFlow meer kan tonen.', 'success');

        }

      } else {

        // Demo fallback: bewaar lokaal in de browser.

        // Vul config/supabase-config.js in om Supabase te gebruiken.

        saveDemoSignup(email, company);

        form.reset();

        showMessage('Bedankt. We houden u op de hoogte zodra LexFlow meer kan tonen.', 'success');

      }

    } catch (error) {

      console.error(error);

      showMessage('Dat lukte niet. Probeer het later opnieuw.', 'error');

    } finally {

      setLoading(false);

    }

  });

})();

/* Product popups — uitgeschakeld */
// (() => {

//   const cards = document.querySelectorAll('[data-popup]');

//   const overlays = document.querySelectorAll('.popup-overlay');

//   function openPopup(id) {

//     const popup = document.getElementById(id);

//     if (popup) popup.hidden = false;

//   }

//   function closeAll() {

//     overlays.forEach((el) => el.hidden = true);

//   }

//   cards.forEach((card) => {

//     card.addEventListener('click', () => openPopup(card.dataset.popup));

//   });

//   overlays.forEach((overlay) => {

//     /* Sluit bij klik op de achtergrond, niet op de popup zelf */

//     overlay.addEventListener('click', (e) => {

//       if (e.target === overlay) closeAll();

//     });

//     /* Sluitknop */

//     const btn = overlay.querySelector('.popup-close');

//     if (btn) btn.addEventListener('click', () => closeAll());

//   });

//   /* Escape-toets sluit alle popups */

//   document.addEventListener('keydown', (e) => {

//     if (e.key === 'Escape') closeAll();

//   });

// })();