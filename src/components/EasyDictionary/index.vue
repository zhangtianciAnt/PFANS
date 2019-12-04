<template>
  <div class="dictionaries_dictionaries">
    <el-container class="container">
      <el-aside width="250px" style="padding:10px">
        <el-header style="padding:10px;height:60px;">
          <div class="fontstyle">
            字典分类
          </div>
        </el-header>
        <div class="line" style="border-bottom:1px solid #999999;"></div>
        <el-row style="padding:10px">
          <el-col :span="20" :offset="1">
            <div class="dictType" @click="setData('ermCotractType','合同类别')">
              <i class="el-icon-document">合同类别</i>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding:10px">
          <el-col :span="20" :offset="1">
            <div class="dictType" @click="setData('ermCurrencyType','币种')">
              <i class="el-icon-document"></i>币种</div>
          </el-col>
        </el-row>
        <el-row style="padding:10px">
          <el-col :span="20" :offset="1">
            <div class="dictType" @click="setData('ermDisountType','优惠类型')">
              <i class="el-icon-document"></i>优惠类型</div>
          </el-col>
        </el-row>
        <el-row style="padding:10px">
          <el-col :span="20" :offset="1">
            <div class="dictType" @click="setData('ermRFType','费用类型')">
              <i class="el-icon-document"></i>费用类型</div>
          </el-col>
        </el-row>
        <el-row style="padding:10px">
          <el-col :span="20" :offset="1">
            <div class="dictType" @click="setData('ermRPType','合同收/付款方式')">
              <i class="el-icon-document"></i>合同收/付款方式</div>
          </el-col>
        </el-row>
        <el-row style="padding:10px">
          <el-col :span="20" :offset="1">
            <div class="dictType" @click="setData('ermStatus','会展租赁合同状态')">
              <i class="el-icon-document"></i>会展租赁合同状态</div>
          </el-col>
        </el-row>
        <el-row style="padding:10px">
          <el-col :span="20" :offset="1">
            <div class="dictType" @click="setData('ermICType','收入类别')">
              <i class="el-icon-document"></i>收入类别</div>
          </el-col>
        </el-row>
        <el-row style="padding:10px">
          <el-col :span="20" :offset="1">
            <div class="dictType" @click="setData('ermEPType','会展项目类别')">
              <i class="el-icon-document"></i>会展项目类别</div>
          </el-col>
        </el-row>
      </el-aside>

      <el-main>
        <div style="padding-top:20px">
          <span class="fontstyletitle">{{this.codeName}}</span>
          <el-button type="primary" slot="extra" style="float: right" @click="addItem" plain>+新建</el-button>
        </div>
        <el-card style="width: 100%;margin-top:30px;border: 1px solid rgba(0, 0, 0, 0.2);  border-radius: 5px;">
          <el-table :data="tableData" style="width: 100%; text-align:center">
            <el-table-column prop="name" label="项目名" style="width:15%" align="center"></el-table-column>
            <el-table-column prop="code" label="项目值" style="width:15%" align="center"></el-table-column>
            <el-table-column prop="ord" label="排序" style="width:15%" align="center"></el-table-column>
            <el-table-column label="操作" style="width:15%" align="center">
              <template slot-scope="scope">
                <el-button style="margin-left:10px" @click="editItem(scope.row)" type="text" class="el-icon-edit"></el-button>
                <el-button style="margin-left:10px" @click="deleteItem(scope.row)" type="text" class="el-icon-delete"></el-button>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="说明" style="width:15%" align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-main>

      <!-- 右侧弹出框 -->
<!--      <addItem @saveItemInfo="setData" ref="addItem"></addItem>-->
      <!-- 右侧弹出框-结束 -->
    </el-container>
  </div>
</template>

<script>
    // import addItem from "@/indexform"

    export default {
        components: {
            // addItem
        },
        data() {
            return {
                codeId: "",
                codeName: "",
                dictionaryid: "",
                delDialogVisible: false,
                tableData: []
            }
        },
        mounted() {
            this.setData('ermCotractType','合同类别')
        },
        methods: {
            //添加字典数据
            addItem() {
                this.$refs.addItem.initItemInfo(
                    this.codeId,
                    this.codeName,
                    this.dictionaryid
                )
            },
            //修改字典数据
            editItem(row) {
                this.$refs.addItem.initItemInfo(
                    this.codeId,
                    this.codeName,
                    this.dictionaryid,
                    row
                )
            },
            //删除字典数据
            deleteItem(row) { //ok
                this.$confirm("此操作将永久删除字典信息, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                })
                    .then(() => {
                        this.$store
                            .dispatch("DelDictionary", row)
                            .then(response => {
                                if (response.code == "-1") {
                                    alert(response.message);
                                } else {
                                    this.setData(this.codeId, this.codeName);
                                    this.$message({
                                        type: "success",
                                        message: "删除成功"
                                    });
                                }
                            })
                            .catch(error => {
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        })
                    })
            },
            //获取数据字典
            setData(codeId, codeName) {
                this.codeId = codeId;
                this.codeName = codeName;
                this.$store
                    .dispatch("GetAllDictById", this.codeId)
                    .then(response => {
                        this.tableData = response;
                        this.dictionaryid = this.tableData[0].dictionaryid;
                    })
                    .catch(() => {
                    })
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
  .dictionaries_dictionaries {
    .fontstyle {
      display: inline-block;
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #303133;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 13px;
      margin-top: 4px;
    }
    .fontstyletitle {
      display: inline-block;
      width: 80%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #303133;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 13px;
      margin-top: 4px;
    }
    .fadeInRight {
      animation-name: fadeInRight;
      animation-duration: 1s;
      visibility: visible !important;
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
      min-height: 100%;
    }

    @keyframes fadeInRight {
      0% {
        opacity: 1;
        -webkit-transform: translate3d(150%, 0, 0);
        transform: translate3d(150%, 0, 0);
      }
      100% {
        opacity: 1;
        /*-webkit-transform: none;*/
        /*transform: none;*/
        -webkit-transform: translate3d(50%, 0, 0);
        transform: translate3d(50%, 0, 0);
      }
    }

    .container {
      min-height: 500px;
      width: 95%;
      left: 0;
      right: 0;
      margin: 2% auto;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(156, 154, 154);
      border-radius: 5px;
    }

    .box-card {
      min-height: 280px;
    }

    .el-aside {
      color: rgb(53, 23, 23);
      border-right: 1px solid rgb(156, 154, 154);
    }

    .title {
      font-size: 16px;
    }

    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 10px;
    }

    .cardfooter {
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      text-align: center;
      font-size: 17px;
      height: 20px;
    }
    .cardfooter i {
      padding: 10px;
    }
    .dictType {
      font-size: 14px;
      cursor: pointer;
    }
  }
</style>
