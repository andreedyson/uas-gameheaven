<template>
  <q-page padding>
    <section>
      <div class="mb-3">
        <h2 class="text-xl font-bold">Edit Transaction Data</h2>
      </div>

      <q-card flat v-bind:class="`${Dark.isActive ? 'bg-dark' : 'bg-grey-3'}`">
        <q-card-section>
          <div class="text-h6">Transaction Data</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" ref="formInput">
            <q-select
              v-model="userSelected"
              :options="userList"
              label="User"
              option-value="username"
              option-label="username"
              outlined
              :rules="[(val) => val || 'Please select a User']"
            />
            <q-input
              v-model="form.date"
              type="date"
              label="Transaction Date"
              outlined
              :rules="[
                (val) => val !== '' || 'Please fill the transaction Date',
              ]"
            />
            <q-select
              v-model="productSelected"
              :options="productList"
              label="Product"
              option-value="id_product"
              option-label="name"
              outlined
              :rules="[(val) => val || 'Please select a Product']"
            />
            <q-input
              v-model="form.quantity"
              type="number"
              label="Quantity"
              outlined
              :rules="[(val) => val > 0 || 'Quantity must be greater than 0']"
            />
            <q-select
              v-model="form.status"
              :options="statusOptions"
              label="Status"
              outlined
            />
            <q-card-actions align="right" class="text-teal mt-6">
              <q-btn
                :to="{ name: 'dataTransactionsAdmin' }"
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

const route = useRoute();
const router = useRouter();

const userList = ref([]);
const userSelected = ref(null);
const productList = ref([]);
const productSelected = ref(null);
const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];

const formInput = ref();
const formDialog = ref(false);
const form = ref({
  date: new Date().toISOString().split("T")[0],
  quantity: 0,
  status: null,
});

onMounted(() => {
  getTransactionData();
  getUsers();
  getProducts();
});

const getTransactionData = async () => {
  try {
    const res = await api.get(`/transaction/get/${route.params.id}`);

    if (res.data.status) {
      const { users, products, quantity, date, status } = res.data.results;
      userSelected.value = users;
      productSelected.value = products;
      form.value.quantity = Number(quantity);
      form.value.date = new Date(date).toISOString().split("T")[0];
      form.value.status = status;
    } else {
      Notify.create({
        message: res.data.message,
        color: "negative",
      });
      router.back();
    }
  } catch (error) {
    Notify.create({
      message: "Error getting transaction data",
      color: "negative",
    });
  }
};

const getUsers = async () => {
  try {
    const res = await api.get("/users/get");
    userList.value = res.data.results;
  } catch (error) {
    Notify.create({
      message: "Error getting users data",
      color: "negative",
    });
  }
};

const getProducts = async () => {
  try {
    const res = await api.get("/product/get");
    productList.value = res.data.results;
  } catch (error) {
    Notify.create({
      message: "Error getting products data",
      color: "negative",
    });
  }
};

const onSubmit = async () => {
  try {
    const res = await api.put(`/transaction/edit/${route.params.id}`, {
      ...form.value,
      username: userSelected.value.username,
      productId: productSelected.value.id_product,
    });

    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: "positive",
      });

      router.push({
        name: "dataTransactionsAdmin",
      });
    } else {
      Notify.create({
        message: res.data.msg,
        color: "negative",
      });
    }
  } catch (error) {
    Notify.create({
      message: "Error editing transaction data",
      color: "negative",
    });
  }
};
</script>
