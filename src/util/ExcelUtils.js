import xlsx from "xlsx";

export function readStudentFile(file) {
  return new Promise(resolve => {
    let studentsInfo = [];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    // 异步
    reader.onload = event => {
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      let s = xlsx.utils.sheet_to_row_object_array(sheet);
      s.forEach(r => {
        let grade = parseInt(r.__EMPTY_2);
        if (!isNaN(grade)) {
          console.log();

          let st = new Student();
          st.name = r.__EMPTY;
          st.gender = r.__EMPTY_1;
          st.grade = grade;
          st.graduationSchoolName = r.__EMPTY_3;
          st.graduationSchoolRank = r.__EMPTY_4;
          st.major = r.__EMPTY_5;
          st.education = r.__EMPTY_6;
          st.graduationDate = r.__EMPTY_7;
          st.nativePlace = r.__EMPTY_8;
          st.foreignlanguageproficiency = r.__EMPTY_9;
          st.expectedSalary = r.__EMPTY_10;
          st.expectedPosition = r.__EMPTY_11;
          st.expectedIndustry = r.__EMPTY_12;
          st.employmentIntentionPlace = r.__EMPTY_13;
          st.phoneNumber = r.__EMPTY_14;
          st.majorCourse = r.__EMPTY_15;
          st.skill = r.__EMPTY_16;
          st.paperCount = r.__EMPTY_17;
          st.workExperience = r.__EMPTY_18;
          studentsInfo.push(st);
        }
      });
    };
    // 当load结束，回调
    // 当执行resolve()方法，会激活调用处的then()方法
    reader.onloadend = () => {
      resolve([studentsInfo]);
      // resolve(course);
    };
  });
}

class Student {
  name;
  gender;
  grade;
  graduationSchoolName;
  graduationSchoolRank;
  major;
  education;
  graduationDate;
  nativePlace;
  foreignlanguageproficiency;
  expectedSalary;
  expectedPosition;
  expectedIndustry;
  employmentIntentionPlace;
  phoneNumber;
  majorCourse;
  skill;
  paperCount;
  workExperience;
}
