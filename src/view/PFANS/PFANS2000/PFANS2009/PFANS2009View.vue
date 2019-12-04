<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :title="title" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';

  export default {
    name: 'PFANS2009View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2009VIEW',
        data: [],
        columns: [
          {
            code: 'june',
            label: 'label.PFANS2009VIEW_JUNE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'number',
            label: 'label.PFANS2009VIEW_NUMBER',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'konjiki',
            label: 'label.PFANS2009VIEW_KONJIKI',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'taxengineering',
            label: 'label.PFANS2009VIEW_TAXENGINEERING',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'taxworks',
            label: 'label.PFANS2009VIEW_TAXWORKS',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'kaiho',
            label: 'label.PFANS2009VIEW_KAIHO',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'kokin',
            label: 'label.PFANS2009VIEW_KOKIN',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'stock',
            label: 'label.PFANS2009VIEW_STOCK',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'monthlytax',
            label: 'label.PFANS2009VIEW_MONTHLYTAX',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'industrialparty',
            label: 'label.PFANS2009VIEW_INDUSTRIALPARTY',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'department ',
            label: 'label.PFANS2009VIEW_DEPARTMENT',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'fukutoshi',
            label: 'label.PFANS2009VIEW_FUKUTOSHI',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'costlabor',
            label: 'label.PFANS2009VIEW_COSTLABOR',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'overtime',
            label: 'label.PFANS2009VIEW_OVERTIME',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'incometax',
            label: 'label.PFANS2009VIEW_INCOMETAX',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'achievements',
            label: 'label.PFANS2009VIEW_ACHIEVEMENTS',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'shakonorihiro',
            label: 'label.PFANS2009VIEW_SHAKONORIHIRO',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'kojikin',
            label: 'label.PFANS2009VIEW_KOJIKIN',
            width: 200,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
        ],
      };
    },
  };
</script>

<style scoped>

</style>
