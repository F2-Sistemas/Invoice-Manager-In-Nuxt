export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession()

  // Public routes that don't require authentication
  const publicRoutes = ['/login']

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => to.path.startsWith(route))

  // If not logged in and trying to access a protected route
  if (!loggedIn.value && !isPublicRoute) {
    return navigateTo('/login')
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }
})
