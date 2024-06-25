const validate = (formValue: any) => {
  const errors: any = {};
  if (!formValue.password) {
    errors.password = 'Password is required!';
  } else if (formValue.password.length < 4) {
    errors.password = 'Password must be more than 4 characters';
  }

  if (!formValue.user_username) {
    errors.user_username = 'Username is required!';
  } else if (formValue.user_username.length < 4) {
    errors.user_username = 'Username must be more than 4 characters';
  }

  return errors;
};

export default validate;
