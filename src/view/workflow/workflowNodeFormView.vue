<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="8vw" style="padding: 2vw">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('label.node_name')" prop="nodename">
            <el-input v-model="form.nodename" :disabled="disabled" style="width: 20vw" @change="change"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('label.node_type')" prop="nodetype">
            <el-select v-model="form.nodetype" :disabled="disabled" style="width:20vw">
              <el-option :label="$t('label.node_type_0')" value="2"></el-option>
              <el-option :label="$t('label.node_type_1')" value="1"></el-option>
              <el-option :label="$t('label.node_type_2')" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('label.node_output')" prop="outcondition">
            <el-input-number v-model="form.outcondition" :max="10" :min="0"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="form.nodetype != 3?$t('label.node_remarks'):$t('label.node_notice')" prop="remarks">
            <el-input v-model="form.remarks" :disabled="disabled" :rows="2"
                      style="width:72vw"
                      type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item :label="$t('label.user_type')" prop="nodeusertype">
          <el-radio-group v-model="form.nodeusertype" :disabled="disabled" @change="changeNodeType">
            <el-radio label="1">{{ $t('label.user_type_0') }}</el-radio>
            <el-radio label="2">{{ $t('label.user_type_1') }}</el-radio>
            <el-radio label="3">{{ $t('label.user_type_2') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item v-if="usershow" :error="error" :label="$t('label.node_operate_user')" prop="user">
          <user :disabled="disabled" :error="error" :selectType="selectType" :userlist="userlist"
                style="width:20vw" @getUserids="getUserids"></user>
        </el-form-item>
        <el-form-item v-if="orgshow" :label="$t('label.node_operate_org')" prop="org">
          <org
            :orglist="outorg"
            selectType="Single"
            style="width:20vw"
            @getOrgids="getOrgids"
          ></org>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import user from '../components/user.vue';
import org from '../components/org.vue';

export default {
  name: 'workflowNodeFormView',
  components: {
    user,
    org,
  },
  props: {
    no: {
      type: String,
    },
    nodedata: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var checkuser = (rule, value, callback) => {
      if (!this.disabled && this.usershow) {
        if (!this.form.itemid || this.form.itemid === '') {
          this.error = this.$t('normal.error_08') + this.$t('label.node_operate_user');
          return callback(new Error(this.$t('normal.error_08') + this.$t('label.node_operate_user')));
        } else {
          this.error = '';
          return callback();
        }
      } else {
        this.error = '';
        return callback();
      }

    };

    return {
      usershow: true,
      orgshow: false,
      form: {
        nodename: '',
        nodetype: '',
        nodeord: '',
        nodeusertype: '',
        remarks: '',
        itemid: '',
        outorg: '',
        outcondition: 1,
      },
      error: '',
      selectType: 'mult',
      userlist: '',
      outorg: '',
      rules: {
        nodename: [
          {required: true, message: this.$t('normal.error_08') + this.$t('label.node_name'), trigger: 'blur'},
        ],
        nodetype: [
          {required: true, message: this.$t('normal.error_09') + this.$t('label.node_type'), trigger: 'change'},
        ],
        user: [
          {required: true, validator: checkuser, trigger: 'blur'},
        ],
        nodeusertype: [
          {required: true, message: this.$t('normal.error_09') + this.$t('label.user_type'), trigger: 'change'},
        ],
      },
    };
  },
  mounted() {

    if (this.nodedata) {
      this.form = this.nodedata;
      this.userlist = this.form.itemid;
      this.outorg = this.form.outorg;
    }
    this.form.nodeord = this.no;
    if (this.form.nodeusertype === '1') {
      this.usershow = true;
    } else {
      this.usershow = false;
    }
    if (this.form.nodeusertype === '2') {
      this.orgshow = true;
    } else {
      this.orgshow = false;
    }
  },
  methods: {
    change(val) {
      this.$emit('nameChange', val, this.no);
    },
    getUserids(val) {
      this.form.itemid = val;
      if (!this.form.itemid || this.form.itemid === '') {
        this.error = this.$t('normal.error_08') + this.$t('label.node_operate_user');
      } else {
        this.error = '';
      }
    },
    getOrgids(val) {
      this.form.outorg = val;
    },
    changeNodeType(val) {
      if (val === '1') {
        this.usershow = true;
      } else {
        this.usershow = false;
      }
      if (val === '2') {
        this.orgshow = true;
      } else {
        this.orgshow = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
