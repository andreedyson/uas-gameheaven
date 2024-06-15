<template>
  <q-layout>
    <q-page-container class="bg-slate-200">
      <q-page padding class="flex items-center justify-center">
        <div class="w-full">
          <div class="w-full flex justify-center items-center">
            <q-card flat class="lg:w-[800px] rounded-md">
              <q-card-section class="flex justify-center items-center">
                <!-- Image Container -->
                <div
                  class="px-12 justify-center items-center col gap-10 max-md:hidden md:flex md:flex-col"
                >
                  <div class="text-primary text-h4 font-bold italic">
                    GameHeaven
                  </div>
                  <q-img src="~assets/img/login-illustration.svg" />
                </div>
                <!-- Form Container -->
                <div class="px-6 col">
                  <div class="text-h6 text-primary text-weight-bold q-mb-sm">
                    Register an Account
                  </div>
                  <div class="q-mb-md text-sm">
                    Register an account to start using the app.
                  </div>
                  <q-form @submit="onSubmit" class="flex flex-col gap-3">
                    <q-input
                      v-model="form.username"
                      type="text"
                      label="Username"
                    />
                    <q-input
                      v-model="form.full_name"
                      type="text"
                      label="Nama Lengkap"
                    />
                    <q-input v-model="form.email" type="text" label="Email" />
                    <q-input
                      v-model="form.phone"
                      type="text"
                      label="Nomor Telepon"
                    />
                    <q-input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                    >
                      <template v-slot:append>
                        <q-icon
                          @click="togglePassword"
                          :name="showPassword ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                    <q-btn
                      color="primary"
                      icon="send"
                      label="Register"
                      type="submit"
                      unelevated
                      class="w-full mt-6"
                    />
                    <div
                      class="text-center w-full font-semibold duration-200 text-gray-500 hover:text-black"
                    >
                      <router-link :to="{ name: 'loginPage' }">
                        Already have an account?
                        <span class="underline">Login</span>
                      </router-link>
                    </div>
                  </q-form>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useQuasar } from "quasar";

const q = useQuasar();
const showPassword = ref(false);

const form = ref({
  username: "",
  full_name: "",
  password: "",
  email: "",
  phone: "",
});

const onSubmit = async () => {
  try {
    const res = await api.post("/users/register", {
      ...form.value,
    });

    if (res.data.status) {
      q.notify({
        message: res.data.msg,
        color: "positive",
      });
      router.push({
        name: "loginPage",
      });
    } else {
      q.notify({
        message: res.data.msg,
        color: "negative",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
