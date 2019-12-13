<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家政Banner" name="first">
        <el-button type="primary" @click="tocreate1">添加</el-button>
        <hr />
        <!-- 表格 -->
        <el-table :data="tableData1" style="width: 100%" height="350">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="img" label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="150" />
            </template>
          </el-table-column>
          <el-table-column prop="des" label="描述" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="todel(scope.row.id)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格结束 -->
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="second">
        <!-- 人员管理 -->
        <el-button type="primary" @click="tocreate2(0)">添加</el-button>
        <hr />
        <!-- 查找类型 -->
        <template>
          <el-select v-model="value" placeholder="请选择" style="width: 80%" @change="changeshow">
            <el-option label="全部" value="0"></el-option>
            <el-option v-for="item in hometype" :key="item.value" :label="item" :value="item"></el-option>
          </el-select>
        </template>
        <hr />
        <!-- 表格 -->
        <el-table :data="tableData2" style="width: 100%" height="350">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="name" label="名称" width="120"></el-table-column>
          <el-table-column prop="tel" label="电话" width="120"></el-table-column>
          <el-table-column prop="price" label="价格" width="120"></el-table-column>
          <el-table-column prop="age" label="年龄" width="100"></el-table-column>
          <el-table-column prop="edu" label="学历" width="180"></el-table-column>
          <el-table-column prop="type" label="服务类型" width="180">
            <template slot-scope="scope">{{scope.row.type | typeFilter}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="tocreate2(scope.row.id)">查看</el-button>
              <el-button type="danger" @click="todel(scope.row.id)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格结束 -->
      </el-tab-pane>
    </el-tabs>
    <!-- 弹窗1 -->
    <el-dialog title="家政Banner管理" :visible.sync="dialogFormVisible1">
      <el-form :model="banner">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="banner.img" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="create1">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
    <!-- 弹窗2 -->
    <el-dialog title="人员管理" :visible.sync="dialogFormVisible2">
      <el-form :model="homeman">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="homeman.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="homeman.age" autocomplete="off" clearable type="number" @blur="agere" min="0" placeholder="年龄为0-100"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="homeman.tel" autocomplete="off" clearable @blur="telre2" placeholder="eg:13888888888"></el-input>
        </el-form-item>
        <el-form-item label="资格认证" :label-width="formLabelWidth">
          <el-checkbox-group v-model="homeman.qualification">
            <el-checkbox v-for="i in qualification" :key="i" :label="i"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="服务项目" :label-width="formLabelWidth">
          <el-checkbox-group v-model="homeman.type">
            <el-checkbox v-for="i in type" :key="i" :label="i"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-select v-model="homeman.edu" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作年限" :label-width="formLabelWidth">
          <el-input v-model="homeman.year" autocomplete="off" clearable type="number" @blur="number(homeman.year)" placeholder="eg:3"></el-input>
        </el-form-item>
        <el-form-item label="级别" :label-width="formLabelWidth">
          <el-input v-model="homeman.vNum" autocomplete="off" clearable @blur="levelre" placeholder="eg:v3"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="homeman.price" autocomplete="off" clearable @blur="pricere2" placeholder="eg:100元/小时"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-input v-model="homeman.city" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="经验" :label-width="formLabelWidth">
          <el-input v-model="homeman.experience" autocomplete="off" clearable @blur="experiencere" placeholder="eg:3年"></el-input>
        </el-form-item>
        <el-form-item label="点赞数量" :label-width="formLabelWidth">
          <el-input v-model="homeman.likeNum" autocomplete="off" clearable type="number" @blur="number(homeman.likeNum)"></el-input>
        </el-form-item>
        <el-form-item label="关注人数" :label-width="formLabelWidth">
          <el-input v-model="homeman.readNum" autocomplete="off" clearable type="number" @blur="number(homeman.readNum)"></el-input>
        </el-form-item>
        <el-form-item label="距离" :label-width="formLabelWidth">
          <el-input v-model="homeman.len" autocomplete="off" clearable @blur="distancere" placeholder="eg:4.2km"></el-input>
        </el-form-item>
        <el-form-item label="自我评价" :label-width="formLabelWidth">
          <el-input v-model="homeman.info" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="免冠照片" :label-width="formLabelWidth">
          <el-input v-model="homeman.img" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" v-if="npno==true" @click="create2" :disabled="disadd">添 加</el-button>
        <el-button type="primary" v-else @click="update" :disabled="disadd">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
    <!-- 删除弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>你确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗结束 -->
  </div>
</template>
<script>
import API from "../util/API";
import reg from "../util/reg";
export default {
  data() {
    return {
      activeName: "first",
      formLabelWidth: "80px",
      dialogVisible: false,
      tableData1: [],
      tableData2: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      delid: "",
      banner: {
        img: ""
      },
      homeman: {
        age: "",
        city: "",
        edu: "",
        experience: "",
        img: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        price: "",
        qualification: [],
        readNum: "",
        tel: "",
        type: [],
        vNum: "",
        year: ""
      },
      qualification: [],
      type: [],
      nowtab: "",
      options: [
        {
          value: "小学",
          label: "小学"
        },
        {
          value: "初中",
          label: "初中"
        },
        {
          value: "高中",
          label: "高中"
        },
        {
          value: "本科",
          label: "本科"
        },
        {
          value: "研究生",
          label: "研究生"
        },
        {
          value: "博士生",
          label: "博士生"
        }
      ],
      npno: true,
      hometype: [],
      value: "0",
      disadd: true
    };
  },
  methods: {
    open4(data) {
      this.$message.error(data);
    },
    telre2() {
      this.disadd = true;
      if (!reg.tel2(this.homeman.tel)) {
        this.open4("手机格式不正确");
      } else {
        this.disadd = false;
      }
    },
    levelre() {
      this.disadd = true;
      if (!reg.level(this.homeman.vNum)) {
        this.open4("水平格式不正确");
      } else {
        this.disadd = false;
      }
    },
    pricere2() {
      this.disadd = true;
      if (!reg.price2(this.homeman.price)) {
        this.open4("价格格式不对");
      } else {
        this.disadd = false;
      }
    },
    agere() {
      this.disadd = true;
      if (!reg.age(this.homeman.age)) {
        this.open4("年龄0-100之间");
      } else {
        this.disadd = false;
      }
    },
    experiencere() {
      this.disadd = true;
      if (!reg.experience(this.homeman.experience)) {
        this.open4("经验格式不对");
      } else {
        this.disadd = false;
      }
    },
    number(obj) {
      this.disadd = true;
      if (!reg.pnum(obj)) {
        this.open4("此项应该为正数");
      } else {
        this.disadd = false;
      }
    },
    distancere() {
      this.disadd = true;
      if (!reg.distance(this.homeman.len)) {
        this.open4("距离格式不对");
      } else {
        this.disadd = false;
      }
    },
    handleClick(tab, event, arr) {
      console.log(tab, event);
      arr = [];
      if (this.activeName == "first") {
        this.init(API.homeBanner, this.initData, "homebanner");
        this.nowtab = 1;
      }
      if (this.activeName == "second") {
        this.init(API.findHomeWorker, this.initData, "homeMan");
        this.nowtab = 2;
        this.$axios({
          url: API.getHomeType
        }).then(res => {
          if (res.data.isok) {
            this.hometype = res.data.type;
            console.log(this.hometype);
          } else {
            this.open4(res.data.info);
          }
        });
      }
    },
    init(url, fn, type) {
      //接口是什么，数据放在哪里
      this.$axios({
        url: url
      }).then(res => {
        if (res.data.isok) {
          fn(res.data.data, type);
        } else {
          this.open4(res.data.info);
        }
      });
    },
    initData(d, type) {
      switch (type) {
        case "homebanner":
          this.tableData1 = d;
          break;
        case "homeMan":
          this.tableData2 = d;
          break;
      }
    },
    tocreate1() {
      this.banner = {
        img: ""
      };
      this.dialogFormVisible1 = true;
    },
    tocreate2(id) {
      this.npno = true;
      this.disadd=true;
      this.init(API.getHomeType, this.initData, "type");
      //调用数据查找资格和证件
      this.$axios({
        url: API.getQualification
      }).then(res => {
        if (res.data.isok) {
          this.qualification = res.data.qualification;
        }
      });
      this.$axios({
        url: API.getHomeType
      }).then(res => {
        if (res.data.isok) {
          this.type = res.data.type;
        }
      });
      this.homeman = {
        age: "",
        city: "",
        edu: "",
        experience: "",
        img: "",
        info: "",
        len: "",
        likeNum: "",
        name: "",
        price: "",
        qualification: [],
        readNum: "",
        tel: "",
        type: [],
        vNum: "",
        year: ""
      };
      this.dialogFormVisible2 = true;
      if (id != "0") {
        this.$axios({
          url: API.findHomeWorker,
          params: {
            id: id
          }
        }).then(res => {
          if (res.data.isok) {
            this.homeman = res.data.data[0];
            // 对返回来的数据做数组处理
            let strq = this.homeman.qualification;
            let strt = this.homeman.type;
            if (strq.includes("[")) {
              this.homeman.qualification = JSON.parse(strq);
            } else {
              this.homeman.qualification = strq.split(",");
            }
            if (strt.includes("[")) {
              this.homeman.type = JSON.parse(strt);
            } else {
              this.homeman.type = strt.split(",");
            }
          } else {
            this.open4(res.data.info);
          }
        });
        this.npno = false;
      }
    },
    create1() {
      this.$axios({
        url: API.addHomeBanner,
        params: this.banner
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible1 = false;
          this.init(API.homeBanner, this.initData, "homebanner");
        } else {
          this.open4(res.data.info);
        }
      });
    },
    create2() {
      //添加人员的方法
      console.log(this.homeman);
      this.$axios({
        url: API.addHomeWorker,
        params: this.homeman
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible2 = false;
          this.changeshow();
          this.npno = true;
          this.disadd=true
        } else {
          this.open4(res.data.info);
        }
      });
    },
    update() {
      this.$axios({
        url: API.updateHomeWorker,
        params: this.homeman
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible2 = false;
          this.changeshow();
          this.npno = true;
          this.disadd=true
        } else {
          this.open4(res.data.info);
        }
      });
    },
    todel(id) {
      this.dialogVisible = true;
      this.delid = id;
      console.log(this.nowtab);
    },
    del() {
      if (this.nowtab == 1) {
        this.$axios({
          url: API.delHomeBanner,
          params: {
            id: this.delid
          }
        }).then(res => {
          if (res.data.isok) {
            this.dialogVisible = false;
            this.init(API.homeBanner, this.initData, "homebanner");
          } else {
            this.open4(res.data.info);
          }
        });
      }
      if (this.nowtab == 2) {
        this.$axios({
          url: API.delHomeWorker,
          params: {
            id: this.delid
          }
        }).then(res => {
          if (res.data.isok) {
            this.dialogVisible = false;
            this.changeshow();
          } else {
            this.open4(res.data.info);
          }
        });
      }
    },
    changeshow() {
      if (this.value == "0") {
        this.init(API.findHomeWorker, this.initData, "homeMan");
      }
      if (this.value != "0") {
        this.$axios({
          url: API.findHomeWorker,
          params: {
            type: this.value
          }
        }).then(res => {
          if (res.data.isok) {
            this.tableData2 = res.data.data;
          } else {
            this.open4(rea.data.info);
          }
        });
      }
    }
  },
  mounted() {
    this.init(API.homeBanner, this.initData, "homebanner");
    this.$axios({
      url: API.getQualification
    }).then(res => {
      if (res.data.isok) {
        this.qua = res.data.qualification;
      }
    });
    console.log(typeof this.homeman.qualification);
    this.value = "0";
    this.nowtab = 1;
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("isAdmin") == "1") {
      next();
    } else {
      next("/index/welcome");
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped></style>