<template>
  <q-page padding>
    <section>
      <div class="mb-3">
        <h2 class="text-xl font-bold">All Products Data</h2>
      </div>
      <q-card
        flat
        v-bind:class="`px-6 py-8 w-full flex items-center gap-6 rounded-md ${
          Dark.isActive ? 'bg-dark' : 'bg-grey-3'
        }`"
      >
        <q-table
          flat
          :rows="rows"
          :columns="columns"
          row-key="name"
          class="w-full"
          color="secondary"
          :loading="loading"
          :rows-per-page-options="[10, 25, 50]"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id_product" :props="props" class="w-[80px]">
                {{ props.row.id_product }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="category" :props="props" class="w-[100px]">
                {{ props.row.categories.name }}
              </q-td>
              <q-td key="brand" :props="props">
                {{ props.row.brands.name }}
              </q-td>
              <q-td key="price" :props="props">
                {{ formatPrice(props.row.price) }}
              </q-td>
              <q-td
                key="description"
                :props="props"
                class="ellipsis"
                style="max-width: 10rem"
              >
                {{ props.row.description }}
              </q-td>
              <q-td key="stocks" :props="props">
                {{ props.row.stocks }} Pcs
              </q-td>
              <q-td key="image" :props="props">
                <q-img :src="`${baseURL}/img/product/${props.row.image}`" />
              </q-td>
              <q-td key="action" :props="props">
                <div class="flex flex-col gap-2">
                  <q-btn
                    :to="{
                      name: 'editDataProductsAdmin',
                      params: { id: props.row.id_product },
                    }"
                    color="yellow-7"
                    unelevated
                    icon="edit"
                    no-caps
                  />
                  <q-btn
                    @click="deleteProduct(props.row.id_product)"
                    color="red-7"
                    unelevated
                    icon="delete"
                    no-caps
                  />
                </div>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:top-left>
            <h2 class="text-xl font-semibold">Products Table</h2>
          </template>
          <template v-slot:top-right>
            <q-btn
              @click="openDialog"
              label="Add Product"
              color="primary"
              icon="add"
              no-caps
            />
          </template>
        </q-table>
        <q-dialog v-model="formDialog" position="right" full-height maximized>
          <q-card style="width: 400px; max-width: 70vw" class="p-2">
            <q-card-section>
              <div class="text-h6">Insert a Product</div>
              <div>Insert a new product to the database.</div>
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
                  color="secondary"
                  outlined
                  required
                  :rules="[
                    (val) => val !== '' || 'Product name can not be empty',
                  ]"
                />
                <q-select
                  v-model="categorySelected"
                  :options="categoryList"
                  label="Category"
                  color="secondary"
                  option-value="id_category"
                  option-label="name"
                  outlined
                  required
                  :rules="[(val) => val || 'Please select a Product']"
                />
                <q-select
                  v-model="brandSelected"
                  :options="brandList"
                  label="Brand"
                  color="secondary"
                  option-value="id_brand"
                  option-label="name"
                  outlined
                  required
                  :rules="[(val) => val || 'Please select a Brand']"
                />
                <q-input
                  v-model="form.price"
                  type="number"
                  color="secondary"
                  label="Price (Rp.)"
                  outlined
                  required
                  :rules="[(val) => val > 0 || 'Price must be greater than 0']"
                />
                <q-input
                  v-model="form.description"
                  label="Description"
                  type="textarea"
                  rows="4"
                  required
                  :rules="[
                    (val) => val !== '' || 'Description can not be empty',
                  ]"
                  outlined
                  dense
                />
                <q-file
                  v-model="image"
                  outlined
                  required
                  accept=".jpg, image/*"
                  label="Poster Image"
                  :rules="[(val) => val !== null || 'Mohon Isi File']"
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
              </q-form>
            </q-card-section>
            <q-card-actions align="right" class="text-teal mt-6">
              <q-btn
                outline
                label="Cancel"
                color="red"
                v-close-popup
                class="md:w-[150px]"
              />
              <q-btn
                label="Save"
                color="primary"
                @click="formInput.submit()"
                class="md:w-[150px]"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
import { Dark, Notify, useQuasar } from "quasar";
import { api, baseURL } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { formatPrice } from "src/helper/utils";

const loading = ref(true);

const q = useQuasar();
const router = useRouter();

const formInput = ref();
const formDialog = ref(false);
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

const columns = [
  {
    name: "id_product",
    align: "left",
    label: "Product ID",
    field: "id_product",
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "category",
    align: "left",
    label: "Category",
    field: "category",
    sortable: true,
  },
  {
    name: "brand",
    align: "left",
    label: "Brand",
    field: "brand",
    sortable: true,
  },
  {
    name: "price",
    align: "left",
    label: "Price",
    field: "price",
    sortable: true,
  },
  {
    name: "description",
    align: "left",
    label: "Description",
    field: "description",
    sortable: true,
  },
  {
    name: "stocks",
    align: "left",
    label: "Stocks",
    field: "stocks",
    sortable: true,
  },
  {
    name: "image",
    align: "left",
    label: "Image",
    field: "image",
    sortable: true,
  },
  {
    name: "action",
    align: "left",
    label: "Action",
    field: "action",
  },
];

const rows = ref([]);

onMounted(() => {
  getProductsData();
  getCategoriesData();
  getBrandsData();
});

const getProductsData = async () => {
  try {
    loading.value = true;

    const res = await api.get("/product/get");
    if (res.data.status) {
      rows.value = res.data.results;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting product data",
      color: "negative",
    });
  } finally {
    loading.value = false;
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

const openDialog = () => {
  resetForm();
  formDialog.value = true;
};

const resetForm = () => {
  form.value = {
    name: "",
    price: 0,
    description: "",
    stocks: 0,
    category: 0,
    brand: "",
  };
};

const onSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("price", form.value.price);
    formData.append("description", form.value.description);
    formData.append("stocks", form.value.stocks);
    formData.append("category", categorySelected.value.id_category);
    formData.append("brand", brandSelected.value.id_brand);
    formData.append("image", image.value);

    const res = await api.post("/product/insert", formData);

    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: "positive",
      });

      formDialog.value = false; // Close the dialog
      getProductsData();
    } else {
      Notify.create({
        message: res.data.msg,
        color: "negative",
      });
    }
  } catch (error) {
    Notify.create({
      message: "Something went wrong",
      color: "negative",
    });
  }
};

const deleteProduct = (id) => {
  q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this product?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      const res = await api.delete(`/product/delete/${id}`);
      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: "positive",
        });
        getProductsData();
      } else {
        Notify.create({
          message: res.data.msg,
          color: "negative",
        });
      }
    } catch (error) {
      Notify.create({
        message: "Something went wrong deleting product",
        color: "negative",
      });
    }
  });
};
</script>
