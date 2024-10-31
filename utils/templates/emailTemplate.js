module.exports = (loginPage, password) => {
  return `<p>Thanks for signing up! We're excited to have you join our community.</p>
  <p>Your Login Credentials</p>
  <p>Password: ${password}</p>
  <a href="${loginPage}">Login here</a>`;
};
