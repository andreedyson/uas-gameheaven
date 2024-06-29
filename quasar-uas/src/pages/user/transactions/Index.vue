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
              </q-tr>
            </template>
            <template v-slot:top-left>
              <h2 class="text-xl font-semibold">
                {{ profile.full_name }} Transactions
              </h2>
            </template>
          </q-table>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { Dark, Notify, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { getProfile } from "src/helper/Profile";
import { dateFormat, formatPrice, getBadgeStatus } from "src/helper/utils";
import { onMounted, ref } from "vue";

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
];

const form = ref({
  date: "",
  quantity: 0,
  status: null,
});

const rows = ref([]);

const profile = getProfile();

onMounted(() => {
  getTransactionsData();
  getUsers();
  getProducts();
});

const getTransactionsData = async () => {
  try {
    const res = await api.get(`/transaction/get-user/${profile.username}`);
    if (res.data.status) {
      rows.value = res.data.results;
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
</script>
