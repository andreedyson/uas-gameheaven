<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header Section -->
    <q-header flat unelevated padding class="py-2">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="font-semibold">
          Admin Dashboard
        </q-toolbar-title>

        <div>
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
                  <p class="text-gray-400">{{ cookiesData.username }}</p>
                </div>

                <q-separator class="my-4" />

                <div>
                  <q-list>
                    <q-item clickable>
                      <q-item-section avatar>
                        <q-icon name="person" />
                      </q-item-section>
                      <q-item-section>
                        <p>Account</p>
                      </q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section avatar>
                        <q-icon name="settings" />
                      </q-item-section>
                      <q-item-section>
                        <p>Settings</p>
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
      </q-toolbar>
    </q-header>

    <!-- Sidebar Section -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label
          header
          v-bind:class="`${
            Dark.isActive ? 'text-secondary' : 'text-primary'
          } text-3xl font-bold text-center`"
        >
          GameHeaven
        </q-item-label>

        <q-item
          clickable
          :to="{ name: 'dashboardAdmin' }"
          class="font-medium"
          :exact-active-class="`${
            Dark.isActive ? 'text-secondary' : 'text-primary'
          }`"
        >
          <q-item-section avatar>
            <q-icon name="grid_view" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'dataTransactionsAdmin' }"
          class="font-medium"
          :exact-active-class="`${
            Dark.isActive ? 'text-secondary' : 'text-primary'
          }`"
        >
          <q-item-section avatar>
            <q-icon name="receipt_long" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Transactions</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'dataProductsAdmin' }"
          class="font-medium"
          :exact-active-class="`${
            Dark.isActive ? 'text-secondary' : 'text-primary'
          }`"
        >
          <q-item-section avatar>
            <q-icon name="conveyor_belt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Products</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'dataBrandsAdmin' }"
          class="font-medium"
          :exact-active-class="`${
            Dark.isActive ? 'text-secondary' : 'text-primary'
          }`"
        >
          <q-item-section avatar>
            <q-icon name="branding_watermark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Brands</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'dataCategoriesAdmin' }"
          class="font-medium"
          :exact-active-class="`${
            Dark.isActive ? 'text-secondary' : 'text-primary'
          }`"
        >
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Categories</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content Section -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Cookies, Dark } from "quasar";
import { getProfile } from "src/helper/Profile";

const leftDrawerOpen = ref(false);
const router = useRouter();
const cookiesData = getProfile();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logout = () => {
  Cookies.remove("dataUser");
  router.push({
    name: "loginPage",
  });
};

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
</script>
