<template>
  <div>
    <!-- Home Section -->
    <section id="home">
      <div
        class="px-6 grid grid-cols-1 gap-6 place-content-center place-items-center h-[90vh] md:px-12 lg:grid-cols-2"
      >
        <div
          class="h-full w-full flex flex-col max-lg:justify-center max-lg:items-center max-lg:text-center"
        >
          <div
            class="w-full flex flex-col max-lg:justify-center max-lg:items-center"
          >
            <div>
              <q-chip
                color="accent"
                text-color="white"
                class="uppercase font-medium mb-3 text-xs md:text-sm"
              >
                • High Quality Gaming Accessories •
              </q-chip>
            </div>
            <h1 class="font-bold text-3xl md:text-5xl xl:text-7xl/[80px]">
              Secret Weapon <br />
              Every
              <span class="text-secondary">Gamer</span> Needs
            </h1>
            <p class="max-w-[550px] mt-2 text-base md:text-lg">
              Stop playing, start dominating. This isn't just another accessory,
              it's the game-changer you've been waiting for.
            </p>
          </div>
          <div class="mt-4">
            <q-btn
              unelevated
              no-caps
              class="bg-primary px-6 py-3 text-base text-white"
            >
              <q-icon name="shopping_cart" class="mr-2" />
              shop Now
            </q-btn>
          </div>
        </div>
        <div class="w-full">
          <div class="w-full lg:max-w-[90%]">
            <q-img src="~assets/img/hero.png" />
          </div>
        </div>
      </div>
    </section>

    <!-- Category Section -->
    <section
      id="category"
      class="px-6 py-[80px] bg-[#03052f] text-white md:px-12"
    >
      <div class="space-y-8">
        <div>
          <h1 :class="`text-4xl font-bold text-center`">Category</h1>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <q-card
            v-for="cat in categoriesList"
            :key="cat.id_category"
            class="bg-white/20 backdrop-blur-md h-[140px] flex justify-center items-center"
          >
            <q-card-section class="text-2xl font-semibold">{{
              cat.name
            }}</q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Top Products Section -->
    <section id="top" class="px-6 py-[120px] md:px-12">
      <div class="space-y-8">
        <div>
          <h1 class="text-4xl font-bold text-center">Top Products</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(product, i) in productData.slice(0, 4)" :key="i">
            <q-card
              :class="`${
                Dark.isActive ? 'bg-dark' : 'bg-grey-3'
              } cursor-pointer duration-200 hover:scale-[1.015]`"
            >
              <q-img
                :src="`${baseURL}/img/product/${product.image}`"
                :ratio="1"
                :class="`${Dark.isActive ? '' : 'border-t-2 border-red-300'}`"
              />
              <q-card-section>
                <q-badge color="accent" class="mb-1.5">
                  <span>{{ product.categories.name }}</span>
                </q-badge>
                <div class="mb-2 line-clamp-1">
                  <h3 class="text-xl font-semibold">{{ product.name }}</h3>
                </div>
                <div class="line-clamp-4 text-justify mb-3">
                  {{ product.description }}
                </div>
                <div>
                  <p class="text-xl font-semibold">
                    {{ formatPrice(product.price) }}
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section id="about" class="px-6 py-[80px]">
      <div>
        <div>
          <h1 :class="`text-4xl font-bold text-center mb-8`">About Us</h1>
        </div>
        <div class="flex flex-row gap-16 justify-center lg:flex-row">
          <div
            class="max-md:w-full flex items-center justify-center lg:justify-end"
          >
            <div class="max-md:w-full md:w-[500px]">
              <q-img
                src="~assets/img/about.svg"
                :ratio="1"
                class="w-full"
                fit="cover"
              />
            </div>
          </div>
          <div class="space-y-4 flex flex-col justify-center">
            <h4 class="font-semibold text-3xl">
              Aksesoris Komputer <br />
              Berkualitas Tinggi
            </h4>
            <p class="max-w-[450px] text-base">
              Tentukan pilihan terbaik untuk perangkat gaming Anda yang dapat
              memberikan performa optimal dan kenyamanan maksimal selama
              bermain.
            </p>
            <div class="space-y-8">
              <div class="flex items-center gap-4">
                <q-icon name="category" size="md" color="blue-8" />
                <p class="text-sm md:text-base max-w-[400px]">
                  Koleksi aksesoris gaming terbaik.
                </p>
              </div>
              <div class="flex items-center gap-4">
                <q-icon name="sell" size="md" color="green-8" />
                <p class="text-sm md:text-base">
                  Harga ramah kantong untuk produk berkualitas.
                </p>
              </div>
              <div class="flex items-center gap-4">
                <q-icon name="support_agent" size="md" color="yellow-8" />
                <p class="text-sm md:text-base">
                  Pelayanan pelanggan ramah dan responsif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Dark, Notify } from "quasar";
import { api, baseURL } from "src/boot/axios";
import { getProfile } from "src/helper/Profile";
import { formatPrice } from "src/helper/utils";
import { onMounted, ref } from "vue";

const productData = ref([]);
const categoriesList = ref([]);
const brandsList = ref([]);

onMounted(() => {
  getProfile();
  getProductsData();
  getCategoriesData();
  getBrandsData();
});

const getProductsData = async () => {
  try {
    const res = await api.get("/product/get");
    if (res.data.status) {
      productData.value = res.data.results;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting product data",
      color: "negative",
    });
  }
};

const getCategoriesData = async () => {
  try {
    const res = await api.get("/category/get");
    if (res.data.status) {
      categoriesList.value = res.data.results;
    }
  } catch (error) {
    console.log(error);
    Notify.create({
      message: "Error getting categories data",
      color: "negative",
    });
  }
};

const getBrandsData = async () => {
  try {
    const res = await api.get("/brand/get");
    if (res.data.status) {
      brandsList.value = res.data.results;
    }
  } catch (error) {
    console.log(error);
    Notify.create({
      message: "Error getting brands data",
      color: "negative",
    });
  }
};
</script>
