<template>
  <q-page padding>
    <section>
      <div>
        <div class="mb-3">
          <h2 class="text-xl font-bold">All Transactions Data</h2>
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
            :loading="loading"
            color="secondary"
            class="w-full"
            :rows-per-page-options="[10, 25, 50]"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id_transactions" :props="props">
                  {{ props.row.id_transactions }}
                </q-td>
                <q-td key="date" :props="props">
                  {{ dateFormat(props.row.date) }}
                </q-td>
                <q-td key="username" :props="props">
                  {{ props.row.username }}
                </q-td>
                <q-td
                  key="id_product"
                  :props="props"
                  class="ellipsis"
                  style="max-width: 8rem"
                >
                  {{ props.row.products.name }}
                </q-td>
                <q-td key="quantity" :props="props">
                  {{ props.row.quantity }} Pcs
                </q-td>
                <q-td key="total_price" :props="props">
                  {{ formatPrice(props.row.total_price) }}
                </q-td>
                <q-td key="status" :props="props">
                  <q-badge
                    :color="getBadgeStatus(props.row.status)"
                    class="font-semibold text-sm"
                  >
                    {{ props.row.status }}
                  </q-badge>
                </q-td>
                <q-td key="action" :props="props">
                  <div class="flex flex-col gap-2">
                    <q-btn
                      :to="{
                        name: 'editDataTransactionsAdmin',
                        params: { id: props.row.id_transactions },
                      }"
                      color="yellow-7"
                      unelevated
                      icon="edit"
                      no-caps
                    />
                    <q-btn
                      @click="deleteTransaction(props.row.id_transactions)"
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
              <h2 class="text-xl font-semibold">Transactions Table</h2>
            </template>

            <template v-slot:top-right>
              <q-btn
                @click="openDialog"
                label="Add Transaction"
                color="primary"
                icon="add"
                no-caps
              />
            </template>
          </q-table>

          <q-dialog v-model="formDialog" position="right" full-height maximized>
            <q-card style="width: 400px; max-width: 70vw" class="p-2">
              <q-card-section>
                <div class="text-h6">Add Transaction</div>
                <div>Generate a new transaction from a user.</div>
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
                    :rules="[
                      (val) => val > 0 || 'Quantity must be greater than 0',
                    ]"
                  />
                  <q-select
                    v-model="form.status"
                    :options="statusOptions"
                    label="Status"
                    outlined
                  />
                </q-form>
              </q-card-section>

              <q-card-actions align="right" class="text-teal">
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
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { Dark, Notify, colors, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { dateFormat, formatPrice, getBadgeStatus } from "src/helper/utils";
import { onMounted, ref } from "vue";

const loading = ref(true);

const q = useQuasar();

const userList = ref([]);
const userSelected = ref(null);
const productList = ref([]);
const productSelected = ref(null);
const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];

const columns = [
  {
    name: "id_transactions",
    align: "left",
    label: "Transaction ID",
    field: "id_transactions",
    sortable: true,
  },
  {
    name: "date",
    align: "left",
    label: "Date",
    field: "date",
    sortable: true,
  },
  {
    name: "username",
    align: "left",
    label: "User",
    field: "username",
    sortable: true,
  },
  {
    name: "id_product",
    align: "left",
    label: "Product",
    field: "id_product",
    sortable: true,
  },
  {
    name: "quantity",
    align: "left",
    label: "Quantity",
    field: "quantity",
    sortable: true,
  },
  {
    name: "total_price",
    align: "left",
    label: "Total",
    field: "total_price",
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "action",
    align: "left",
    label: "Action",
    field: "action",
  },
];

const formInput = ref();
const formDialog = ref(false);
const form = ref({
  date: "",
  quantity: 0,
  status: null,
});

const rows = ref([]);

onMounted(() => {
  getTransactionsData();
  getUsers();
  getProducts();
});

const getTransactionsData = async () => {
  try {
    loading.value = true;

    const res = await api.get("/transaction/get");
    if (res.data.status) {
      rows.value = res.data.results;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting transaction data",
      color: "negative",
    });
  } finally {
    loading.value = false;
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

const openDialog = () => {
  resetForm();
  formDialog.value = true;
};

const resetForm = () => {
  form.value = {
    date: "",
    quantity: 0,
    status: "",
  };
  userSelected.value = null;
  productSelected.value = null;
};

const onSubmit = async () => {
  try {
    const res = await api.post("/transaction/insert", {
      ...form.value,
      username: userSelected.value.username,
      productId: productSelected.value.id_product,
    });

    if (res.data.status) {
      Notify.create({
        message: res.data.msg,
        color: "positive",
      });

      formDialog.value = false;
      resetForm();
      getTransactionsData();
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

const deleteTransaction = (id) => {
  q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this transaction?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      const res = await api.delete(`/transaction/delete/${id}`);
      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: "positive",
        });
        getTransactionsData();
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
