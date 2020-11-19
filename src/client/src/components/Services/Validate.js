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
    }
  };

  const res = {
    name: false,
    email: false,
    phone: false
  };

  if (type === "name") {
    res.name = (validate.name.pattern.exec(value) !== null) ? false : true;
  } else if (type === "email") {
    let nameStatus = validate.email.pattern.exec(value);
    if (nameStatus !== null) res.email = false;
    else res.email = true;
  } else if (type === "phone") {
    let nameStatus = validate.phone.pattern.exec(value);
    if (nameStatus !== null) res.phone = false;
    else res.phone = true;
  }

  return res;
}
