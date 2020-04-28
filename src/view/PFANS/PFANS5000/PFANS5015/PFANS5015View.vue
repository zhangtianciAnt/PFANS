<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data"
                   :showSelection="isShow"
                   @buttonClick="buttonClick"
                   :title="title" ref="roletable"
                   v-loading="loading">
    <div slot="search">
      <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 5px">
        <el-form-item>
          <el-row style="padding-top: 10px">
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2016VIEW_OCCURRENCEDATE')">
                <el-date-picker
                  @change="filter"
                  type="date"
                  v-model="start">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2016VIEW_FINISHEDDATE')">
                <el-date-picker
                  @change="filter"
                  type="date"
                  v-model="end">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getUserInfo} from '@/utils/customize';
  import user from '../../../components/user';
  import org from '../../../components/org';
  import {getCooperinterviewListByAccount} from '../../../../utils/customize';

  export default {
    name: 'PFANS5015',
    components: {
      EasyNormalTable,
      user,
      org,
    },
    data() {
      return {
        start: '',
        end: '',
        showSelection: true,
        buttonList: [
          //{'key': 'import', 'name': 'button.import', 'disabled': false, 'icon': 'el-icon-upload2'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-upload2'},
        ],
        contractType: '0',
        loading: false,
        title: 'title.PFANS5015VIEW',
        disabled: false,
        disable: true,
        contractnumbercount: '',
        dialogTableVisible1: true,
        selectedlist: [],
        isShow: true,
        data: [],
        form: {
          log_datefromend: '',
          project_name: '',
          bpplayer: '',
          bpnumber: '',
          name_id: '',
          name: '',
        },
        gridData: [],
        gridDatabpplayer: '',
        multiple: false,
        search: '',
        columns: [
          {
            code: 'username',
            label: 'label.user_name',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'project_name',
            label: 'label.PFANS5008VIEW_PROGRAM',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'contractno',
            label: 'label.PFANS1007FORMVIEW_CONTRACTNO',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'time',
            label: 'label.PFANS5015VIEW_FORMVIEW_SC',
            width: 140,
            fix: false,
            filter: true,
          },
        ],
        row: '',
        contractnumber: '',
        state: '',
        allData:[],
        contractList:[]
      };
    },
    created() {
    },
    async mounted() {
      await this.getcontract();
      await this.getProjectList();
    },
    methods: {
      filter(){
        let rst = [...this.allData];
        if (this.start){
          rst = rst.filter(item => moment(item.log_date).format("YYYY-MM-DD")  >= moment(this.start).format("YYYY-MM-DD"));
        }

        if (this.end){
          rst = rst.filter(item => moment(item.log_date).format("YYYY-MM-DD")  <= moment(this.end).format("YYYY-MM-DD"));
        }

        let filters = new Set();
        for (let al2 of rst) {
          filters.add(al2)
        }
        let filtersrst = [...new Set(filters)];
        var hash = {};
        filtersrst = filtersrst.reduce(function (item, next) {
          if (hash[next.unique]) {
            ''
          } else {
            hash[next.unique] = true && item.push(next)
          }
          return item
        }, []);
        for (let it of filtersrst){
          let time = 0;
          let r = rst.filter(item => item.username === it.username && item.project_name === it.project_name);
          for (let su of r){
            time = Number(time) + Number(su.time_start);
          }
          it.time = time.toFixed(2);
        }

        this.data = filtersrst;
      },
      getcontract(){
        this.$store
          .dispatch('PFANS5001Store/selectAll', {})
          .then(responses => {
            if (responses)
            {
              this.contractList = responses;
            }
          });
      },
      getProjectList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getDataList', {})
          .then(response => {
              for (let j = 0; j < response.length; j++) {
                let user = getUserInfo(response[j].createby);
                if (user) {
                  response[j].username = user.userinfo.customername;
                } else {
                  let co = getCooperinterviewListByAccount(response[j].createby);
                  if (co) {
                    response[j].username = co.expname;
                  }
                }
                response[j].log_date = moment(response[j].log_date).format('YYYY-MM-DD');
                if (response[j].time_end !== null && response[j].time_end !== '') {
                  response[j].time_end = moment(response[j].time_end).format('HH:mm');
                }
                response[j].unique = response[j].username + response[j].project_name;
                response[j].contractno='';
              }
            let result = [];
            this.loading = true;

            for (let i = 0; i < response.length; i++)
            {
              if (response[i].project_id !== null && response[i].project_id !== '')
              {
                let r = this.contractList.filter(item => item.companyprojects_id === response[i].project_id);
                for (let su of r){
                  if (response[i].contractno !==null &&  response[i].contractno !=='' && response[i].contractno !==undefined)
                  {
                    response[i].contractno = response[i].contractno + ',' + su.contract;
                  }
                  else
                  {
                    response[i].contractno = su.contract;
                  }
                }
              }
            }
            this.allData = response;
            this.filter();
            this.loading = false;

            })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });


      },
      buttonClick(val) {
        if (this.$refs.roletable.selectedList.length === 0) {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        debugger;
        this.selectedlist = this.$refs.roletable.selectedList;
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
            this.$t('label.user_name'),
            this.$t('label.PFANS5008VIEW_PROGRAM'),
            this.$t('label.PFANS1007FORMVIEW_CONTRACTNO'),
            this.$t('label.PFANS5015VIEW_FORMVIEW_SC'),

          ];
          const filterVal = [
            'username',
            'project_name',
            'contractno',
            'time',
          ];
          const list = this.selectedlist;
          debugger;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS5015'));
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        }));
      },
    },

  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .dpSupIndex {
    .content {
      height: 34px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-y: scroll;
      overflow-x: hidden;
      line-height: 34px;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    }

    .bg {
      background: white;
      border-width: 1px;
    }

    .content {
      height: 34px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-y: scroll;
      overflow-x: hidden;
      line-height: 34px;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    }

    .bg {
      background: white;
      border-width: 1px;
    }
  }
</style>
