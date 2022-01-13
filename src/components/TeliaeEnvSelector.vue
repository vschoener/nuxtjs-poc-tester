<template>
  <div>
    <label class="form-label">Teliae endpoint</label>
    <div v-for="(option, index) in options" :key="index" class="form-check">
      <input
        :id="'env-' + index"
        v-model="selectedEnv"
        :value="option.value"
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        @change="setTeliaeEnv($event.target.value)" />
      <label class="form-check-label" :for="'env-' + index">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TeliaeEnvSelector',
  props: ['value'],
  data() {
    return {
      selectedEnv: this.value,
      options: [
        {
          label: 'VM (vmsc.station-chargeur.com)',
          value: 'VM',
        },
        {
          label: 'Recette (recettesc.station-chargeur.com)',
          value: 'RECETTE',
        },
        {
          label: 'Prod (backmarket.station-chargeur.com)',
          value: 'PROD',
        },
      ],
    };
  },
  methods: {
    setTeliaeEnv(env: string) {
      this.$emit('input', env);
    },
  },
});
</script>
