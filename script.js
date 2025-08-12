// script.js — SA Property Care (Formspree: xnnzwgvq)
// Works with the form: <form id="quoteForm"> ... </form>

(() => {
  const FORM_ID = "xnnzwgvq";
  const ENDPOINT = `https://formspree.io/f/${FORM_ID}`;

  const form = document.getElementById("quoteForm");
  if (!form) return;

  // Optional inline status message
  let status = document.getElementById("formStatus");
  if (!status) {
    status = document.createElement("div");
    status.id = "formStatus";
    status.style.marginTop = "8px";
    status.style.fontSize = "14px";
    form.appendChild(status);
  }

  const submitBtn = form.querySelector('button[type="submit"]');

  function setStatus(msg, ok = true) {
    status.textContent = msg;
    status.style.color = ok ? "#0b4a2f" : "#8b0000";
  }

  function validate() {
    const name = form.querySelector('[name="name"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name) return "Please enter your name.";
    if (!phone) return "Please enter your phone number.";
    if (!message) return "Please tell us what you need help with.";
    return null;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setStatus(error, false);
      return;
    }

    // Disable button to prevent double submits
    const originalText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }
    setStatus("");

    try {
      const data = new FormData(form);

      // Optional extras for Formspree:
      // data.append("_subject", "Free Quote Request - SA Property Care");
      // Honeypot (add a hidden input named _gotcha in your HTML for spam reduction)

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && !json.error) {
        setStatus(
          "Thanks! We received your request and will reply shortly. You can reply to our email with photos if needed.",
          true
        );
        form.reset();
      } else {
        setStatus("There was an issue sending your request. Please call us.", false);
      }
    } catch {
      setStatus("Network error. Please call us.", false);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || "Send Request";
      }
    }
  });
})();
