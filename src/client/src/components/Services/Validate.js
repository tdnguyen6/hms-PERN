export const validate = (type, value) => {
  const validate = {
    name: {
      pattern: /^[a-zA-ZàáâãèéêìíòóôõùúýÀÁÂÈÉÊÌÍÒÓÔÙÚÝ ]+$/u,
      status: false
    },
    email: {
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      status: false
    },
    phone: {
      pattern: /^\d{10}$/,
      status: false
    },
    ssn: {
      pattern: /^\d{5}$/,
      status: false
    }
  };

  const res = {
    name: false,
    email: false,
    phone: false,
    ssn: false
  };

  if (type === "name") {
    res.name = (validate.name.pattern.exec(value) !== null) ? false : true;
  } else if (type === "email") {
    res.email = (validate.email.pattern.exec(value) !== null) ? false : true;
  } else if (type === "phone") {
    res.phone = (validate.phone.pattern.exec(value) !== null) ? false : true;
  } else if (type === "ssn") {
    res.ssn = (validate.ssn.pattern.exec(value) !== null) ? false : true;
  }

  return res;
}
