<template>
  <div>
    <textarea v-model="snapshot"></textarea>
    <TeliaeResult v-if="teliaeResult" :teliae-output="teliaeResult"></TeliaeResult>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TeliaeResult from '@/components/TeliaeResult.vue';

interface ViewSnapshotDataType {
  snapshot: string;
}

export default Vue.extend({
  name: 'ViewSnapshot',
  components: { TeliaeResult },
  data(): ViewSnapshotDataType {
    return {
      snapshot: '',
    };
  },
  computed: {
    teliaeResult() {
      try {
        const parsedSnapshot = JSON.parse(this.snapshot);
        return parsedSnapshot.teliae_result;
      } catch (e) {
        return null;
      }
    },
  },
});
</script>
