const form = document.querySelector("form");
const emailError = document.querySelector(".email.error");
const passwordError = document.querySelector(".password.error");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // reset errors
  emailError.textContent = "";
  passwordError.textContent = "";
  // get values
  const fullname = form.fullname.value;
  const email = form.email.value;
  const password = form.password.value;
  try {
    const res = await fetch("/join", {
      method: "POST",
      body: JSON.stringify({ email, password,fullname }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      window.location.replace("/login");
    }
  } catch (err) {
    console.log(err);
  }
});
