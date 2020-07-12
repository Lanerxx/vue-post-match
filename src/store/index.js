import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "@/axios/MyAxios";
import { updateRoutes } from "@/router/index";
import { author } from "@/util/Const";
Vue.use(Vuex);

const myState = {
  exception: { message: null },
  isLogin: false,
  notLogin: true,
  isEnterprise: false,
  isStudent: false,
  isAdmin: false,
  student: null,
  students: [],
  rankStudents: [],
  myPosts: [],
  courses: [],
  posts: [],
  tutor: null,
  tutors: [],
  myTutor: null,
  courseGradeVOSDe: [],
  studentsDe: [],
  qualified: null,
  rankingIndex: null
};

const myMutations = {
  [types.GET_EXCEPTION](state, data) {
    state.exception = data;
  },
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.LIST_POSTS_ENTERPRISE](state, data) {
    state.posts = data;
  },
  [types.LIST_STUDENTS_TUTOR](state, data) {
    state.students = data;
  },
  [types.LIST_RANKING_STUDENTS_TUTOR](state, data) {
    state.rankStudents = data;
  },
  [types.GET_ENTERPRISE](state, date) {
    state.enterprise = date;
  },
  [types.GET_MYPOSTS_ENTERPRISE](state, data) {
    state.myPosts = data;
  },
  [types.CERTI_ADMIN](state, data) {
    state.isAdmin = data;
  },
  [types.CERTI_ENTERPRISE](state, data) {
    state.isEnterprise = data;
  },
  [types.CERTI_STUDENT](state, data) {
    state.isStudent = data;
  },
  [types.GET_STUDENT](state, data) {
    state.student = data;
  },
  [types.GET_TUTORS_STUDENT](state, data) {
    state.tutors = data;
  },
  [types.GET_TUTORDETAIL_STUDENT](state, data) {
    state.courseGradeVOSDe = data.courseGradeVOS;
    state.studentsDe = data.students;
    state.qualified = data.qualified;
    state.myTutor = data.tutor;
    state.student = data.student;
    state.rankingIndex = data.rankingIndex;
  }
};

const myActions = {
  // 登录
  async [types.LOGIN]({ commit }, data) {
    let resp = await axios.post("login", data);
    let auth = resp.headers[author];
    if (auth != null) {
      sessionStorage.setItem(author, auth);
      sessionStorage.setItem("role", resp.data.role);
      updateRoutes();
      switch (sessionStorage.getItem("role")) {
        case adminRole:
          commit(types.CERTI_ADMIN, true);
          break;
        case enterpriseRole:
          commit(types.CERTI_ENTERPRISE, true);
          break;
        case studentRole:
          commit(types.CERTI_STUDENT, true);
          break;
      }
      commit(types.LOGIN, true);
    }
  },

  // ------以下为向springboot发出请求
  // 需要取消mock，配置后端跨域
  async [types.GET_INDEX_ENTERPRISE]({ commit }) {
    let resp = await axios.get("enterprise/index");
    commit(types.GET_ENTERPRISE, resp.data.enterprise);
    commit(types.GET_MYPOSTS_ENTERPRISE, resp.data.posts);
  },
  async [types.LIST_POSTS_ENTERPRISE]({ commit }) {
    let resp = await axios.get("enterprise/index");
    commit(types.LIST_POSTS_ENTERPRISE, resp.data.posts);
  },
  async [types.UPDATE_POST_ENTERPRISE]({ commit }, data) {
    let resp = await axios.patch(
      `enterprise/post/information/${data.id}`,
      data
    );
    commit(types.LIST_POSTS_ENTERPRISE, resp.data.posts);
  },
  async [types.ADD_POST_ENTERPRISE]({ commit }, data) {
    let resp = await axios.post("enterprise/post", data);
    commit(types.LIST_POSTS_ENTERPRISE, resp.data.posts);
  },
  async [types.DELETE_POST_ENTERPRISE]({ commit }, data) {
    let resp = await axios.delete(`enterprise/post/${data.id}`);
    commit(types.LIST_POSTS_ENTERPRISE, resp.data.posts);
  },
  // async [types.LIST_STUDENTS_TUTOR]({ commit }, data) {
  //   let resp = await axios.get("tutor/students");
  //   commit(types.LIST_STUDENTS_TUTOR, resp.data.students);
  // },
  async [types.UPDATE_STUDENT_TUTOR]({ commit }, data) {
    let resp = await axios.patch("tutor/student", data);
    commit(types.LIST_STUDENTS_TUTOR, resp.data.students);
  },
  async [types.ADD_STUDENT_TUTOR]({ commit }, data) {
    let resp = await axios.post("tutor/student", data);
    commit(types.LIST_STUDENTS_TUTOR, resp.data.students);
  },
  async [types.DELETE_STUDENT_TUTOR]({ commit }, data) {
    let resp = await axios.delete(`tutor/student/${data.id}`);
    commit(types.LIST_STUDENTS_TUTOR, resp.data.students);
  },
  // async [types.LIST_RANKING_STUDENTS_TUTOR]({ commit }, data) {
  //   let resp = await axios.get("tutor/ranking");
  //   commit(types.LIST_RANKING_STUDENTS_TUTOR, resp.data.students);
  // },
  // async [types.ADD_ELECTIVES_TUTOR]({ commit }, data) {
  //   let resp = await axios.post("tutor/electives", data);
  // },
  async [types.UPDATE_RANGE_TUTOR]({ commit }, data) {
    let resp = await axios.patch(
      `tutor/information/ranges/${data.ranges}/reservedRange/${data.reservedRange}`
    );
    commit(types.GET_TUTOR, resp.data.tutor);
  },
  // async [types.SELECT_ADVANCE_STUDENTS_TUTOR]({ commit }, data) {
  //   let resp = await axios.post("tutor/advance", data);
  // },
  async [types.GET_INDEX_STUDENT]({ commit }, data) {
    let resp = await axios.get("student/index", data);
    commit(types.GET_STUDENT, resp.data.student);
    commit(types.GET_TUTORS_STUDENT, resp.data.tutors);
  },
  async [types.GET_TUTORDETAIL_STUDENT]({ commit }, data) {
    let resp = await axios.get(`student/information/${data.tid}`);
    commit(types.GET_TUTORDETAIL_STUDENT, resp.data);
  },
  async [types.GET_TUTOR_STUDENT]({ commit }, data) {
    let resp = await axios.get(`student/tutor/${data.tid}`);
    commit(types.GET_STUDENT, resp.data.student);
  }
};

export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// --------------------------
// 执行时判断，刷新时检测；也可以添加长度等更严格判断

const adminRole = "f2ffae3f953b4983fe0f";
const enterpriseRole = "6983f953b49c88210cb9";
const studentRole = "bb63e5f7e0f2ffae845c";

if (sessionStorage.getItem(author) != null) {
  myState.isLogin = true;
  myState.notLogin = false;
  let role = sessionStorage.getItem("role");
  if (role == adminRole) myState.isAdmin = true;
  if (role == enterpriseRole) {
    myState.isEnterprise = true;
  }
  if (role == studentRole) myState.isStudent = true;
}
