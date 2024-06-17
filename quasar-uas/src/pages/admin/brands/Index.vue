<template>
  <q-page padding>
    <section>
      <div>
        <div class="mb-3">
          <h2 class="text-xl font-bold">All Brands Data</h2>
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
                <q-td key="id_brand" :props="props">
                  <q-badge color="green-10">
                    {{ props.row.id_brand }}
                  </q-badge>
                </q-td>
                <q-td key="name" :props="props">
                  {{ props.row.name }}
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
                  <div class="flex gap-2">
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
              <h2 class="text-xl font-semibold">Brands Table</h2>
            </template>

            <template v-slot:top-right>
              <q-btn
                @click="openDialog()"
                label="Add Brand"
                color="primary"
                icon="add"
                no-caps
              />
            </template>
          </q-table>

          <q-dialog v-model="formDialog" position="right" full-height maximized>
            <q-card style="width: 400px; max-width: 70vw" class="p-2">
              <q-card-section>
                <div class="text-h6">{{ editMode ? "Add" : "Edit" }} Brand</div>
                <div>
                  {{ editMode ? "Generate" : "Edit" }} a
                  {{ !editMode && "new" }} Brand.
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit="onSubmit" ref="formInput">
                  <q-input
                    v-model="form.id_brand"
                    label="brand ID"
                    :rules="[
                      (val) => val !== '' || 'Brand ID can not be empty',
                      (val) =>
                        val.length <= 4 ||
                        'Brand ID can not be more tha 4 characters',
                    ]"
                  />
                  <q-input
                    v-model="form.name"
                    label="Brand Name"
                    :rules="[
                      (val) => val !== '' || 'Brand name can not be empty',
                    ]"
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
import { formatPrice } from "src/helper/utils";
import { onMounted, ref } from "vue";

const q = useQuasar();
const editMode = ref(false);
const idEdit = ref(0);

const columns = [
  {
    name: "id_brand",
    align: "left",
    label: "Brand ID",
    field: "id_brand",
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
    name: "action",
    align: "left",
    label: "Action",
    field: "action",
  },
];

const formInput = ref();
const formDialog = ref(false);
const form = ref({
  id_brand: "",
  name: "",
});

const rows = ref([]);

onMounted(() => {
  getBrandsData();
});

const getBrandsData = async () => {
  try {
    const res = await api.get("/brand/get");

    if (res.data.status) {
      rows.value = res.data.results;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting brands data",
      color: "negative",
    });
  }
};

const openDialog = (isEdit = false, data) => {
  resetForm();
  if (isEdit) {
    editMode.value = true;
    form.value.id_brand = data.id_brand;
    form.value.name = data.name;
    idEdit.value = data.id_brand;
  }
  formDialog.value = true;
};

const resetForm = () => {
  form.value = {
    id_brand: "",
    name: "",
  };
  idEdit.value = 0;
  editMode.value = false;
};

const onSubmit = async () => {
  try {
    if (!editMode.value) {
      const res = await api.post("/brand/insert", {
        ...form.value,
      });

      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: "positive",
        });

        formDialog.value = false;
        resetForm();
        getBrandsData();
      } else {
        Notify.create({
          message: res.data.msg,
          color: "negative",
        });
      }
    } else {
      const res = await api.put(`brnd/edit/${idEdit.value}`, {
        ...form.value,
      });

      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: "positive",
        });

        formDialog.value = false;
        resetForm();
        getBrandsData();
      } else {
        Notify.create({
          message: res.data.msg,
          color: "negative",
        });
      }
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
