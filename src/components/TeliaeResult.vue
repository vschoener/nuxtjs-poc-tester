<template>
  <div v-if="teliaeOutput">
    <div v-if="teliaeOutput.status === 'running'">Running...</div>
    <div v-else-if="teliaeOutput.hasOwnProperty('response_body')">
      <h2>Teliae request</h2>
      <pre>{{ teliaeOutput.teliae_request }}</pre>
      <h2>Result validations</h2>
      <TeliaeOutputValidations :teliae-output="teliaeOutput" />
      <h2>Teliae response</h2>
      <pre>{{ JSON.stringify(teliaeOutput, null, 2) }}</pre>
      <div v-if="pdfStrings.length > 0">
        <h2>PDF Renders</h2>
        <div v-for="pdfData of pdfStrings" :key="pdfData">
          <embed width="800" height="600" :src="`data:application/pdf;base64,${pdfData}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import TeliaeOutputValidations from '@/components/TeliaeOutputValidations.vue';

interface TeliaeResultProps {
  teliaeOutput: {
    // We should define the TeliaeOutput. ex improving body result
    [key: string]: string;
    status: string;
  };
}

export default Vue.extend<{}, {}, {}, TeliaeResultProps>({
  name: 'TeliaeResult',
  components: { TeliaeOutputValidations },
  props: {
    teliaeOutput: {
      type: Object as PropType<TeliaeResultProps['teliaeOutput']>,
      required: true,
    },
  },
  computed: {
    pdfStrings(): string[] {
      const { teliaeOutput } = this.$props;
      const result: string[] = [];

      if (!teliaeOutput || !teliaeOutput.response_body || !teliaeOutput.response_body.shipment) {
        return result;
      }

      for (const shipment of teliaeOutput.response_body.shipment) {
        if (shipment.status !== 'OK') {
          continue;
        }

        if (shipment.label) {
          for (const label of shipment.label) {
            result.push(label.sBase64Label);
          }
        }

        if (shipment.parcel) {
          for (const parcel of shipment.parcel) {
            if (parcel.label) {
              for (const label of parcel.label) {
                result.push(label.sBase64Label);
              }
            }
          }
        }
      }
      return result;
    },
  },
});
</script>
