export const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: '',
  salary: '',
};

export const ACTION = {
  CHANGE_FIRST_NAME: 'changeFirstName',
  CHANGE_LAST_NAME: 'changeLastName',
  CHANGE_EMAIL: 'changeEmail',
  CHANGE_PHONE: 'changePhone',
  CHANGE_DATE: 'changeDate',
  CHANGE_SALARY: 'changeSalary',
};

export const employeesReducer = (state, action) => {
  switch (action.type) {
    case 'changeFirstName':
      return { ...state, firstName: action.payload };
    case 'changeLastName':
      return { ...state, lastName: action.payload };
    case 'changeEmail':
      return { ...state, email: action.payload };
    case 'changePhone':
      return { ...state, phone: action.payload };
    case 'changeDate':
      return { ...state, date: action.payload };
    case 'changeSalary':
      return { ...state, salary: action.payload };

    default:
      break;
  }
};
