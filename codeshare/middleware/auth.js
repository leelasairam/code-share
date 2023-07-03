export default defineNuxtRouteMiddleware(() => {
  let AuthCheck = JSON.parse(localStorage.getItem("IsLoggedIn"));
  if(AuthCheck===false){
    return navigateTo("/login");
  }
  });