import React, {memo} from "react";
import { ArrowForward } from "@mui/icons-material";
import { connect, useDispatch } from "react-redux";
import Upload from '../components/Upload/Upload'
import { CloudUploadOutlined } from '@mui/icons-material'

import TextEditor from "../components/TextEditor";
import Dropdown from "../components/Dropdown";
import Chip from "../components/Chip";
import {
  updateProblemTitle,
  updateProblemDescription,
  updateProblemStatement,
  updateProblemInputFormat,
  updateProblemContraints,
  updateProblemOutputFormat,
  updateProblemTags,
} from "../redux/actions";
import axios from "axios";

function addproblems(props) {
  const dispatch = useDispatch();

  const [step, setStep] = React.useState(1);
  
  const HandleProblemStatementUpdate = (data) => {
    dispatch(updateProblemStatement(data));
  };

  const HandleInputFormatUpdate = (data) => {
    dispatch(updateProblemInputFormat(data));
  };

  const HandleConstraintsUpdate = (data) => {
    dispatch(updateProblemContraints(data));
  };

  const HandleOutputFormatUpdate = (data) => {
    dispatch(updateProblemOutputFormat(data));
  };

  let problemMarkup = []
  if(step === 1) {
    problemMarkup = (
      <div className="lg:container m-auto">
      <div className="lg:pl-36 p-5 space-y-14">
        <h1 className="text-center text-4xl lg:text-[3rem] lg:text-left">
          Add Problems
        </h1>
        <hr />
        <form className="space-y-5">
          <div className="space-y-3">
            <label className="text-lg lg:text-2xl ml-1">Problem Title</label>
            <input
              className="w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow"
              placeholder="Title"
              type="text"
              value={props.problemData.title}
              onChange={(e) => dispatch(updateProblemTitle(e.target.value))}
            />
          </div>
          <div className="space-y-3">
            <label className="text-lg lg:text-2xl ml-1">
              Problem Description
            </label>
            <textarea
              className="w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow"
              placeholder="Write a short description of the problem ..."
              value={props.problemData.description}
              onChange={(e) =>
                dispatch(updateProblemDescription(e.target.value))
              }
              rows="6"
            />
          </div>
          <div className="space-y-3">
            <label className="text-lg lg:text-2xl ml-1">
              Problem Statement
            </label>
            <TextEditor dispatch={HandleProblemStatementUpdate} />
          </div>
          <div className="space-y-3">
            <label className="text-lg lg:text-2xl ml-1">Input Format</label>
            <TextEditor dispatch={HandleInputFormatUpdate} />
          </div>
          <div className="space-y-3">
            <label className="text-lg lg:text-2xl ml-1">Constraints</label>
            <TextEditor dispatch={HandleConstraintsUpdate} />
          </div>
          <div className="space-y-3">
            <label className="text-lg lg:text-2xl ml-1">Output Format</label>
            <TextEditor dispatch={HandleOutputFormatUpdate} />
          </div>
          <div className="space-y-3">
            <label className="text-lg lg:text-2xl ml-1">Level</label>
            <Dropdown fieldName={"Difficulty"} fieldValues={['Easy', 'Medium', 'Hard']} bg={'bg-white'} textColor={'text-black'} />
          </div>
          <div className="space-y-3">
            <label className="text-lg lg:text-2xl ml-1">Tags</label>
            <Chip value={props.tags.results}/>
          </div>
          <div className="flex justify-center items-center ">
            <button className="font-bold bg-custom-yellow2 rounded-full px-5 py-2 outline-none border-none hover:bg-custom-yellow transition ease-out">
              Add Test Case
              <span className="ml-1">
                <ArrowForward />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
    )
  } else if(step === 2) {
    <div className="lg:container m-auto">
            <div className="lg:pl-36 p-5 space-y-14">
                <h1 className="text-center text-4xl lg:text-[3rem] lg:text-left">
                    Add Problems <CloudUploadOutlined className="text-[5rem]"/>
                </h1>
                <hr/>
                <button className="rounded-full bg-custom-yellow2 py-2 px-2 ">Add Test Case</button>
                <div className="bg-black p-4 space-y-3 rounded-2xl">
                    <h1 className="text-3xl">Test Case 1</h1>
                    <p>Input</p>
                    <Upload />
                    <p>Output</p>
                    <Upload />
                </div>               
                <div className="bg-black p-4 space-y-3">
                    <h1 className="text-3xl">Test Case 2</h1>
                    <p>Input</p>
                    <Upload />
                    <p>Output</p>
                    <Upload />
                </div>               
                <div className="bg-black p-4 space-y-3">
                    <h1 className="text-3xl">Test Case 3</h1>
                    <p>Input</p>
                    <Upload />
                    <p>Output</p>
                    <Upload />
                </div>               
                
            </div>
        </div>
  }

  
  return (
    {problemMarkup}
  );
}

const mapStateToProps = (state) => {
  return {
    problemData: state.addProblemData,
  };
};

  export const getServerSideProps = async (ctx) => {
    const response = await axios.get('https://db-code.herokuapp.com/problems/getTagListCreateProblem/');
    console.log('tags', response.data);

    return {
      props: {
        tags: response.data,
      }
    }
  }

export default memo(connect(mapStateToProps, {
  updateProblemTitle,
  updateProblemStatement,
  updateProblemDescription,
  updateProblemInputFormat,
  updateProblemContraints,
  updateProblemOutputFormat,
  updateProblemTags,
})(addproblems));
