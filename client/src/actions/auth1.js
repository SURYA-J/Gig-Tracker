export const login = (uid,user) => ({
  type: 'LOGIN',
  uid,
  user
});

export const startLogin = (uid,user) => {
    return (dispatch) => {
      dispatch(login(uid,user))
}
};

export const logout = () => ({
  type: 'LOGOUT'
});
