<template>
    <div>
      <el-form ref="form" :model="form" label-width="8vw" label-position="top" style="padding: 2vw" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.node_name')" prop="nodename">
              <el-input v-model="form.nodename" style="width: 20vw" @change="change" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.node_type')" prop="nodetype">
              <el-select v-model="form.nodetype" :disabled="disabled"  style="width:20vw">
                <el-option :label="$t('label.node_type_0')" value="2"></el-option>
                <el-option :label="$t('label.node_type_1')" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('label.node_remarks')" prop="remarks">
              <el-input v-model="form.remarks" style="width:72vw" :disabled="disabled"
                        type="textarea"
                        :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('label.user_type')" prop="nodeusertype">
            <el-radio-group v-model="form.nodeusertype" :disabled="disabled" @change="changeNodeType">
              <el-radio label="1">{{$t('label.user_type_0')}}</el-radio>
              <el-radio label="2">{{$t('label.user_type_1')}}</el-radio>
              <el-radio label="3">{{$t('label.user_type_2')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
            <el-form-item :label="$t('label.node_operate_user')" prop="user" :error="error"  v-if="usershow">
              <user :selectType="selectType" @getUserids="getUserids" :userlist="userlist" :disabled="disabled" :error="error"  style="width:20vw"></user>
            </el-form-item>
        </el-row>
      </el-form>
    </div>
</template>

<script>
  import user from "../components/user.vue";
  export default {
    name: 'workflowNodeFormView',
    components: {
      user
    },
    props: {
      no:{
        type:String
      },
      nodedata:{
        type:Object
      },
      disabled:{
        type:Boolean,
        default:false
      }
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if(!this.disabled && this.usershow){
          if (!this.form.itemid || this.form.itemid === '') {
            this.error = this.$t('normal.error_08') + this.$t('label.node_operate_user');
            return callback(new Error(this.$t('normal.error_08') + this.$t('label.node_operate_user')));
          }else{
            this.error = "";
            return callback();
          }
        }else{
          this.error = "";
          return callback();
        }

      };

      return {
        usershow:true,
        form: {
          nodename: '',
          nodetype: '',
          nodeord:'',
          nodeusertype:'',
          remarks:'',
          itemid: ''
        },
        error:"",
        selectType:"mult",
        userlist:"",
        rules: {
          nodename: [
            {required: true, message: this.$t('normal.error_08') + this.$t('label.node_name'), trigger: 'blur'},
          ],
          nodetype: [
            {required: true, message: this.$t('normal.error_09') + this.$t('label.node_type'), trigger: 'change'},
          ],
          user:[
            { required: true, validator: checkuser, trigger: 'blur' }
          ],
          nodeusertype:[
            {required: true, message: this.$t('normal.error_09') + this.$t('label.user_type'), trigger: 'change'},
          ]
        }
      }
    },
    mounted () {

      if(this.nodedata){
        this.form = this.nodedata;
        this.userlist = this.form.itemid
      }
      this.form.nodeord = this.no;
      if(this.form.nodeusertype  === '1'){
        this.usershow = true
      }else{
        this.usershow = false
      }
    },
    methods: {
      change(val){
        this.$emit("nameChange", val,this.no);
      },
      getUserids(val){
        this.form.itemid = val;
        if (!this.form.itemid || this.form.itemid === '') {
          this.error = this.$t('normal.error_08') + this.$t('label.node_operate_user');
        }else{
          this.error = "";
        }
      },
      changeNodeType(val){
        if(val === '1'){
          this.usershow = true
        }else{
          this.usershow = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
