<template>
  <div  element-loading-spinner="el-icon-loading" style="height: calc(100vh - 60px - 2rem)">
    <el-card>
      <el-collapse v-model="activeNames">
        <el-collapse-item :name="index" v-for="(list,index) in flowList" :key="index">
          <template slot="title">
            <span class="collapse_Title">{{list.title}}</span>
          </template>
          <el-row type="flex" align="middle">
            <el-col v-for="item in list.flow" :key="item.title" :span="3" class="col">
              <el-col  class="col">
                  <el-button  size="mini" style="font-size: 1px" @click="openUrl(item)" :disabled="disabled(item.name)">{{item.title}}</el-button>
              </el-col>
              <el-col   class="col">
                <i class="el-icon-right"   v-if="item !== list.flow[list.flow.length-1]"></i>
              </el-col>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
  import { app, menu } from "@/utils/menu";
    export default {
        name: "index",
      data() {
        return {
          activeNames:[],
          flowList:[],
          menuList:[],
          flowList1:[
            {
              title: "入职流程",
              flow:[
                {
                  title:"招聘申请",
                  name:"PFANS2001",
                  url:"PFANS2001View"
                },
                {
                  title:"应聘者信息",
                  name:"PFANS2003",
                  url:"PFANS2003View"
                },
                {
                  title:"招聘决裁",
                  name:"PFANS2002",
                  url:"PFANS2002View"
                },
                {
                  title:"人员管理",
                  name:"user",
                  url:"usersView",
                },
              ],
            },
            {
              title: "离职流程",
              flow:[
                {
                  title:"离职申请",
                  name:"PFANS2026",
                  url:"PFANS2026View"
                },
                {
                  title:"考勤管理",
                  name:"PFANS2010",
                  url:"PFANS2010View"
                },
                {
                  title:"退职者调书",
                  name:"PFANS2032",
                  url:"PFANS2032View"
                }
              ],
            },
            {
              title: "离职流程",
              flow:[
                {
                  title:"离职申请",
                  name:"PFANS2026",
                  url:"PFANS2026View"
                },
                {
                  title:"退职者调书",
                  name:"PFANS2032",
                  url:"PFANS2032View"
                }
              ],
            },
            {
              title: "采购流程",
              flow:[
                {
                  title:"采购申请",
                  name:"PFANS3005",
                  url:"PFANS3005View"
                },
                {
                  title:"暂借款申请",
                  name:"PFANS1006",
                  url:'PFANS1001FormView',
                  params:{
                    title:6
                  }
                },
                {
                  title:"公共费用精算",
                  name:"PFANS1012",
                  url:"PFANS1012View"
                }
              ],
            },
            {
              title: "采购流程",
              flow:[
                {
                  title:"采购申请",
                  name:"PFANS3005",
                  url:"PFANS3005View"
                },
                {
                  title:"公共费用精算",
                  name:"PFANS1012",
                  url:"PFANS1012View"
                }
              ],
            },
            {
              title: "采购流程",
              flow:[
                {
                  title:"采购申请",
                  name:"PFANS3005",
                  url:"PFANS3005View"
                },
                {
                  title:"申请其他合同",
                  name:"PFANS1033",
                  url:"PFANS1033View"
                },
                {
                  title:"决裁书",
                  name:"PFANS1047",
                  url:"PFANS1047View"
                },
                {
                  title:"印章申请",
                  name:"PFANS4001",
                  url:"PFANS4001View"
                },
                {
                  title:"公共费用精算",
                  name:"PFANS1012",
                  url:"PFANS1012View"
                }
              ],
            },
            {
              title: "考勤-工资流程",
              flow:[
                {
                  title:"打卡记录",
                  name:"PFANS2017",
                  url:"PFANS2017View"
                },
                {
                  title:"加班申请",
                  name:"PFANS2011",
                  url:"PFANS2011View"
                },
                {
                  title:"考勤管理",
                  name:"PFANS2010",
                  url:"PFANS2010View"
                },
                {
                  title:"工资计算",
                  name:"PFANS2006",
                  url:"PFANS2006View"
                }
              ],
            },
            {
              title: "考勤-工资流程",
              flow:[
                {
                  title:"打卡记录",
                  name:"PFANS2017",
                  url:"PFANS2017View"
                },
                {
                  title:"异常申请",
                  name:"PFANS2016",
                  url:"PFANS2016View"
                },
                {
                  title:"考勤管理",
                  name:"PFANS2010",
                  url:"PFANS2010View"
                },
                {
                  title:"工资计算",
                  name:"PFANS2006",
                  url:"PFANS2006View"
                }
              ],
            },
            {
              title: "考勤-工资流程",
              flow:[
                {
                  title:"打卡记录",
                  name:"PFANS2017",
                  url:"PFANS2017View"
                },
                {
                  title:"异常申请",
                  name:"PFANS2016",
                  url:"PFANS2016View"
                },
                {
                  title:"年休",
                  name:"PFANS2013",
                  url:"PFANS2013View"
                },
                {
                  title:"考勤管理",
                  name:"PFANS2010",
                  url:"PFANS2010View"
                },
                {
                  title:"工资计算",
                  name:"PFANS2006",
                  url:"PFANS2006View"
                }
              ],
            },
          ]
        }
      },
      created() {
          var type = this.$route.params.type;
          if(type === 'PERSONNELMATTERS'){
            this.flowList =  this.flowList1;
            this.activeNames = [0,1,2,3,4,5,6,7,8,9]
          }
      },
      methods: {
        openUrl(item){
          if(item.url){
            //特殊处理
            if(item.name === 'PFANS1006'){

              this.$router.push({
                name: item.url,
                params:item.params

              })
              this.$store.commit("global/SET_PAGENO", 1);
              this.$store.commit("global/SET_PAGESIZE", 50);
              this.$store.commit('global/SET_CURRENTURL', '/PFANS1006FormView');
              this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1006FormView');


            }
            //其他
            else{
              this.$router.push({
                name: item.url,
              })

              this.$emit('changeMenu');
            }
          }
        },
        disabled(name){
          let menuids = this.$store.getters.menuids

          if(menuids.indexOf(name) != -1){
            return false
          }else{
            return true;
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .col{
    display:flex;
    justify-content:center;/*主轴上居中*/
    align-items:center;/*侧轴上居中*/

  }
</style>
