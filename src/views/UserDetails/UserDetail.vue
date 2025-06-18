<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppStore } from "../../store/appStore";
import FormInput from "../../components/FormInput.vue";
import router from "../../router";
import { useNumericInput, useStringInput } from "../../reusables/formValidator";

const store = useAppStore();

const editMode = ref(false);

const validEmail = computed(() => {
  if (!/\S+@\S+\.\S+/.test(store.userDetails.email)) return false;
  return true;
});

const validForm = computed(() => {
  const { name, phoneNumber } = store.userDetails;

  return validEmail.value && name && phoneNumber;
});
</script>

<template>
  <!-- Note: Componentize this button or header gets reused  -->
  <div class="bg-[#F5F8FF] w-full h-[25vh] absolute rounded-b-[100%_65%]"></div>
  <div class="content flex flex-col z-10 relative h-[100vh]">
    <header class="flex flex-row">
      <button
        class="cursor-pointer"
        @click="router.push({ path: '/' })"
        aria-label="Go back to home page"
      >
        <img
          src="../../assets/icons/back-arrow-black.svg"
          alt=""
          role="presentation"
        />
      </button>
      <h2 class="flex-1 flex justify-center">Edit Profile</h2>
    </header>

    <section class="flex flex-col items-center mt-15">
      <img
        src="../../assets/images/jane.png"
        width="150"
        height="150"
        alt="profile image"
      />
      <p class="mt-2">Jane Doe</p>
      <p class="mt-1">
        {{ store.userDetails.email }} | {{ store.userDetails.phoneNumber }}
      </p>
    </section>

    <section class="mt-8 flex-1">
      <form id="userForm" @submit.prevent>
        <FormInput
          v-model:input="store.userDetails.name"
          :form-label="'Full Name'"
          :disabled="editMode ? false : true"
          :placeholder="'Jane Doe'"
          :input-validation="() => useStringInput(store.userDetails.name)"
          type="text"
        />
        <FormInput
          v-model:input="store.userDetails.email"
          :form-label="'Email'"
          :disabled="editMode ? false : true"
          :placeholder="'jane@gmail.com'"
          :input-validation="() => useStringInput(store.userDetails.email)"
          type="email"
        />
        <!-- Note: Probably needs a phone number validation -->
        <FormInput
          v-model:input="store.userDetails.phoneNumber"
          :form-label="'Phone Number'"
          :disabled="editMode ? false : true"
          :placeholder="'0123456789'"
          :input-validation="
            () => useNumericInput(store.userDetails.phoneNumber)
          "
          type="text"
        />
      </form>
    </section>

    <footer class="w-full">
      <!-- Note: Make this more dynamic if needed. -->
      <template v-if="!validForm">
        <span class="text-red-500">{{ "One or more fields are invalid" }}</span>
      </template>
      <!-- Note: For now only triggers edit mode, no form submission -->
      <button
        class="bg-[#2E3A5A] text-white p-3 rounded-md w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        form="useForm"
        :disabled="!validForm"
        @click="editMode = !editMode"
      >
        {{ editMode ? "Submit" : "Edit" }}
      </button>
    </footer>
  </div>
</template>
