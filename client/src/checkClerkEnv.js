const pub = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (pub?.startsWith('pk_test_')) {
  console.warn('Clerk test key detected in production build:', pub);
}