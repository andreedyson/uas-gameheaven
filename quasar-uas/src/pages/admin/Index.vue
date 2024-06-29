<template>
  <q-page padding>
    <!-- Dashboard Cards Section -->
    <section>
      <div class="mb-3">
        <h2 class="text-xl font-bold">Overview</h2>
      </div>
      <div class="w-full grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <!-- Card 1 -->
        <div v-for="(data, i) in overviewData" :key="i">
          <div
            v-bind:class="`px-6 py-8 w-full flex items-center gap-6 rounded-md ${
              Dark.isActive ? 'bg-dark' : 'bg-grey-3'
            }`"
          >
            <div
              :class="`bg-${data.color}-500/20 flex items-center justify-center size-12 rounded-full`"
            >
              <q-icon
                :name="data.icon"
                size="28px"
                :color="`${data.color}-14`"
              />
            </div>
            <div class="space-y-1">
              <p
                v-bind:class="`text-xs uppercase ${
                  Dark.isActive ? 'text-gray-400' : 'text-gray-800'
                }`"
              >
                {{ data.title }}
              </p>
              <p class="text-lg font-medium">
                {{ data.count }} {{ data.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="mt-6 h-full grid grid-cols-1 md:gap-y-6 md:gap-3 xl:grid-cols-4"
    >
      <!-- Recent Activity Section -->
      <div class="xl:col-span-3 h-full">
        <div class="mb-3">
          <h2 class="text-xl font-bold">Recent Activity</h2>
        </div>
        <q-card
          flat
          v-bind:class="`py-8 w-full h-[700px] gap-6 rounded-md md:px-6  ${
            Dark.isActive ? 'bg-dark' : 'bg-grey-3'
          }`"
        >
          <q-table
            flat
            :rows="rows"
            :columns="columns"
            row-key="name"
            class="w-full"
            :loading="loading"
            color="secondary"
            :rows-per-page-options="[10, 25, 50]"
          >
            <template v-slot:body="props">
              <q-tr :props="props" @click="onRowClick(props.row)">
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

      <!-- Highest Spending Section -->
      <div class="xl:col-span-1 h-full">
        <div class="mb-3">
          <h2 class="text-xl font-bold">Highest</h2>
        </div>
        <div class="h-[700px]">
          <q-card
            flat
            v-bind:class="`py-8 w-full h-full flex items-center rounded-md ${
              Dark.isActive ? 'bg-dark' : 'bg-grey-3'
            }`"
          >
            <router-link
              :to="{ name: 'dataProductsAdmin' }"
              class="w-full px-4 flex items-center duration-200 hover:text-slate-500"
            >
              <div class="flex items-center justify-between w-full">
                <h3 class="text-xl font-semibold">Transaction</h3>
                <span>
                  See All <q-icon name="chevron_right" size="24px" />
                </span>
              </div>
            </router-link>
            <div v-for="(high, i) in highest" :key="i" class="w-full">
              <div class="px-4 flex items-center justify-between pb-4">
                <div class="max-w-[120px]">
                  <h3 class="text-base font-semibold">
                    {{ high.products.name }}
                  </h3>
                </div>
                <div side>
                  <div>{{ dateFormat(high.date) }}</div>
                  <div
                    v-bind:class="`text-base ${
                      Dark.isActive ? 'text-white' : 'text-gray-800'
                    }`"
                  >
                    {{ formatPrice(high.total_price) }}
                  </div>
                </div>
              </div>
              <q-separator v-if="i < highest.length - 1" spaced inset />
            </div>
          </q-card>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { Dark, Notify, colors } from "quasar";
import { api } from "src/boot/axios";
import { dateFormat, formatPrice, getBadgeStatus } from "src/helper/utils";
import { onMounted, ref } from "vue";

const loading = ref(true);

const overviewData = ref([
  {
    name: "Products",
    title: "Total Products",
    icon: "conveyor_belt",
    color: "orange",
    count: 0,
  },
  {
    name: "Users",
    title: "Total Users",
    icon: "person",
    color: "green",
    count: 0,
  },
  {
    name: "Transactions",
    title: "Total Transactions",
    icon: "receipt_long",
    color: "yellow",
    count: 0,
  },
  {
    name: "Brands",
    title: "Total Brands",
    icon: "branding_watermark",
    color: "purple",
    count: 0,
  },
]);

const formInput = ref();
const formDialog = ref(false);
const form = ref({
  date: "",
  quantity: 0,
  status: null,
});

const userList = ref([]);
const userSelected = ref(null);
const productList = ref([]);
const productSelected = ref(null);
const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];

const highest = ref([]);

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
  getTransactionsData();
  getUsers();
  getProducts();
  getHighest();
  getOverviewCount();
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

const getHighest = async () => {
  try {
    const res = await api.get("/transaction/highest");
    if (res.data.status) {
      highest.value = res.data.results;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting highest transactions",
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

const getOverviewCount = async (req, res) => {
  try {
    const usersResponse = await api.get("/users/total-users");
    const productsResponse = await api.get("/product/total-products");
    const brandsResponse = await api.get("/brand/total-brands");
    const transactionsResponse = await api.get(
      "/transaction/total-transactions"
    );

    const [users, products, brands, transactions] = await Promise.all([
      usersResponse,
      productsResponse,
      brandsResponse,
      transactionsResponse,
    ]);

    overviewData.value[0].count = products.data.total_products;
    overviewData.value[1].count = users.data.total_users;
    overviewData.value[2].count = transactions.data.total_transactions;
    overviewData.value[3].count = brands.data.total_brands;
  } catch (error) {
    Notify.create({
      message: "Something went wrong",
      color: "negative",
    });
  }
};
</script>
