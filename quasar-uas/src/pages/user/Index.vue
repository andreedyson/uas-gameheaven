<template>
  <div>
    <!-- Home Section -->
    <section id="home" class="home text-white">
      <div class="w-full">
        <div
          class="w-full h-full flex flex-col justify-center items-center px-6 text-center"
        >
          <div class="w-full flex flex-col justify-center items-center">
            <q-chip
              color="accent"
              text-color="white"
              class="uppercase font-medium mb-3 text-xs md:text-sm"
            >
              • Produk Gaming Berkualitas Tinggi •
            </q-chip>
            <h1 class="font-bold text-3xl md:text-4xl/[50px]">
              Selamat Datang di <br />
              <span class="text-secondary">GameHeaven</span>
            </h1>
            <p class="max-w-[545px] mt-2 text-base md:text-lg">
              Koleksi aksesoris gaming terbaru dan terbaik untuk meningkatkan
              pengalaman bermain Anda. Headset, keyboard, mouse, dan lebih
              banyak lagi yang memastikan setiap sesi gaming lebih seru dan
              memuaskan!
            </p>
          </div>
          <div class="mt-4">
            <q-btn unelevated no-caps class="bg-primary px-6 py-3 text-base">
              Belanja Sekarang
            </q-btn>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Products Section -->
    <section id="top" class="px-6 py-[100px]">
      <div class="space-y-6">
        <div>
          <h1 :class="`text-4xl font-bold `">Top Products</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(product, i) in productData.slice(0, 4)" :key="i">
            <q-card flat :class="`${Dark.isActive ? 'bg-dark' : 'bg-grey-3'}`">
              <q-img
                :src="`${baseURL}/img/product/${product.image}`"
                :ratio="1"
                :class="`${Dark.isActive ? '' : 'border-t-2 border-red-300'}`"
              />
              <q-card-section>
                <q-badge color="accent" class="mb-1.5">
                  <span>{{ product.categories.name }}</span>
                </q-badge>
                <div class="mb-2">
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
  </div>
</template>

<script setup>
import { Dark, Notify } from "quasar";
import { api, baseURL } from "src/boot/axios";
import { getProfile } from "src/helper/Profile";
import { formatPrice } from "src/helper/utils";
import { onMounted, ref } from "vue";

const productData = ref([]);

onMounted(() => {
  getProfile();
  getProductsData();
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
</script>
