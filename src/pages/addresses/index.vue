<template>
  <div class="about">
    <p><NuxtLink to="/addresses/new">New address</NuxtLink></p>
    <div v-for="address in addresses" :key="address.id">
      <p><a :href="getEditUrl(address)">Edit</a></p>
      <p>{{ address.name }} {{ address.street }}</p>
      <p>
        {{ address.city }} {{ address.state }} {{ address.postal_code }}
        {{ address.country }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Address, fetchAddresses } from '@/client/services/address.service';

export default Vue.extend({
  name: 'ManageAddresses',
  async asyncData() {
    const addresses = await fetchAddresses();
    return { addresses };
  },
  data() {
    return { addresses: [] };
  },
  methods: {
    getEditUrl(address: Address) {
      return `/addresses/${address.id}`;
    },
  },
});
</script>
