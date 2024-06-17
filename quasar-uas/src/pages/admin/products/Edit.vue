<template>
  <q-page padding>
    <section>
      <div class="mb-3">
        <h2 class="text-xl font-bold">Edit Product Data</h2>
      </div>

      <q-card flat v-bind:class="`${Dark.isActive ? 'bg-dark' : 'bg-grey-3'}`">
        <q-card-section>
          <div class="text-h6">{{ productName }} Data</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form
            @submit="onSubmit"
            ref="formInput"
            enctype="multipart/form-data"
          >
            <q-input
              v-model="form.name"
              type="text"
              label="Product Name"
              required
              outlined
              :rules="[(val) => val !== '' || 'Product name can not be empty']"
            />
            <q-select
              v-model="categorySelected"
              :options="categoryList"
              label="Category"
              option-value="id_category"
              option-label="name"
              required
              outlined
              :rules="[(val) => val || 'Please select a Product']"
            />
            <q-select
              v-model="brandSelected"
              :options="brandList"
              label="Brand"
              option-value="id_brand"
              option-label="name"
              required
              outlined
              :rules="[(val) => val || 'Please select a Brand']"
            />
            <q-input
              v-model="form.price"
              type="number"
              label="Price (Rp.)"
              required
              outlined
              :rules="[(val) => val > 0 || 'Price must be greater than 0']"
            />
            <q-input
              v-model="form.description"
              label="Description"
              type="textarea"
              rows="4"
              :rules="[(val) => val !== '' || 'Description can not be empty']"
              required
              outlined
              dense
            />
            <q-file
              v-model="image"
              outlined
              bottom-slots
              accept=".jpg, image/*"
              label="Poster Image"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-input
              v-model="form.stocks"
              type="number"
              label="Stocks"
              outlined
            />

            <q-card-actions align="right" class="text-teal mt-6">
              <q-btn
                :to="{ name: 'dataProductsAdmin' }"
                type="button"
                outline
                label="Cancel"
                color="red"
                class="md:w-[150px]"
              />
              <q-btn
                type="submit"
                label="Save"
                color="primary"
                class="md:w-[150px]"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
import { Dark, Notify } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const productName = ref();

const form = ref({
  name: "",
  price: 0,
  description: "",
  stocks: 0,
  category: 0,
  brand: "",
});

const categoryList = ref([]);
const categorySelected = ref(null);
const brandList = ref([]);
const brandSelected = ref(null);

const image = ref(null);

onMounted(() => {
  getProductData();
  getCategoriesData();
  getBrandsData();
});

const getProductData = async () => {
  try {
    const res = await api.get(`/product/get/${route.params.id}`);

    if (res.data.status) {
      const { name, categories, brands, price, description, stocks } =
        res.data.results;

      form.value.name = name;
      form.value.price = price;
      form.value.description = description;
      form.value.stocks = stocks;
      categorySelected.value = categories;
      brandSelected.value = brands;

      productName.value = name;
    } else {
      Notify.create({
        message: res.data.message,
        color: "negative",
      });
      router.back();
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
      categoryList.value = res.data.results;
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
      brandList.value = res.data.results;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting brands data",
      color: "negative",
    });
  }
};

const onSubmit = async () => {
  try {
    const formData = new FormData();

    if (image.value) formData.append("image", image.value);

    formData.append("name", form.value.name);
    formData.append("price", form.value.price);
    formData.append("description", form.value.description);
    formData.append("stocks", form.value.stocks);
    formData.append("category", categorySelected.value.id_category);
    formData.append("brand", brandSelected.value.id_brand);

    const res = await api.put(`/product/edit/${route.params.id}`, formData);

    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: "positive",
      });

      router.back();
    } else {
      Notify.create({
        message: res.data.msg,
        color: "negative",
      });
    }
  } catch (error) {
    Notify.create({
      message: "Error editing product data",
      color: "negative",
    });
  }
};
</script>
