<template>
  <EasyNormalTable :buttonList="buttonList" :showSelection="showSelection" :columns="columns" :data="data" :title="title"  v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';

  export default {
    name: 'PFANS2007View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2007VIEW',
        data: [],
        showSelection:true,
        columns: [
          {
            code: 'number',
            label: 'label.PFANS2007VIEW_NUMBER',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'year',
            label: 'label.PFANS2007VIEW_YEAR',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'name',
            label: 'label.PFANS2007VIEW_NAME',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'email',
            label: 'label.PFANS2007VIEW_EMAIL',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'password',
            label: 'label.PFANS2007VIEW_PASSWORD',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'goldleaf',
            label: 'label.PFANS2007VIEW_GOLDLEAF',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'taxmethod',
            label: 'label.PFANS2007VIEW_TAXMETHOD',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'combinedtax',
            label: 'label.PFANS2007VIEW_COMBINEDTAX',
            width: 250,
            fix: false,
            filter: true,
          },
          {
            code: 'kozo',
            label: 'label.PFANS2007VIEW_KOZO',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'tax',
            label: 'label.PFANS2007VIEW_TAX',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'thefirst ',
            label: 'label.PFANS2007VIEW_THEFIRST',
            width: 350,
            fix: false,
            filter: true,
          },
          {
            code: 'cash',
            label: 'label.PFANS2007VIEW_CASH',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'arithmetic',
            label: 'label.PFANS2007VIEW_ARITHMETIC',
            width: 260,
            fix: false,
            filter: true,
          },
          {
            code: 'gold',
            label: 'label.PFANS2007VIEW_GOLD',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'iemikane',
            label: 'label.PFANS2007VIEW_IEMIKANE',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'notes',
            label: 'label.remarks',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'send',
            label: 'label.PFANS2007VIEW_SEND',
            width: 200,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'edit', 'name': 'button.save', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'deliver', 'name': 'button.deliver', 'disabled': false,},
          {'key': 'import', 'name': 'button.import', 'disabled': false,},
        ],
      };
    },
  };
</script>

<style scoped>

</style>
