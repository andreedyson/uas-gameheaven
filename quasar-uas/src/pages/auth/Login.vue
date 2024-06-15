<template>
  <q-layout>
    <q-page-container class="bg-slate-200">
      <q-page padding class="flex items-center justify-center">
        <div class="w-full">
          <div class="w-full flex justify-center items-center">
            <q-card
              flat
              class="lg:w-[800px] flex py-6 justify-center rounded-md md:min-h-[500px]"
            >
              <q-card-section class="flex justify-center items-center w-full">
                <!-- Image Container -->
                <div
                  class="px-12 justify-center items-center col gap-10 max-md:hidden md:flex md:flex-col"
                >
                  <div class="text-primary text-h4 font-bold italic">
                    GameHeaven
                  </div>
                  <q-img src="~assets/img/gaming.svg" />
                </div>
                <!-- Form Container -->
                <div class="px-6 col h-full">
                  <div class="text-h6 text-primary text-weight-bold q-mb-sm">
                    Welcome Back
                  </div>
                  <div class="q-mb-md text-sm">
                    Enter your credentials to access the app.
                  </div>
                  <q-form @submit="onLogin" class="flex flex-col gap-3">
                    <q-input v-model="username" type="text" label="Username" />
                    <q-input
                      v-model="password"
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
                      label="Login"
                      type="submit"
                      unelevated
                      class="w-full mt-6"
                    />
                    <div
                      class="text-center w-full font-semibold duration-200 text-gray-500 hover:text-black"
                    >
                      <router-link :to="{ name: 'registerPage' }">
                        Don't have an account?
                        <span class="underline">Register</span>
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
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { all } from "src/helper/ListAkses";
import { setProfile } from "src/helper/Profile";
import { ref } from "vue";
import { useRouter } from "vue-router";

const q = useQuasar();
const router = useRouter();
const showPassword = ref(false);

const username = ref("");
const password = ref("");

const onLogin = async () => {
  try {
    const res = await api.post("users/login", {
      username: username.value,
      password: password.value,
    });

    if (res.data.status) {
      q.notify({
        message: res.data.msg,
        color: "positive",
      });

      const dataUser = res.data.data;
      const adaUser = all.find((r) => {
        return r.value === dataUser.role;
      });

      if (adaUser) {
        setProfile(dataUser);

        router.push({ name: adaUser.index });
      } else {
        q.notify({
          message: "Mohon maaf akses dilarang",
          color: "negative",
        });
      }
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
