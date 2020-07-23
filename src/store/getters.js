const getters = {
  userInfo: ({ app }) => app.userInfo,
  token: ({ app }) => app.userInfo.accessToken
}
export default getters
