export const actionTypes = { USER__UPDATE_EMAIL: "USER__UPDATE_EMAIL" };

export function updateEmail(email) {
  return {
    type: actionTypes.USER__UPDATE_EMAIL,
    email: email
  };
}
