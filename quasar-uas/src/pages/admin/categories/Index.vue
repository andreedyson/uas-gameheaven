<template>
  <q-page padding>
    <section>
      <div>
        <div class="mb-3">
          <h2 class="text-xl font-bold">All Categories Data</h2>
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
                <q-td key="id_category" :props="props">
                  <q-badge color="green-10">
                    {{ props.row.id_category }}
                  </q-badge>
                </q-td>
                <q-td key="name" :props="props">
                  {{ props.row.name }}
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
                      @click="deleteCategory(props.row.id_category)"
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
              <h2 class="text-xl font-semibold">Categories Table</h2>
            </template>

            <template v-slot:top-right>
              <q-btn
                @click="openDialog(false)"
                label="Add Category"
                color="primary"
                icon="add"
                no-caps
              />
            </template>
          </q-table>

          <q-dialog v-model="formDialog" position="right" full-height maximized>
            <q-card style="width: 400px; max-width: 70vw" class="p-2">
              <q-card-section>
                <div class="text-h6">
                  {{ editMode ? "Edit" : "Add" }} Category
                </div>
                <div>
                  {{ editMode ? "Edit" : "Generate" }} a
                  {{ editMode ? "" : "new" }} Category.
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit="onSubmit" ref="formInput">
                  <q-input
                    v-model="name"
                    label="category Name"
                    :rules="[
                      (val) => val !== '' || 'category name can not be empty',
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
const idCategory = ref(0);

const columns = [
  {
    name: "id_category",
    align: "left",
    label: "category ID",
    field: "id_category",
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
const name = ref("");

const rows = ref([]);

onMounted(() => {
  getcategoriesData();
});

const getcategoriesData = async () => {
  try {
    const res = await api.get("/category/get");

    if (res.data.status) {
      rows.value = res.data.results;
    }
  } catch (error) {
    Notify.create({
      message: "Error getting categories data",
      color: "negative",
    });
  }
};

const openDialog = (isEdit = false, data = null) => {
  resetForm();
  if (isEdit) {
    editMode.value = true;
    name.value = data.name;
    idCategory.value = data.id_category;
  }
  formDialog.value = true;
};

const resetForm = () => {
  name.value = "";
  editMode.value = false;
  idCategory.value = 0;
};

const onSubmit = async () => {
  try {
    if (!editMode.value) {
      const res = await api.post("/category/insert", {
        name: name.value,
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
      const res = await api.put(`/category/edit/${idCategory.value}`, {
        name: name.value,
      });

      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: "positive",
        });

        formDialog.value = false;
        resetForm();
        getcategoriesData();
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

const deleteCategory = (id) => {
  q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this category?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      const res = await api.delete(`/category/delete/${id}`);
      if (res.data.status) {
        Notify.create({
          message: res.data.msg,
          color: "positive",
        });
        getcategoriesData();
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
