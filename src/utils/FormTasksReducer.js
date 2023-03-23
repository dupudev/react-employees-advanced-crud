export const INITIAL_STATE = {
  title: '',
  description: '',
  assignee: '',
  date: '',
};

export const ACTION = {
  CHANGE_TITLE: 'changeTitle',
  CHANGE_DESCRIPTION: 'changeDescription',
  CHANGE_ASSIGNEE: 'changeAssignee',
  CHANGE_DATE: 'changeDate',
};

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'changeTitle':
      return { ...state, title: action.payload };
    case 'changeDescription':
      return { ...state, description: action.payload };
    case 'changeAssignee':
      return { ...state, assignee: action.payload };
    case 'changeDate':
      return { ...state, date: action.payload };

    default:
      break;
  }
};
