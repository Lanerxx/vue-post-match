<template>
  <div>
    <v-toolbar flat color="white" elevation="1" class="toolbar">
      <v-toolbar-title>
        ————————————————————————————— 帮助 ————————————————————————————
      </v-toolbar-title>
    </v-toolbar>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="5.5">
          <v-card>
            <v-toolbar flat color="white">
              <h2>基础信息</h2>
            </v-toolbar>
            <v-timeline dense="">
              <v-timeline-item
                v-for="(BInfo, i) in BInfos"
                :key="i"
                :color="BInfo.color"
                small
              >
                <!-- <template v-slot:opposite>
                  <span
                    :class="`headline font-weight-bold ${tutor.color}--text`"
                    v-text="tutor.step"
                  ></span>
                </template> -->
                <div class="py-4">
                  <h2
                    :class="
                      `headline font-weight-light mb-4 ${BInfo.color}--text`
                    "
                  >
                    {{ BInfo.step }}
                  </h2>
                  <div>
                    {{ BInfo.detail }}
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="5.5">
          <v-card>
            <v-toolbar flat color="white">
              <h2>岗位信息</h2>
            </v-toolbar>
            <v-timeline dense="">
              <v-timeline-item
                v-for="(PInfo, i) in PInfos"
                :key="i"
                :color="PInfo.color"
                small
              >
                <template v-slot:opposite>
                  <!-- <span
                    :class="`headline font-weight-bold ${student.color}--text`"
                    v-text="student.step"
                  ></span> -->
                </template>
                <div class="py-4">
                  <h2
                    :class="
                      `headline font-weight-light mb-4 ${PInfo.color}--text`
                    "
                  >
                    {{ PInfo.step }}
                  </h2>
                  <div>
                    {{ PInfo.detail }}
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    BInfos: [
      {
        color: "#4DB6AC",
        step: "One",
        detail: "点击左侧边栏“基础信息”，进入企业信息的页面"
      },
      {
        color: "#26A69A",
        step: "Two",
        detail:
          "点击各项信息右侧横线输入或选择信息。（首次登陆已为您设置部分默认信息，您可随时修改）"
      },
      {
        color: "#00897B",
        step: "Three",
        detail:
          "将所有信息填写完整后，点击最下方的提交按钮。（若信息未填写完整，将提交失败）"
      },
      {
        color: "#00796B",
        step: "Four",
        detail: "您可随时点击页面右上角帮助按钮，回到帮助页面"
      }
    ],
    PInfos: [
      {
        color: "#4DB6AC",
        step: "One",
        detail: "建议完成企业信息的全部填写并提交后，再可进行岗位操作。"
      },
      {
        color: "#26A69A",
        step: "Two",
        detail: "点击左侧边栏“岗位信息”，进入岗位信息的页面"
      },
      {
        color: "#00897B",
        step: "Three",
        detail:
          "点击岗位列表右侧“添加岗位”按钮输入或选择信息。（已为您设置部分默认信息，您可按需修改）"
      },
      {
        color: "#00796B",
        step: "Four",
        detail: "点击每项岗位右侧“修改”或“删除”按钮可修改和删除岗位信息。"
      },
      {
        color: "#00796B",
        step: "Five",
        detail:
          "点击每项岗位右侧“匹配”按钮进行匹配学生。（企业信息若不完整，则匹配失败）"
      },
      {
        color: "#00695C",
        step: "Five",
        detail:
          "点击匹配出的学生列表的右侧“详情”或“下载”按钮可查看学生详细或下载学生详细信息。"
      },
      {
        color: "#00695C",
        step: "Six",
        detail: "点击学生列表的右侧“返回”按钮可回到岗位列表页面。"
      },
      {
        color: "#004D40",
        step: "Four",
        detail: "您可随时点击页面右上角帮助按钮，回到帮助页面"
      }
    ]
  })
};
</script>
<style scoped>
.toolbar {
  margin-right: 15px;
  margin-left: 10px;
}
</style>
