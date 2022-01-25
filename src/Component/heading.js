import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik,FieldArray,Form} from "formik";
import * as yup from "yup";
import { Grid, TextField, FormLabel, Button } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import InputAdornment from "@material-ui/core/InputAdornment";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import HttpIcon from "@material-ui/icons/Http";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import PictureInPictureIcon from "@material-ui/icons/PictureInPicture";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    padding: '1rem',
  },
});

export default function Paper1(props) {
  const headObject = { head: null, subHead: [{ value: null }] };
  const [imgData, setImgData] = useState(null);
  const [picture, setPicture] = useState(null);
  const [finalHeading, setFinalHeading] = useState([
    { head: null, subHead: [{ value: null }] },
    { head: null, subHead: [{ value: null }] },
    { head: null, subHead: [{ value: null }] },
  ]);

  const style_textarea = {
    maxHeight: "100px",
    minHeight: "100px",
    width: "300px",
    padding: "20px",
    boxSizing: "border-box",
    borderColor: { grey },
  };
  const style_textfield = {
    width: "300px",
    variant: "outlined",
    boxSizing: "border-box",
  };

  const test = [{ head: "Heading1", subHead: [{ value: "SubHead1" }] }];

  const formik = useFormik({
    initialValues: {
      courseName:
        localStorage.getItem("courseName") != null
          ? localStorage.getItem("courseName")
          : "",
      courseDescription: localStorage.getItem("courseDescription") != null
      ? localStorage.getItem("courseDescription")
      : "",
      courseInfo: test,
      courseKeyword: localStorage.getItem("courseKeywords") != null
      ? localStorage.getItem("courseKeywords")
      : "",
      demoLink:  localStorage.getItem("demoLink") != null
      ? localStorage.getItem("demoLink")
      : "",
      switchAss: false,
      switchDownload: false,
      switchRecord: false,
      switchAssignment: false,
      assesmentMode:  localStorage.getItem("assesmentMode") != null
      ? localStorage.getItem("assesmentMode")
      : "",
      phNumbers:[""],
    },
    validationSchema: yup.object({
      courseName: yup
        .string()
        .max(50, "Maximum Characters must be 50")
        .required("Enter the course title"),
      courseDescription: yup
        .string()
        .min(20, "Minimum words should be 20")
        .max(150, "Maximum words should be 150")
        .required("About your course"),
      courseKeyword: yup
        .string()
        .min(5, "Too Short!")
        .max(50, "Maximum Words must be 50")
        .required("Enter Course Keywords"),
      demoLink: yup
        .string()
        .matches(
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
          "Enter Valid Url"
        )
        .required("Enter video link"),
      assesmentMode: yup.string().required("Enter Assesment Mode"),
    }),
  });
 

  function addHeading() {
    const newHeading = { ...headObject };
    const tempHeading = [...finalHeading];
    tempHeading.push(newHeading);
    setFinalHeading(tempHeading);
  }
  function addSubHeading(heading, id) {
    var subHead = { value: null };
    heading.subHead.push(subHead);
    const tempHeading = [...finalHeading];
    tempHeading[id] = heading;
    setFinalHeading(tempHeading);
  }
  function removeSubHeading(heading, subIndex) {
    //heading.subHead.splice(subIndex, 1);
    delete heading.subHead[subIndex];
    const tempHeading = [...finalHeading];
    setFinalHeading(tempHeading);
  }
  function removeHeading(id) {
    const tempHeading = [...finalHeading];
    delete tempHeading[id];
    // delete tempHeading[id].subHead;
    // delete tempHeading[id];
    let afterDlt = [];
    tempHeading.map((value, index) => {
      afterDlt.push(value);
    });
    setFinalHeading(afterDlt);
  }

  function setHeadValues(head, subHead, event){
    var tempHead = [];
    tempHead.head = event.target.value;
    if(subHead != null){
      //tempHead.subHead.push(event.target.value);
    }
    //courseInfoHide.push(tempHead);
  }

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

localStorage.setItem("values", JSON.stringify(formik.values));

const classes = useStyles();
  return (
    <div>
      <Paper
        style={{ width: "auto" }}
        elevation={10}
        boxSizing={50}
        square={true}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justify="center"
          style={{ minHeight: "10vh" }}
        >
          
          <Grid item>
            <input type="hidden" name="courseInfo"></input>
            <TextField
              style={style_textfield}
              className={classes.root}
              name="courseName"
              id="courseName"
              label="Course Title"
              className="textfield"
              variant="outlined"
              placeholder="Your Course Name"
              onChange={formik.handleChange}
              value={formik.values.courseName}
              onBlur={formik.handleBlur}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {<MenuBookIcon></MenuBookIcon>}
                  </InputAdornment>
                ),
              }}
              error={formik.touched.courseName && formik.errors.courseName}
            />
            {console.log(formik.values.courseName)}
            {localStorage.setItem("courseName", formik.values.courseName)}

            {formik.touched.courseName && formik.errors.courseName ? (
              <div className="text-danger">{formik.errors.courseName}</div>
            ) : null}
          </Grid>
          <br></br>
          &nbsp;
          <Grid item>
            <TextField
              style={style_textfield}
              style={{marginLeft:5}}
              variant="outlined"
              name="courseKeyword"
              label="Course Keyword"
              id="courseKeyword"
              className="textfield"
              value={formik.values.courseKeyword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="java,core-java,oops"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {<LabelImportantIcon></LabelImportantIcon>}
                  </InputAdornment>
                ),
              }}
              error={
                formik.touched.courseKeyword && formik.errors.courseKeyword
              }
            />
            {console.log(formik.values.courseKeyword)}
            {localStorage.setItem(
              "courseKeywords",
              formik.values.courseKeyword
            )}
            {formik.touched.courseKeyword && formik.errors.courseKeyword ? (
              <div className="text-danger">{formik.errors.courseKeyword}</div>
            ) : null}
          </Grid>
          <br></br>
          &nbsp;
          <Grid item>
            <TextField
              style={style_textfield}
              variant="outlined"
              className="textfield"
              label="Demo Link"
              onBlur={formik.handleBlur}
              name="demoLink"
              id="demoLink"
              placeholder="Demo Video For Your Course"
              onChange={formik.handleChange}
              value={formik.values.demoLink}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {<HttpIcon></HttpIcon>}
                  </InputAdornment>
                ),
              }}
              error={formik.touched.demoLink && formik.errors.demoLink}
            />
            {console.log(formik.values.demoLink)}
            {localStorage.setItem("demoLink", formik.values.demoLink)}
            {formik.touched.demoLink && formik.errors.demoLink ? (
              <div className="text-danger">{formik.errors.demoLink}</div>
            ) : null}
          </Grid>
          <br></br>&nbsp; &nbsp;&nbsp;&nbsp;
          <br></br>
          <Grid item>
            <TextField
              style={style_textfield}
              name="courseDescription"
              id="courseDescription"
              label="Course Description"
              className="textfield"
              variant="outlined"
              placeholder="About Your Course"
              onChange={formik.handleChange}
              value={formik.values.courseDescription}
              onBlur={formik.handleBlur}
              type="text"
              multiline={true}
              rowsMax={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {<MenuBookIcon></MenuBookIcon>}
                  </InputAdornment>
                ),
              }}
              error={
                formik.touched.courseDescription &&
                formik.errors.courseDescription
              }
            />
            {console.log(formik.values.courseDescription)}
            {localStorage.setItem(
              "courseDescription",
              formik.values.courseDescription
            )}
            {formik.touched.courseDescription &&
            formik.errors.courseDescription ? (
              <div className="text-danger">
                {formik.errors.courseDescription}
              </div>
            ) : null}
            
          </Grid>
          <Grid item>
            <TextField
              style={style_textfield}
              id="Assesment"
              label="Assesment Mode"
              variant="outlined"
              name="assesmentMode"
              placeholder="googleforms,ownwebsite"
              onChange={formik.handleChange}
              value={formik.values.assesmentMode}
              onBlur={formik.handleBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {<PictureInPictureIcon></PictureInPictureIcon>}
                  </InputAdornment>
                ),
              }}
            />
            {localStorage.setItem(
              "assesmentMode",
              formik.values.assesmentMode
            )}
            {formik.values.switchAss == true ? (
              <div className="text-danger">{formik.errors.assesmentMode}</div>
            ) : null}
          </Grid>
          <Grid item>
            <div>
              <FormLabel>
                <i>Select Certificate:</i>
              </FormLabel>
              <Grid>
                <TextField
                  style={style_textfield}
                  id="profilePic"
                  type="file"
                  variant="outlined"
                  onChange={onChangePicture}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {<AttachFileIcon></AttachFileIcon>}
                      </InputAdornment>
                    ),
                  }}
                />
                <img src={imgData} />
                {localStorage.setItem("image", JSON.stringify(picture))}
              </Grid>
            </div>
          </Grid>
          <Grid item>
            <FormLabel>Assignment Available</FormLabel>
            <Switch
              value={formik.values.switchAssignment}
              onChange={formik.handleChange}
              name="switchAssignment"
              inputProps={{
                "aria-label": "primary checkbox",
              }}
            />
            {localStorage.setItem(
              "assignmentAvailable",
              formik.values.switchAssignment
            )}
            {console.log(formik.values.switchAssignment)}
          </Grid>
          <Grid item>
            <FormLabel>Assesment Available</FormLabel>
            <Switch
              value={formik.values.switchAss}
              onChange={formik.handleChange}
              id="Assesment Available"
              name="switchAss"
              inputProps={{
                "aria-label": "secondary checkbox",
              }}
            />
            {localStorage.setItem(
              "assesmentAvailable",
              formik.values.switchAss
            )}
            {console.log(formik.values.switchAss)}
          </Grid>
          <Grid item>
            <FormLabel>Download Available</FormLabel>
            <Switch
              value={formik.values.switchDownload}
              onChange={formik.handleChange}
              name="switchDownload"
              inputProps={{
                "aria-label": "secondary checkbox",
              }}
            />

            {localStorage.setItem(
              "downloadAvailable",
              formik.values.switchDownload
            )}
            {console.log(formik.values.switchDownload)}
          </Grid>
          <Grid item>
            <FormLabel>Recording Available</FormLabel>
            <Switch
              value={formik.values.switchRecord}
              onChange={formik.handleChange}
              name="switchRecord"
              inputProps={{
                "aria-label": "secondary checkbox",
              }}
            />
            {localStorage.setItem(
              "recordingAvailable",
              formik.values.switchRecord
            )}
            {console.log(formik.values.switchRecord)}
          </Grid>
         
          <Paper width="auto" variant="outlined">
            <Grid container row="direction">
              <Button type="button" onClick={() => addHeading()}>
                <b>+</b>
              </Button>
              {finalHeading.map((head, hIndex) => {
                return (
                  <div key={`${head}-${hIndex}`}>
                    <Grid container row="direction">
                      <Grid item>
                        <TextField
                          style={style_textfield}
                          variant="outlined"
                          className="textfield"
                          type="text"
                          label="Heading"
                          name="heading"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {<TrendingFlatIcon></TrendingFlatIcon>}
                              </InputAdornment>
                            ),
                          }}
                          onChange={(event) => (setHeadValues(head, null, event))}
                        />
                        &nbsp;
                        {head.subHead.map((sh, sIndex) => {
                          return (
                            <div key={`${sIndex}`}>
                              <TextField
                                variant="outlined"
                                //className="textfield"
                                type="text"
                                label="Sub Heading"
                                name="subHeading"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {
                                        <FormatListBulletedIcon></FormatListBulletedIcon>
                                      }
                                    </InputAdornment>
                                  ),
                                }}
                                onChange={(event) => setHeadValues(head, sh, event)}
                              >{localStorage.setItem("subHeading",JSON.stringify(finalHeading))}</TextField>
                              <Button
                                onClick={() => removeSubHeading(head, sIndex)}
                              >
                                x
                              </Button>
                            </div>
                          );
                        })}
                        <Grid item>
                          <Button
                            type="button"
                            onClick={() => addSubHeading(head)}
                          >
                            +
                          </Button>
                        </Grid>
                        {/* We want to enable the delete Button */}
                        <Button
                          type="button"
                          onClick={() => removeHeading(hIndex)}
                        >
                          <b>Delete</b>
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
      </Paper>

      {/* <CourseContents element={getResult()}></CourseContents> */}
    </div>
  );
}