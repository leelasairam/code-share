export default defineNuxtRouteMiddleware(() => {
    const{$auth:auth} = useNuxtApp();
    if (!auth.currentUser) {
      return navigateTo('/login');
    }
  });