<template>
  <span v-if="!addresses">Loading addresses...</span>
  <span v-else-if="addresses && !addresses.length">
    <b>Addresses list is empty</b>
  </span>

  <select v-else class="form-select" :value="value" @change="$emit('input', $event.target.value)">
    <option value="">Select an address</option>
    <option v-for="address in addresses" :key="address.id" :value="address.id">
      {{ address.country }} - {{ address.name }} {{ address.street }}, {{ address.city }}
      {{ address.postal_code }}, {{ address.state }}
    </option>
  </select>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';
import { Address } from '@/client/services/address.service';

export default Vue.extend({
  name: 'AddressSelector',
  props: {
    value: {
      type: String,
      default: () => '',
    },
    addresses: {
      type: Array as PropType<Address[]>,
      default: () => [],
      required: true,
    },
  },
});
</script>
