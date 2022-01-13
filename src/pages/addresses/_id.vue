<template>
  <div>
    <div v-if="address">
      <AddressForm v-model="address" :address="address" />
      <button @click="submit">Submit</button>
    </div>
    <div v-else>Loading address...</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AddressForm from '@/components/AddressForm.vue';
import { Address, createAddress, getAddressById } from '@/client/services/address.service';

interface EditAddressProps {
  address?: Address;
}

const EditAddressComponent = Vue.extend<EditAddressProps, {}, {}>({
  name: 'EditAddress',
  components: { AddressForm },
  async asyncData({ route }): Promise<{ address: Address }> {
    const address = await getAddressById(route.params.id);

    return { address };
  },
  data() {
    return { address: undefined };
  },
  methods: {
    async submit() {
      if (!this.address) {
        return;
      }

      await createAddress(this.address);
      await this.$router.push('/addresses');
    },
  },
});

export default EditAddressComponent;
</script>
