<template>
  <q-page padding>
    <section>
      <div>
        <div
          @click="router.back()"
          class="mb-5 flex items-center gap-2 cursor-pointer duration-200 hover:text-slate-400"
        >
          <q-icon name="arrow_back" size="md" />
          <h2 class="text-xl font-bold">{{ categoryName }} Products</h2>
        </div>

        <div
          v-if="productData.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div v-for="product in productData" :key="product.id_product">
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
        <div v-else>
          <p>No product with this category.</p>
        </div>
      </div>
    </section>
  </q-page>
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
                val <= activeData.stocks ||
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
</template>

<script setup>
import { Dark, Notify } from "quasar";
import { api, baseURL } from "src/boot/axios";
import { getProfile } from "src/helper/Profile";
import { formatPrice } from "src/helper/utils";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const categoryName = ref("");
const transactionDialog = ref(false);
const transactionForm = ref();
const activeData = ref(null);

const quantity = ref(0);

const productData = ref([]);

onMounted(() => getProductsData());

const getProductsData = async () => {
  try {
    const category = await api.get(`/category/get/${route.params.id}`);
    const res = await api.get(`/product/get-category/${route.params.id}`);

    if (res.data.status) {
      productData.value = res.data.results;
      categoryName.value = category.data.results.name;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting product data",
      color: "negative",
    });
  }
};

const openDialog = (data) => {
  transactionDialog.value = true;
  activeData.value = data;
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
      getProductsData();
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
