<template>
  <div>
    <div>
      <label for="address_id">AddressID</label>
      <input id="address_id" name="address_id" :value="value.id" disabled />
    </div>
    <div>
      <label for="name">Contact name</label>
      <input
        id="name"
        name="name"
        :value="value.name"
        @change="updateFormValue('name', $event.target.value)" />
    </div>
    <div>
      <label for="street">Street</label>
      <input
        id="street"
        name="street"
        :value="value.street"
        @change="updateFormValue('street', $event.target.value)" />
    </div>
    <div>
      <label for="city">City</label>
      <input
        id="city"
        name="city"
        :value="value.city"
        @change="updateFormValue('city', $event.target.value)" />
    </div>
    <div>
      <label for="postal_code">Postal code</label>
      <input
        id="postal_code"
        name="postal_code"
        :value="value.postal_code"
        @change="updateFormValue('postal_code', $event.target.value)" />
    </div>
    <div>
      <label for="state">State</label>
      <input
        id="state"
        name="state"
        :value="value.state"
        @change="updateFormValue('state', $event.target.value)" />
    </div>
    <div>
      <label for="country">Country</label>
      <input
        id="country"
        name="country"
        :value="value.country"
        @change="updateFormValue('country', $event.target.value)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AddressForm',
  props: ['value', 'address'],
  methods: {
    updateFormValue(field: string, value: string): void {
      this.$emit('input', { ...this.value, [field]: value });
    },
  },
});
</script>
