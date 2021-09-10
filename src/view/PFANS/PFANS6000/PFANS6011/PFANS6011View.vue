<template>
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         ref="container" :showSelection="isShow"
                         @buttonClick="buttonClick" v-loading="loading"
                         :noback="noback">
      <div slot="customize" style="width: 100%">
        <el-form :model="form" label-position="top" label-width="8vw" employedref="refform" ref="form"
                 style="padding: 0.5vw">
          <el-row style="padding-top: 3%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS6011VIEW_YEARS')">
                <el-date-picker
                  :placeholder="$t('normal.error_09')"
                  @change="changeYear"
                  type="year"
                  v-model="form.year"
                  style="width:10vw">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS6011VIEW_GROUP')" prop="center_id">
                <el-select v-model="form.group_id" style="width: 15vw"
                           @change="changeGroup">
                  <el-option
                    v-for="item in optionsdata"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-bottom: 0.5%">
            <el-table :data="tableData" border default-expand-all header-cell-class-name="sub_bg_color_blue" style="margin-top: 1%;font-size: 13px"
                      row-key="wai_id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" height="540"
                      highlight-current-row @current-change="handleCurrentChange">
              <el-table-column
                show-overflow-tooltip
                prop="themename"
                :label="$t('label.PFANS6011VIEW_THEME')"
                width="180">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="divide"
                :label="$t('label.PFANS6011VIEW_ENTRUSTTYPE')"
                width="140">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="toolsorgs"
                :label="$t('label.PFANS6011VIEW_ENTRUST')"
                width="180">
              </el-table-column>
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="project_name"
                :label="$t('label.PFANS6011VIEW_PJ')"
                width="180">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="company"
                :label="$t('label.PFANS6011VIEW_SSCOMPANY')"
                width="180">
              </el-table-column>
              <el-table-column
                width="100"
                prop="april"
                align="center"
                :label="$t('label.PFANS6011VIEW_APRIL')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="may"
                :label="$t('label.PFANS6011VIEW_MAY')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="june"
                :label="$t('label.PFANS6011VIEW_JUNE')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="july"
                :label="$t('label.PFANS6011VIEW_JULY')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="august"
                :label="$t('label.PFANS6011VIEW_AUGUST')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="september"
                :label="$t('label.PFANS6011VIEW_SEPTEMBER')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="october"
                :label="$t('label.PFANS6011VIEW_OCTOBER')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="november"
                :label="$t('label.PFANS6011VIEW_NOVEMBER')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="december"
                :label="$t('label.PFANS6011VIEW_DECEMBER')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="january"
                :label="$t('label.PFANS6011VIEW_JANUARY')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="february"
                :label="$t('label.PFANS6011VIEW_FEBRUARY')">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="march"
                :label="$t('label.PFANS6011VIEW_MARCH')">
              </el-table-column>
              <el-table-column
                width="110"
                align="center"
                prop="total"
                :label="$t('label.PFANS6011VIEW_TOTAL')">
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from "../../../components/dicselect.vue";
  import {Message} from 'element-ui';
  import {getCurrentRoleNew, getDictionaryInfo, getOrgInfo} from '../../../../utils/customize';
  import moment from 'moment';
  import json2csv from 'json2csv';

  export default {
    name: 'PFANS6011View',
    components: {
      dicselect,
      EasyNormalContainer,
    },
    data() {
      return {
        currentRow: null,
        hasChildren: true,
        noback: true,
        loading: false,
        form: {
          year: moment(new Date()).format('YYYY'),
          group_id: '',
        },
        title: 'title.PFANS6011VIEW',
        optionsdata: [],
        buttonList: [
          {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},
        ],
        rowid: '',
        row: '',
        isShow: false,
        tableData: [{
          wai_id: '1',
          theme: '',
          divide: '',
          toolsorgs: '',
          project_name: '-',
          company: '—',
          april: '—',
          may: '—',
          june: '—',
          july: '—',
          august: '—',
          september: '—',
          october: '—',
          november: '—',
          december: '—',
          january: '—',
          february: '—',
          march: '—',
          total: '—',
          children: [{
            wai_id: '2',
            theme: '',
            divide: '',
            toolsorgs: '',
            project_name: '',
            company: '—',
            april: '—',
            may: '—',
            june: '—',
            july: '—',
            august: '—',
            september: '—',
            october: '—',
            november: '—',
            december: '—',
            january: '—',
            february: '—',
            march: '—',
            total: '—',
            children: [{
              wai_id: '3',
              theme: '',
              divide: '',
              toolsorgs: '',
              project_name: '',
              company: '',
              april: '',
              may: '',
              june: '',
              july: '',
              august: '',
              september: '',
              october: '',
              november: '',
              december: '',
              january: '',
              february: '',
              march: '',
              total: ''
            }],
          }],
        }]
      };
    },
    mounted() {
      this.getById();
      this.getTableinfo();
    },
    methods: {
      //region 选择行高亮
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      //endregion 选择行高亮
      getById() {
        this.loading = true;
        //update gbb 20210331 2021组织架构变更-group下拉变为center下拉 start
        let role = getCurrentRoleNew();
        const vote = [];
        if (role === '3') {//CENTER
          vote.push(
            {
              value: this.$store.getters.userinfo.userinfo.centerid,
              lable: this.$store.getters.userinfo.userinfo.centername,
            },
          );
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs)
          {
            for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
            {
              if (others.centerid != null)
              {
                // let groupname = getOrgInfo(others.groupid);
                // if (groupname) {
                //   vote.push(
                //     {
                //       value: others.groupid,
                //       lable: groupname.companyname,
                //     },
                //   );
                // }
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        value: item.centerid,
                        lable: item.centername,
                      },
                    );
                  }
                })
              }
            }
          }
          //add ccm 0112 兼职部门
          this.form.group_id = this.$store.getters.userinfo.userinfo.centerid;
        } else if (role === '2') {//副总经理
          this.$store.getters.orgGroupList.filter((item) => {
            if (item.virtualuser === this.$store.getters.userinfo.userid) {
              vote.push(
                {
                  value: item.centerid,
                  lable: item.centername,
                },
              );
            }
          })
          // let centerId = this.$store.getters.userinfo.userinfo.centerid;
          // let orgs = getDownOrgInfo(centerId);
          // if (orgs){
          //   if(orgs.length > 0){
          //     this.group_id = orgs[0]._id;
          //   }
          //   for (let org of orgs) {
          //     console.log(org)
          //     vote.push(
          //       {
          //         value: org._id,
          //         lable: org.companyname,
          //       },
          //     );
          //   }
          // }
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs)
          {
            for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
            {
              // if (others.groupid)
              // {
              //   // let groupname = getOrgInfo(others.groupid);
              //   // if (groupname) {
              //   //   vote.push(
              //   //     {
              //   //       value: others.groupid,
              //   //       lable: groupname.companyname,
              //   //     },
              //   //   );
              //   // }
              // }
              // else
              if (others.centerid)
              {
                // let centerId = others.centerid;
                // let orgs = getDownOrgInfo(centerId);
                // if (orgs){
                //   for (let org of orgs) {
                //     vote.push(
                //       {
                //         value: org._id,
                //         lable: org.companyname,
                //       },
                //     );
                //   }
                // }
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        value: item.centerid,
                        lable: item.centername,
                      },
                    );
                  }
                })
              }
            }
          }
          //add ccm 0112 兼职部门
        } else if (role === '1') {//总经理
          //update gbb 20210331 之后的代码有判断，此处重复(总经理) start
          // let centerId = this.$store.getters.userinfo.userinfo.centerid;
          // let orgs = getDownOrgInfo(centerId);
          // if (orgs){
          //   if(orgs.length > 0){
          //     if(getDownOrgInfo(orgs[0]._id).length > 0){
          //       this.group_id = getDownOrgInfo(orgs[0]._id)[0]._id;
          //     }
          //   }
          //   for (let center of orgs) {
          //     let centers = getDownOrgInfo(center._id);
          //     if (centers){
          //       for (let group of centers) {
          //         vote.push(
          //           {
          //             value: group._id,
          //             lable: group.companyname,
          //           },
          //         );
          //       }
          //     }
          //
          //   }
          // }
          //update gbb 20210331 之后的代码有判断，此处重复 end
        }
        else if (role === '4') //GM
        {
          let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
          if (centers)
          {
            if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined)
            {
              vote.push(
                {
                  value: this.$store.getters.userinfo.userinfo.groupid,
                  lable: this.$store.getters.userinfo.userinfo.groupname,
                },
              );
            }
          }
        }
        const vote1 = [];
        //let role9 = getCurrentRole9();
        //
        if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
          || this.$store.getters.roles.indexOf("11") != -1 //总经理
          || this.$store.getters.roles.indexOf("16") != -1 //财务部长
          || this.$store.getters.roles.indexOf("18") != -1//企划部长
          || this.$store.getters.roles.indexOf("22") != -1)//外注管理担当
        {
          this.$store.getters.orgGroupList.filter((item) => {
            vote1.push(
              {
                value: item.centerid,
                lable: item.centername,
              },
            );
          })
          // let orgs = getDownOrgInfo(centerId);
          // if (orgs){
          //   if(orgs.length > 0){
          //     if(getDownOrgInfo(orgs[0]._id).length > 0){
          //       this.group_id = getDownOrgInfo(orgs[0]._id)[0]._id;
          //     }
          //   }
          //   for (let center of orgs) {
          //     let centers = getDownOrgInfo(center._id);
          //     if (centers){
          //       for (let group of centers) {
          //         vote1.push(
          //           {
          //             value: group._id,
          //             lable: group.companyname,
          //           },
          //         );
          //       }
          //     }
          //   }
          // }
          this.optionsdata = vote1;
        }
        else
        {
          this.optionsdata = vote;
        }
        //去重
        let letoptionsdata = [];
        let arrId = [];
        for(var item of this.optionsdata){
          if(arrId.indexOf(item['lable']) == -1){
            arrId.push(item['lable']);
            letoptionsdata.push(item);
          }
        }
        //update gbb 20210331 2021组织架构变更-group下拉变为center下拉 end
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for(let item of letoptionsdata){
          if(getOrgInfo(item.value).encoding == ''){
            incfmyList.push(item.value)
          }
        }
        if(incfmyList.length > 0){
          for(let item of incfmyList){
            letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item)
          }
          let orgInfo = [];
          for(let item of incfmyList){
            if(item){
              if(getOrgInfo(item).orgs.length != 0){
                orgInfo.push(getOrgInfo(item).orgs)
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for(let item of groInfo){
            letoptionsdata.push(
              {
                value: item._id,
                lable: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
        this.optionsdata = letoptionsdata;
        if(this.optionsdata.length > 0){
          this.form.group_id = this.optionsdata[0].value;
        }
        this.loading = false;
      },
      changeYear(val) {
        this.tableData = [];
        this.form.year = val;
        this.getTableinfo();
      },
      changeGroup(val) {
        this.tableData = [];
        this.form.group_id = val;
        this.getTableinfo();
      },
      getTableinfo() {
        this.loading = true;
        this.$store.dispatch('PFANS6011Store/getTableinfo', {'year': this.form.year, 'group_id': this.form.group_id})
          .then(response => {
            if (response.length > 0) {
              let m = 1;
              let n = 2;
              for (let i = 0; i < response.length; i++) {
                if (response[i].divide !== null && response[i].divide !== '') {
                  let divide = getDictionaryInfo(response[i].divide);
                  if (divide != null) {
                    response[i].divide = divide.value1;
                  }
                }
              }
              this.tableData = response;
              for (let i = 0; i < this.tableData.length - 1; i++) {
                this.tableData[i].children = this.tableData[i].pjExternalInjectionListVo;
                this.tableData[i].wai_id = m;
                m += 2;
                if (this.tableData[i].children !== undefined && this.tableData[i].children !== null) {
                  for (let j = 0; j < this.tableData[i].children.length - 1; j++) {
                    this.tableData[i].children[j].children = this.tableData[i].children[j].pjExternalInjectionList;
                    this.tableData[i].children[j].wai_id = this.tableData[i].children[j].companyprojects_id + m;
                    this.tableData[i].children[j].themename = '';
                    this.tableData[i].children[j].toolsorgs = '';
                    this.tableData[i].children[j].divide = '';
                    if (this.tableData[i].children[j].children !== undefined && this.tableData[i].children[j].children !== null) {
                      for (let l = 0; l < this.tableData[i].children[j].children.length; l++) {
                        this.tableData[i].children[j].children[l].wai_id = n;
                        n += 2;
                        this.tableData[i].children[j].children[l].themename = '';
                        this.tableData[i].children[j].children[l].toolsorgs = '';
                        this.tableData[i].children[j].children[l].divide = '';
                        this.tableData[i].children[j].children[l].project_name = '';
                      }
                      //项目小计
                      // this.tableData[i].children[j].children[this.tableData[i].children[j].children.length - 1].themename = '小计';
                    }
                  }
                  //theme小计
                  this.tableData[i].children[this.tableData[i].children.length - 1].themename = "小计";
                  this.tableData[i].children[this.tableData[i].children.length - 1].wai_id = this.tableData[i].children[this.tableData[i].children.length - 1].companyprojects_id + 1;
                }
              }
              // theme合计
              this.tableData[this.tableData.length - 1].wai_id = m + "a";
            } else {
              this.tableData = [];
            }
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
        if (val === 'export') {
          if (this.tableData.length === 0) {
            Message({
              message: this.$t('normal.info_16'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          let winopen =  'http://localhost:8085/jmreport/view/2534e5db09854a17bdbe4e113e558a06?';
          winopen = winopen + 'year=' + this.form.year + '&group_id=' + this.form.group_id
          window.open(winopen,'_blank');
        }
      },
      exportdata(vardata) {
        let heads = [
          this.$t('label.PFANS6011VIEW_THEME'),this.$t('label.PFANS6011VIEW_ENTRUSTTYPE')
          ,this.$t('label.PFANS6011VIEW_ENTRUST'), this.$t('label.PFANS6011VIEW_PJ'),this.$t('label.PFANS6011VIEW_SSCOMPANY'), this.$t('label.PFANS6011VIEW_APRIL')
          ,this.$t('label.PFANS6011VIEW_MAY'), this.$t('label.PFANS6011VIEW_JUNE'), this.$t('label.PFANS6011VIEW_JULY')
          ,this.$t('label.PFANS6011VIEW_AUGUST'),this.$t('label.PFANS6011VIEW_SEPTEMBER'), this.$t('label.PFANS6011VIEW_OCTOBER')
          ,this.$t('label.PFANS6011VIEW_NOVEMBER'), this.$t('label.PFANS6011VIEW_DECEMBER'), this.$t('label.PFANS6011VIEW_JANUARY')
          ,this.$t('label.PFANS6011VIEW_FEBRUARY'),this.$t('label.PFANS6011VIEW_MARCH'), this.$t('label.PFANS6011VIEW_TOTAL')];
        let csvData = [];
        for (let i = 0; i < vardata.length; i++) {
          let obj = vardata[i];
          csvData.push({
            [heads[0]]: obj.themename,
            [heads[1]]: obj.divide,
            [heads[2]]: obj.toolsorgs,
            [heads[3]]: obj.project_name,
            [heads[4]]: obj.company,
            [heads[5]]: obj.april,
            [heads[6]]: obj.may,
            [heads[7]]: obj.june,
            [heads[8]]: obj.july,
            [heads[9]]: obj.august,
            [heads[10]]: obj.september,
            [heads[11]]: obj.october,
            [heads[12]]: obj.november,
            [heads[13]]: obj.december,
            [heads[14]]: obj.january,
            [heads[15]]: obj.february,
            [heads[16]]: obj.march,
            [heads[17]]: obj.total,
          });
          for (let j = 0; j < obj.children.length; j++) {
            let objc = obj.children[j];
            csvData.push({
              [heads[0]]: objc.themename,
              [heads[1]]: objc.divide,
              [heads[2]]: objc.toolsorgs,
              [heads[3]]: objc.project_name,
              [heads[4]]: objc.company,
              [heads[5]]: objc.april,
              [heads[6]]: objc.may,
              [heads[7]]: objc.june,
              [heads[8]]: objc.july,
              [heads[9]]: objc.august,
              [heads[10]]: objc.september,
              [heads[11]]: objc.october,
              [heads[12]]: objc.november,
              [heads[13]]: objc.december,
              [heads[14]]: objc.january,
              [heads[15]]: objc.february,
              [heads[16]]: objc.march,
              [heads[17]]: objc.total,
            });
          }
        }
        const result = json2csv.parse(csvData, {
          excelStrings: true,
        });
        let csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + result;
        const link = document.createElement('a');
        link.href = csvContent;
        link.download = this.form.year + this.$t('label.year') + this.$t('title.PFANS6011VIEW') + '.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
  };
</script>
<!--add_qhr_20210721 修改样式作用域-->
<style rel="stylesheet/scss" lang="scss" scoped>

  .el-table {
    overflow-x: auto;
    overflow-y: auto;
    height:600px;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {

  }

  .el-table::after {
    //position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {

  }

  .tableClass {
    .el-table__fixed-right {
      height: 100% !important;
    }
  }


</style>

