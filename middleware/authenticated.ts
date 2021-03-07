export default (context: any) => {
  const store = context.store
  if (!store.state.auth.token) {
    context.redirect('/login')
  }
}
