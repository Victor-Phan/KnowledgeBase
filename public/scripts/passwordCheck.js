const checkPassword = (password, password_check) => {
  if (password.value === password_check.value) {
    return true;
  } else {
    alert('Passwords do not match');
    return false;
  }
};
