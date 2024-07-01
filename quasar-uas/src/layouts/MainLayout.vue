<template>
  <q-layout view="lHh Lpr lFf">
    <q-header unelevated class="py-2 px-6 md:px-12 lg:px-24 bg-accent">
      <q-toolbar class="justify-between">
        <router-link
          :to="{ name: 'dashboardUser' }"
          class="text-2xl font-semibold italic"
        >
          GameHeaven
        </router-link>

        <div class="flex justify-center items-center gap-8 max-md:hidden">
          <a href="#home">Home</a>
          <a href="#category">Category</a>
          <a href="#top">Top Products</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </div>

        <div class="max-md:hidden">
          <q-btn
            round
            flat
            size="14px"
            :icon="`${Dark.isActive ? 'dark_mode' : 'light_mode'}`"
            class="q-mr-sm"
            @click="toggleDarkMode"
          />
          <q-btn round>
            <q-avatar size="44px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
            <q-menu>
              <div class="p-3 w-[240px]">
                <div>
                  <p class="font-semibold">{{ cookiesData.email }}</p>
                  <p class="text-gray-400">{{ cookiesData.full_name }}</p>
                </div>

                <q-separator class="my-4" />

                <div>
                  <q-list>
                    <q-item
                      clickable
                      :to="{ name: 'dataTransactionsUser' }"
                      :exact-active-class="`${
                        Dark.isActive ? 'text-secondary' : 'text-primary'
                      }`"
                    >
                      <q-item-section avatar>
                        <q-icon name="receipt" />
                      </q-item-section>
                      <q-item-section>
                        <p>Transactions</p>
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <q-btn
                    @click="logout"
                    class="w-full mt-3 font-bold"
                    color="negative"
                    icon="logout"
                    label="Logout"
                    size="md"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="md:hidden"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <!-- Sidebar Section -->
    <div>
      <q-drawer v-model="rightDrawerOpen" show-if-below bordered side="right">
        <q-list class="mt-8">
          <q-item clickable class="font-medium" @click="toggleRightDrawer">
            <q-item-section>
              <a href="#home">Home</a>
            </q-item-section>
          </q-item>
          <q-item clickable class="font-medium" @click="toggleRightDrawer">
            <q-item-section>
              <a href="#category">Category</a>
            </q-item-section>
          </q-item>
          <q-item clickable class="font-medium" @click="toggleRightDrawer">
            <q-item-section>
              <a href="#top">Top Products</a>
            </q-item-section>
          </q-item>
          <q-item clickable class="font-medium" @click="toggleRightDrawer">
            <q-item-section>
              <a href="#about">About Us</a>
            </q-item-section>
          </q-item>
          <q-item clickable class="font-medium" @click="toggleRightDrawer">
            <q-item-section>
              <a href="#contact">Contact Us</a>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Cookies, Dark } from "quasar";
import { getProfile } from "src/helper/Profile";
import { useRouter } from "vue-router";

const router = useRouter();
const rightDrawerOpen = ref(false);
const cookiesData = getProfile();

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

const toggleDarkMode = () => {
  Dark.toggle();
  localStorage.setItem("theme", Dark.isActive ? "dark" : "light");
};

onMounted(() => {
  if (localStorage.getItem("theme") === "dark") {
    Dark.set(true);
  } else {
    Dark.set(false);
  }
});

const logout = () => {
  Cookies.remove("dataUser");
  router.push({
    name: "loginPage",
  });
};
</script>
