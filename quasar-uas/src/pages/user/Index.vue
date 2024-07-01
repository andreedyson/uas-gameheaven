<template>
  <div>
    <!-- Home Section -->
    <section id="home">
      <div
        class="px-6 grid grid-cols-1 gap-6 place-content-center place-items-center h-[90vh] md:px-12 lg:px-28 lg:grid-cols-2"
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
            <h1 class="font-bold text-3xl md:text-5xl xl:text-6xl/[80px]">
              Secret Weapon Every
              <br />
              <span class="text-secondary">Gamer</span> Needs
            </h1>
            <p class="max-w-[550px] mt-8 text-base md:text-lg">
              Stop playing, start dominating. This isn't just another accessory,
              it's the game-changer you've been waiting for.
            </p>
          </div>
          <div class="mt-8">
            <q-btn
              :to="{ name: 'dataProductsUser' }"
              unelevated
              no-caps
              class="bg-primary px-6 py-3 text-base text-white"
            >
              <q-icon name="shopping_cart" class="mr-2" />
              Shop Now
            </q-btn>
          </div>
        </div>
        <div class="w-full">
          <div class="w-full">
            <q-img src="~assets/img/hero.png" />
          </div>
        </div>
      </div>
    </section>

    <!-- Category Section -->
    <section
      id="category"
      class="px-6 py-[80px] bg-[#03052f] text-white md:px-12 lg:px-28"
    >
      <div class="space-y-8">
        <div>
          <h1 :class="`text-4xl font-bold text-center`">Category</h1>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <q-card
            v-for="cat in categoriesList"
            :key="cat.id_category"
            class="bg-white/20 backdrop-blur-md h-[140px] flex justify-center items-center duration-300 hover:scale-[1.025]"
          >
            <router-link
              :to="{
                name: 'dataCategoriesUser',
                params: { id: cat.id_category },
              }"
            >
              <q-card-section class="text-2xl font-semibold">{{
                cat.name
              }}</q-card-section>
            </router-link>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Top Products Section -->
    <section id="top" class="px-6 py-[120px] md:px-12 lg:px-28">
      <div class="space-y-8">
        <div>
          <h1 class="text-4xl font-bold text-center">Top Products</h1>
        </div>
        <div
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-y-8"
        >
          <div v-for="(product, i) in productData.slice(0, 8)" :key="i">
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
                <div class="mb-2 flex items-center justify-between">
                  <h3 class="text-xl font-semibold line-clamp-1">
                    {{ product.name }}
                  </h3>
                </div>
                <div class="line-clamp-3 text-justify mb-3">
                  {{ product.description }}
                </div>
                <div class="mb-4">
                  <p class="text-xl font-semibold">
                    {{ formatPrice(product.price) }}
                  </p>
                </div>
                <div>
                  <q-btn
                    @click="openDialog(product)"
                    color="accent"
                    icon="shopping_cart"
                    label="Buy Now"
                    class="w-full"
                  />
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

    <!-- Footer Section -->
    <footer class="px-6 py-20 bg-primary text-white md:px-12 lg:px-28">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div class="flex flex-col gap-4 md:col-span-2">
          <router-link
            :to="{ name: 'dashboardUser' }"
            class="text-2xl font-semibold italic"
          >
            GameHeaven
          </router-link>
          <p class="md:max-w-[450px]">
            Find the best accessories for your high-level gaming experience and
            dominate the competition with precision control, immersive audio,
            and unmatched comfort.
          </p>
        </div>
        <div class="flex flex-col gap-4 max-w-[150px]">
          <h4 class="text-lg font-semibold">Links</h4>
          <div class="flex flex-col gap-2">
            <a href="#home">Home</a>
            <a href="#category">Category</a>
            <a href="#top">Top Products</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
        <div id="contact" class="flex flex-col gap-4">
          <h4 class="text-lg font-semibold">Subscribe to our newsletter</h4>
          <p>
            Get the latest info on new items, promos, and giveaway from our
            store.
          </p>
          <div class="relative">
            <input
              type="text"
              placeholder="Enter your email"
              class="px-3 py-4 outline-none rounded-full w-full text-black"
            />
            <button
              class="absolute right-3 top-2.5 px-4 py-1.5 bg-secondary rounded-full"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>

    <q-dialog v-model="transactionDialog" v-if="activeData !== null" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Buy Product</div>
        </q-card-section>

        <q-card-section class="q-pt-none space-y-4">
          <div class="flex justify-between items-center">
            <p>Product</p>
            <p class="font-semibold">{{ activeData.name }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p>Categories</p>
            <p class="font-semibold">{{ activeData.categories.name }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p>Brand</p>
            <p class="font-semibold">{{ activeData.brands.name }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p>Stocks</p>
            <p class="font-semibold">{{ activeData.stocks }} Pc(s) left</p>
          </div>
          <q-form ref="transactionForm" @submit="onSubmit">
            <q-input
              v-if="activeData.stocks > 0"
              type="number"
              label="Quantity"
              color="secondary"
              v-model="quantity"
              :rules="[
                (val) => val > 0 || 'Quantity should be 1 minimum',
                (val) =>
                  val < activeData.stocks ||
                  `Quantity should be less than or equal to ${activeData.stocks} item`,
              ]"
            />
          </q-form>
          <div v-if="activeData.stocks > 0">
            <h3 class="text-lg font-semibold">Total</h3>
            <p class="text-xl font-bold">
              {{ formatPrice(quantity * activeData.price) }}
            </p>
          </div>
          <div v-else>
            <p class="text-center text-red-600 font-bold">
              Product is out of stock
            </p>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pb-lg">
          <q-btn label="Cancel" outline color="negative" v-close-popup />
          <q-btn
            @click="transactionForm.submit()"
            flat
            color="secondary"
            label="Buy Product"
            :disable="activeData.stocks === 0"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Dark, Notify } from "quasar";
import { api, baseURL } from "src/boot/axios";
import { getProfile } from "src/helper/Profile";
import { formatPrice } from "src/helper/utils";
import { onMounted, ref } from "vue";

const transactionDialog = ref(false);
const transactionForm = ref();
const activeData = ref(null);

const quantity = ref(0);

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
    Notify.create({
      message: "Error getting brands data",
      color: "negative",
    });
  }
};

const openDialog = (data) => {
  activeData.value = data;
  transactionDialog.value = true;
};

const onSubmit = async () => {
  try {
    const res = await api.post("/transaction/insert", {
      username: getProfile().username,
      productId: Number(activeData.value.id_product),
      quantity: quantity.value,
      total: quantity.value * activeData.value.price,
      date: new Date(),
    });

    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: "positive",
      });

      resetForm();
      transactionDialog.value = false;
    }
  } catch (error) {
    Notify.create({
      message: "Something went wrong",
      color: "negative",
    });
  }
};

const resetForm = () => {
  quantity.value = 0;
};
</script>
