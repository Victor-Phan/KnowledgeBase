const errorParams = new URLSearchParams(window.location.search);
const errors = errorParams.get('errors');
if (!!errors) alert(errors);
