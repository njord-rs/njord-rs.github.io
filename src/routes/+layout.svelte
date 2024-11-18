<script>
  import { base } from '$app/paths';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';
  let pageTitle = 'Njord - A versatile, feature-rich Rust ORM';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta property="og:title" content={pageTitle} />
  <meta
    property="og:description"
    content="A highly versatile and feature-rich ORM library for Rust, designed to simplify database interactions across a wide range of systems with robust performance and flexibility."
  />
  <meta property="og:image" content="{base}/meta.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={pageTitle} />
  <meta
    property="twitter:description"
    content="A highly versatile and feature-rich ORM library for Rust, designed to simplify database interactions across a wide range of systems with robust performance and flexibility."
  />
  <meta property="twitter:image" content="{base}/meta.png" />

  <!-- Prevent page flash -->
  <script>
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
</svelte:head>

<div
  class="bg-background text-foreground font-primary flex items-center flex-col relative min-h-screen"
>
  <Navbar></Navbar>
  <slot />
  <Footer></Footer>
</div>
