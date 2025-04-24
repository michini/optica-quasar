<template>
  <div class="flex flex-center" style="height: 100vh">
    <q-card class="login-card q-pa-lg">
      <q-card-section class="text-center">
        <h4 class="text-weight-bold q-my-none">Iniciar Sesión</h4>
        <p class="text-grey-7">Bienvenido, ingresa a tu cuenta</p>
        <img
          alt="Quasar logo"
          src="~assets/logo_optica.jpg"
          style="width: 150px; height: 150px; border-radius: 50%"
        />
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="login" class="q-gutter-md">
          <q-input
            v-model="email"
            type="email"
            label="Correo electrónico"
            :rules="[(val) => !!val || 'El correo es requerido', isValidEmail]"
            outlined
          />

          <q-input
            v-model="password"
            type="password"
            label="Contraseña"
            :rules="[(val) => !!val || 'La contraseña es requerida']"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <div class="flex justify-between items-center">
            <q-checkbox v-model="rememberMe" label="Recordarme" />
            <q-btn flat color="primary" label="¿Olvidaste tu contraseña?" dense no-caps />
          </div>

          <q-btn
            type="submit"
            color="primary"
            label="Iniciar Sesión"
            class="full-width"
            :loading="authStore.loading"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pa-none">
        <p>
          ¿No tienes una cuenta?
          <router-link :to="$router.resolve({ name: 'auth.register' }).path" class="text-primary"
            >Regístrate</router-link
          >
        </p>
      </q-card-section>

      <q-dialog v-model="errorDialog">
        <q-card>
          <q-card-section class="bg-negative text-white">
            <div class="text-h6">Error</div>
          </q-card-section>
          <q-card-section>
            <div v-if="typeof authStore.error === 'string'">{{ authStore.error }}</div>
            <div v-else-if="authStore.error">
              <div v-for="(errors, field) in authStore.error" :key="field">
                <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const authStore = useAuthStore()
    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const showPassword = ref(false)
    const errorDialog = ref(false)

    const isValidEmail = (val) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailPattern.test(val) || 'El correo electrónico no es válido'
    }

    watch(
      () => authStore.error,
      (newValue) => {
        if (newValue) {
          errorDialog.value = true
        }
      },
    )

    const login = async () => {
      try {
        await authStore.login({
          email: email.value,
          password: password.value,
        })
      } catch (error) {
        // Error ya está manejado en el store
        console.log(error)
      }
    }

    return {
      authStore,
      email,
      password,
      rememberMe,
      showPassword,
      errorDialog,
      isValidEmail,
      login,
    }
  },
})
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
}
</style>
