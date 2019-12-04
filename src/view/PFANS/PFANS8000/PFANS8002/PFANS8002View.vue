<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" @buttonClick="buttonClick"
                         v-loading="loading" :noback="noback" :title="title">
      <div slot="customize">
        <el-form label-position="left" label-width="8rem" ref="form" style="padding: 2rem">
          <el-tabs @tab-click="handleClick" v-model="activeName">
            <el-tab-pane :label="$t('label.node_step4')" name="first">
              <el-table :data="table"  @row-click="rowclick">
                <el-table-column :label="$t('label.information_title')" align="center" prop="title" width="500%">
                </el-table-column>
                <el-table-column :label="$t('label.information_content')" align="center" prop="content"
                                 width="500%">
                </el-table-column>
                <el-table-column :label="$t('label.information_start')" align="center" prop="createon" width="410%">
                </el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 20px">
                <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                               :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                               @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
                  <slot><span class="front Content_front"
                              style="padding-right: 5px;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS8002VIEW_JS')" name="second">
              <el-table :data="table2"  @row-click="rowclick">
                <el-table-column :label="$t('label.information_title')" align="center" prop="title" width="500%">
                </el-table-column>
                <el-table-column :label="$t('label.information_content')" align="center" prop="content"
                                 width="500%">
                </el-table-column>
                <el-table-column :label="$t('label.information_start')" align="center" prop="createon" width="410%">
                </el-table-column>
              </el-table>
              <div class="pagination-container" style="padding-top: 20px">
                <el-pagination :current-page.sync="listQuery2.page" :page-size="listQuery2.limit"
                               :page-sizes="[5,10,20,30,50]" :total="total2" @current-change="handleCurrentChange2"
                               @size-change="handleSizeChange2" layout="slot,sizes, ->,prev, pager, next, jumper">
                  <slot><span class="front Content_front"
                              style="padding-right: 5px;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
                </el-pagination>
              </div>
            </el-tab-pane>

          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import {Message} from 'element-ui';
    import moment from 'moment';

    export default {
        name: "PFANS8002View.vue",
        components: {
            EasyNormalContainer
        },
        data() {
            return {
                title: 'label.PFANS8002VIEW_XXYL',
                noback: true,
                activeName: 'first',
                table: [
                    {},
                ],
                table2: [
                    {},
                ],
                totaldata: [],
                totaldata2: [],
                listQuery: {
                    page: 1,
                    limit: 5
                },
                listQuery2: {
                    page: 1,
                    limit: 5
                },
                status: '',
                total: 0,
                total2: 0,
                dataList: '',
                dataList2: '',
                selectedlist: '',
                loading: false,
                data: [],
                buttonList:[
                    {key: "open", name: "button.open", disabled: false, icon: ""}],
            };
        },
        mounted() {
            this.status='0'
            this.getStatus();
        },
        methods: {
            getStatus(){
                this.loading = true;
                this.$store
                    .dispatch('indexStore/getStatus', {status:this.status})
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            if(response[j].status==='0'){
                                if (response[j].createon !== null && response[j].createon !== '') {
                                    response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                                }
                                this.table = response;
                                this.totaldata = response;
                                this.dataList=1
                                this.getList();
                                this.loading = false;
                            }
                            if(response[j].status==='1'){
                                if (response[j].createon !== null && response[j].createon !== '') {
                                    response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                                }
                                this.table2 = response;
                                this.totaldata2 = response;
                                this.dataList2=2
                                this.getList();
                                this.loading = false;
                            }
                        }

                    })
                    .catch(err => {
                        this.loading = false;
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
            },
            handleClick(tab, event) {

                if (tab.index === '0' ) {
                    this.status = '1';
                    this.loading = true;
                    this.$store
                        .dispatch('indexStore/getStatus', {status:'0'})
                        .then(response => {
                            for (let j = 0; j < response.length; j++) {
                                if(response[j].status==='0'){
                                    if (response[j].createon !== null && response[j].createon !== '') {
                                        response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                                    }
                                    this.table = response;
                                    this.totaldata = response;
                                    this.dataList=1
                                    this.getList();
                                    this.loading = false;
                                }
                                if(response[j].status==='1'){
                                    if (response[j].createon !== null && response[j].createon !== '') {
                                        response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                                    }
                                    this.table2 = response;
                                    this.totaldata2 = response;
                                    this.dataList2=2
                                    this.getList();
                                    this.loading = false;
                                }
                            }

                        })
                        .catch(err => {
                            this.loading = false;
                            Message({
                                message: err,
                                type: "error",
                                duration: 5 * 1000
                            });
                        });
                } else if (tab.index === '1') {
                    this.status = '0';
                    this.loading = true;
                    this.$store
                        .dispatch('indexStore/getStatus', {status:'1'})
                        .then(response => {
                            for (let j = 0; j < response.length; j++) {
                                if(response[j].status==='0'){
                                    if (response[j].createon !== null && response[j].createon !== '') {
                                        response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                                    }
                                    this.table = response;
                                    this.totaldata = response;
                                    this.dataList=1
                                    this.getList();
                                    this.loading = false;
                                }
                                if(response[j].status==='1'){
                                    if (response[j].createon !== null && response[j].createon !== '') {
                                        response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                                    }
                                    this.table2 = response;
                                    this.totaldata2 = response;
                                    this.dataList2=2
                                    this.getList();
                                    this.loading = false;
                                }
                            }

                        })
                        .catch(err => {
                            this.loading = false;
                            Message({
                                message: err,
                                type: "error",
                                duration: 5 * 1000
                            });
                        });
                }
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleSizeChange2(val) {
                this.listQuery2.limit = val
                this.getList()
            },
            handleCurrentChange2(val) {
                this.listQuery2.page = val
                this.getList()
            },
            getList() {
                if(this.dataList === 1 || this.status === '1'){
                    this.loading = true
                    let start = (this.listQuery.page - 1) * this.listQuery.limit
                    let end = this.listQuery.page * this.listQuery.limit
                    if (this.totaldata) {
                        let pList = this.totaldata.slice(start, end)
                        this.table = pList
                        this.total = this.totaldata.length
                    }
                    this.loading = false
                }
                if(this.dataList2 === 2 || this.status === '0'){
                    this.loading = true
                    let start = (this.listQuery2.page - 1) * this.listQuery2.limit
                    let end = this.listQuery2.page * this.listQuery2.limit
                    if (this.totaldata2) {
                        let pList = this.totaldata2.slice(start, end)
                        this.table2 = pList
                        this.total2 = this.totaldata2.length
                    }
                    this.loading = false
                }

            },
            rowclick(row) {
                this.row = row;
            },
            buttonClick(val) {
              if (val === "open") {
                    if (!this.row || this.row.noticeid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        })
                        return;
                    }
                    let name = this.row.url.replace("/", "");
                    this._id = this.row.noticeid;
                    this.$router.push({
                        name: name,
                        params: {
                            _id: this._id,
                            disabled: false
                        }
                    })
                }
            },
        }
    }
</script>
<style scoped>
</style>
