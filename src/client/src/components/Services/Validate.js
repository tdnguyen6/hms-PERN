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

    switch (type) {
        case "name":
            res.name = validate.name.pattern.test(value);
            break;
        case "email":
            res.email = validate.email.pattern.test(value);
            break;
        case "phone":
            res.phone = validate.phone.pattern.test(value);
            break;
        case "ssn":
            res.ssn = validate.ssn.pattern.test(value);
    }
    return res;
}
