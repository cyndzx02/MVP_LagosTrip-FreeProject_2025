<template>
  <nav class="sticky top-0 z-50 w-full bg-[#539337] shadow-md">
    <div class="mx-auto flex h-16 max-w-screen-content items-center justify-between px-4 sm:px-6 lg:px-8">
      <router-link to="/home" class="flex items-center">
        <img
          src="../assets/agronova-logo.png"
          alt="AgroNova"
          class="h-12 w-auto"
        />
      </router-link>

      <ul class="flex items-center gap-4 sm:gap-6 lg:gap-8">
        <li>
          <router-link
            to="/home"
            class="text-sm font-semibold text-white transition hover:underline sm:text-base"
          >
            Accueil
          </router-link>
        </li>
        <li>
          <router-link
            to="/PanierView"
            class="text-sm font-semibold text-white transition hover:underline sm:text-base"
          >
            Panier
          </router-link>
        </li>
        <li>
          <router-link
            to="/Paiement"
            class="text-sm font-semibold text-white transition hover:underline sm:text-base"
          >
            Paiement
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarView',
}
</script>
