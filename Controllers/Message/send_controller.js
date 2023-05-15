const { messageModel } = require("../../Models/messagesModel");
const { uploadVFile, uploadAFile } = require("../FileUpload/uploadFile");

module.exports.sendMsg = async (req, res) => {
  const { category, text, audioFile, videoFile, location} = req.body;
  if (!!audioFile || !!videoFile) {
    let details = { category, text, location, audio: "", video: ""};
    let isError;
    await uploadAFile(audioFile).then((audioRes) => {
        audioRes === "ENOTFOUND"? isError = true: "";
      details.audio = audioRes.url;
    });
    await uploadVFile(videoFile).then((videoRes) => {
        videoRes === "ENOTFOUND"? isError = true: "";
        details.video = videoRes.url;
    });
    isError?
        res.status(500).json({
          message: "Network error: please check your connection",
          success: false,
        }):
        saveMsg(details).then((saveRes) =>{
          res
            .status(saveRes.status)
            .json({ message: saveRes.message, success: saveRes.success, data: saveRes.data });
        });

  }
  else {
    saveMsg({ category, text, location,  }).then((saveRes) => {
      res
        .status(saveRes.status)
        .json({ message: saveRes.message, success: saveRes.success, data: saveRes.data });
    });
  }
};

const saveMsg = (data) => {
  const { category, text, audio, video, location,  } = data;
  return messageModel
  .create({ category, message: { text, audio, video }, location})
  .then((data) => {
      return {
        message: "Message sent",
        success: true,
        data,
        suggestedMeasure:
          "This will be writing according to the cateory of the emergency",
        status: 200,
      };
    })
    .catch((err) => {
      return { message: err.message, success: false, status: 500 };
    });
};
