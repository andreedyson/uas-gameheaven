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
            color="secondary"
            :loading="loading"
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
                <q-td key="keterangan" :props="props">
                  {{ props.row.keterangan }}
                </q-td>
                <q-td key="action" :props="props">
                  <div class="flex gap-2">
                    <q-btn
                      @click="openDialog(true, props.row)"
                      color="yellow-7"
                      unelevated
                      icon="edit"
                      no-caps
                    />
                    <q-btn
                      @click="deleteBrand(props.row.id_brand)"
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
                @click="openDialog(false)"
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
                <div class="text-h6">{{ editMode ? "Edit" : "Add" }} Brand</div>
                <div>
                  {{ editMode ? "Edit" : "Generate" }} a
                  {{ editMode ? "" : "new" }} Brand.
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit="onSubmit" ref="formInput">
                  <q-input
                    v-model="form.id_brand"
                    label="Brand ID"
                    color="secondary"
                    :readonly="editMode"
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
                    color="secondary"
                    :rules="[
                      (val) => val !== '' || 'Brand name can not be empty',
                    ]"
                  />
                  <q-input
                    v-model="form.keterangan"
                    label="Description"
                    type="textarea"
                    rows="4"
                    :rules="[
                      (val) => val !== '' || 'Keterangan can not be empty',
                    ]"
                    required
                    outlined
                    dense
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

<script setup lang="js">
import { Dark, Notify, colors, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { formatPrice } from "src/helper/utils";
import { onMounted, ref } from "vue";

const loading = ref(true)

const q = useQuasar();
const editMode = ref(false);

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
    name: "keterangan",
    align: "left",
    label: "Keterangan",
    field: "keterangan",
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
  keterangan: ""
});

const rows = ref([]);

onMounted(() => {
  getBrandsData();
});

const getBrandsData = async () => {
  try {
    loading.value = true

    const res = await api.get("/brand/get");

    if (res.data.status) {
      rows.value = res.data.results;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting brands data",
      color: "negative",
    });
  } finally {
    loading.value = false;
  }
};

const openDialog = (isEdit = false, data = null) => {
  resetForm();
  if (isEdit) {
    editMode.value = true;
    form.value.id_brand = data.id_brand;
    form.value.name = data.name;
  }
  formDialog.value = true;
};

const resetForm = () => {
  form.value = {
    id_brand: "",
    name: "",
  };
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
      const res = await api.put("/brand/edit", {
        id_brand: form.value.id_brand,
        name: form.value.name,
        keterangan: form.value.keterangan
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

const deleteBrand = (id) => {
  q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this brand?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      const res = await api.delete("/brand/delete", {
        data: { id_brand: id },
      });
      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: "positive",
        });
        getBrandsData();
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
