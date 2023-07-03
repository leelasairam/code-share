export default defineNuxtRouteMiddleware(() => {
  let AuthCheck = JSON.parse(localStorage.getItem("IsLoggedIn"));
  if(AuthCheck===false || AuthCheck==null || AuthCheck==undefined){
    return navigateTo("/login");
  }
  });