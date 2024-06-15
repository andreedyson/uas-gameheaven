<template>
  <q-page padding>
    <section>
      <!-- Dashboard Headers -->
      <div class="mb-3">
        <h2 class="text-xl font-bold">Overview</h2>
      </div>

      <!-- Dashboard Cards -->
      <div class="w-full grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <!-- Card 1 -->
        <div
          v-bind:class="`px-6 py-8 w-full flex items-center gap-6 rounded-md ${
            Dark.isActive ? 'bg-dark' : 'bg-grey-3'
          }`"
        >
          <div
            class="bg-orange-500/20 flex items-center justify-center size-12 rounded-full"
          >
            <q-icon name="conveyor_belt" size="28px" color="orange-14" />
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-400 uppercase">Total Products</p>
            <p class="text-lg font-medium">20 Products</p>
          </div>
        </div>
        <!-- Card 2 -->
        <div
          v-bind:class="`px-6 py-8 w-full flex items-center gap-6 rounded-md ${
            Dark.isActive ? 'bg-dark' : 'bg-grey-3'
          }`"
        >
          <div
            class="bg-green-500/20 flex items-center justify-center size-12 rounded-full"
          >
            <q-icon name="person" size="28px" color="green-13" />
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-400 uppercase">Total Users</p>
            <p class="text-lg font-medium">12 Users</p>
          </div>
        </div>
        <!-- Card 3 -->
        <div
          v-bind:class="`px-6 py-8 w-full flex items-center gap-6 rounded-md ${
            Dark.isActive ? 'bg-dark' : 'bg-grey-3'
          }`"
        >
          <div
            class="bg-yellow-500/20 flex items-center justify-center size-12 rounded-full"
          >
            <q-icon name="receipt_long" size="28px" color="yellow-14" />
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-400 uppercase">Total Transactions</p>
            <p class="text-lg font-medium">10 Transactions</p>
          </div>
        </div>
        <!-- Card 4 -->
        <div
          v-bind:class="`px-6 py-8 w-full flex items-center gap-6 rounded-md ${
            Dark.isActive ? 'bg-dark' : 'bg-grey-3'
          }`"
        >
          <div
            class="bg-purple-500/20 flex items-center justify-center size-12 rounded-full"
          >
            <q-icon name="branding_watermark" size="28px" color="purple-14" />
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-400 uppercase">Total Brands</p>
            <p class="text-lg font-medium">8 Brands</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
      <!-- Recent Activity Section -->
      <div class="md:col-span-3">
        <div class="mb-3">
          <h2 class="text-xl font-bold">Recent Activity</h2>
        </div>
        <div
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
              <q-tr :props="props" @click="onRowClick(props.row)">
                <q-td key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
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
                  {{ props.row.quantity }} pcs
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
              <h2 class="text-xl font-semibold">Transactions Data</h2>
            </template>

            <template v-slot:top-right>
              <q-btn
                @click="openDialog"
                label="Add"
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
                <q-form @submit="onSubmit" ref="formGenre">
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
                </q-form>
              </q-card-section>

              <q-card-actions align="right" class="text-teal">
                <q-btn outline label="Cancel" color="red" v-close-popup />
                <q-btn
                  label="Save"
                  color="primary"
                  @click="formGenre.submit()"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>

      <!-- Highest Spending Section -->
      <div class="md:col-span-1">
        <div class="mb-3">
          <h2 class="text-xl font-bold">Highest</h2>
        </div>
        <div
          v-bind:class="`px-6 py-8 w-full flex items-center gap-6 rounded-md ${
            Dark.isActive ? 'bg-dark' : 'bg-grey-3'
          }`"
        ></div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { Dark, Notify } from "quasar";
import { api } from "src/boot/axios";
import { dateFormat, formatPrice, getBadgeStatus } from "src/helper/utils";
import { onMounted, ref } from "vue";

const formDialog = ref(false);
const form = ref({
  date: new Date(),
  quantity: 1,
});

const userList = ref([]);
const userSelected = ref(null);
const productList = ref([]);
const productSelected = ref(null);

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
];

const rows = ref([]);

onMounted(() => {
  getTransactionData();
  getUsers();
  getProducts();
});

const getTransactionData = async () => {
  try {
    const res = await api.get("/transaction/get");
    rows.value = res.data.results;
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

const openDialog = () => {
  formDialog.value = true;
};
</script>
