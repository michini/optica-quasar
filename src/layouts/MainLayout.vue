<template>
  <q-layout view="lHh Lpr lff">
    <q-header bordered class="bg-grey-3 text-black">
      <HeaderNav />
    </q-header>
    <!-- Botón flotante del carrito -->
    <QuickCartFab />
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-3 text-black">
      <FooterSection />
    </q-footer>
    <!-- Carrito lateral -->
    <ShoppingCart />
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderNav from 'components/singlePage/HeaderNav.vue'
import FooterSection from 'components/singlePage/FooterSection.vue'
import ShoppingCart from 'components/singlePage/ShoppingCart.vue'
import QuickCartFab from 'components/singlePage/QuickCartFab.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderNav,
    FooterSection,
    ShoppingCart,
    QuickCartFab,
  },
})
</script>
