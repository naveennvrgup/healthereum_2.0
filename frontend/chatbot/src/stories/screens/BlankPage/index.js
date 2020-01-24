import * as React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Audio } from "expo-av";
import { StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import axios from "react-native-axios";
import { BASE_URL, LANGAGES } from "../../../Config/Constants";
import audio from "../../../Assets/audio";
import docAvatar from "../../../Assets/avatar/docAvatar.jpg";
import reportDescription from "../../../Assets/text/description";
import buttonText from "../../../Assets/text/buttonText";

import SliderComponent from "../../../components/slider/slider";

import userAvatar from "../../../Assets/avatar/userAvatar.jpg";
soundObject = new Audio.Sound();
global.soundObject.loadAsync(
  audio["pre" + "-" + "hi"]
);
export interface Props {
  navigation: any;
}
export interface State { }

const waitingIcon =
  "https://media1.tenor.com/images/3aaadc45f4da67e52850a02aedf68040/tenor.gif";
const resultsArrivedIcon =
  "https://images.vexels.com/media/users/3/143372/isolated/preview/6e633a235ea0d523078e667b9f84f15b-blue-check-mark-by-vexels.png";


class BlankPage extends React.Component<Props, State> {
  state = {
    language: "",
    messages: [],
    image: null,
    imagename: "",
    playing: {},
    playingAudio: false,
    texts: [],
    tests: [],
    data: null,
    audios: [],
    do: [],
    waitIcon: waitingIcon,
    waitMessageId: null,
    showSlider: false,
    duration: 0,
    audioPostion: 0,
  };

  constructor(props) {
    super(props);
    // global.soundObject = null;
    global.id = 1;
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: global.id,
          text:
            "Hi,  I am Report Samjho, Please select your Preferred Language",
          createdAt: new Date(),
          quickReplies: {
            type: "radio", // or 'checkbox',
            keepIt: true,
            values: [
              {
                title: "English",
                value: "en"
              },
              {
                title: "हिन्दी",
                value: "hi"
              },
              {
                title: "ગુજરતી",
                value: "gu"
              },
              {
                title: "मराठी",
                value: "mr"
              }
            ]
          },
          user: {
            _id: 2,
            name: "Bot",
            avatar: docAvatar
          }
        }
      ]
    });
  }

  seekTo = async (newPosition) => {
    // console.log("Asked to seek to", newPosition);
    if (newPosition === this.state.duration) {
      this.setState({ showSlider: false });
      this.onQuickReply([
        {
          title: "",
          value: "stop"
        }
      ]);
    }
    await global.soundObject.setPositionAsync(newPosition);
  }
  computeReportDescription() {
    let valueDetected = parseFloat(this.state.apiResponse.data.value);
    // console.log("called compute");
    let condition;
    if (valueDetected <= 5.6) {
      condition = "normal";
    } else if (valueDetected > 5.6 && valueDetected <= 6.4) {
      condition = "preDia";
    } else {
      condition = "dia";
    }
    // console.log("found condition-", condition, "with value", valueDetected);
    return condition;
  }
  updateIdofPausePlay() {
    let index = 0;
    let items = [...this.state.messages];
    items.forEach((ele, i) => {
      if (ele._id === this.state.playing.id) {
        index = i;
      }
    });
    // console.log("matched id", index);
    return index;

  }
  onSend(messages = []) {
    messages.forEach(item => {
      global.id = global.id + 1;
      item._id = global.id;
      item.createdAt = new Date();
    });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  onQuickReply = replies => {
    // if (replies[0].title !== "") {
    //   this.onSend([
    //     {
    //       text: replies[0].title,
    //       user: {
    //         _id: 1,
    //         name: "Me",
    //         avatar: userAvatar
    //       }
    //     }
    //   ]);
    // }
    if (replies[0].value === "report") {
      // /.log("report report ");
      // setting wait icon
      this.setState({ waitIcon: waitingIcon });
      this.setState({ imagename: "" });
      this._pickImage().then(() => {
        // console.log(this.state.imagename);
        if (this.state.imagename == "") {
          // console.log("none uploaded");
          this.onQuickReply([
            {
              title: "",
              value: this.state.language
            }
          ]);

        } else {
          this.onSend([
            {
              //text: replies[0].title,
              user: {
                _id: 1,
                name: "Me",
                avatar: userAvatar
              },
              text: this.state.imagename
            }
          ]);

          this.onSend([
            {
              type: "wait",
              image: this.state.waitIcon,
              text: buttonText[this.state.language].waitMessage,
              user: {
                _id: 2,
                name: "Bot",
                avatar: docAvatar
              }
            }
          ]);

          // let itemRemoved = this.state.messages.pop();
          // this.state.messages.pop();
          // this.state.messages.push(itemRemoved);

          // this.setState({intialMessage:false});
          var form = new FormData();
          form.append("ln", this.state.language);
          form.append("file", {
            uri: this.state.image,
            name: this.state.imagename,
            type: "application/pdf"
          });
          // console.log("doing request");
          // Axios call
          axios
            .post(BASE_URL + "api", form, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(r => {
              // --------------------------------got response now manipulate----------------------------
              // let r = {
              //   data: {
              //     "testFound": true,
              //     "value": "4.5"
              //   }
              // };
              // global.soundObject.loadAsync(
              //   audio[condition + "-" + this.state.language]
              // );
              // console.log("response", r);
              this.setState({ apiResponse: r });
              let condition = this.computeReportDescription();
              // global.soundObject.unloadAsync();
              setTimeout(() => {

                // global.soundObject.loadAsync(
                //     audio[condition + "-" + this.state.language]
                //   );

              }, 0)
              global.soundObject.getStatusAsync()
                .then(result => {
                  // console.log("result", result.isLoaded==false);
                  // this.setState({ "duration": result.durationMillis, showSlider: true });

                });

              let message_from_doc;

              message_from_doc = r.data.testFound
                ? `${buttonText[this.state.language].foundTest}`.replace("x", r.data.value)
                : buttonText[this.state.language].notFoundTest;

              // to change  wait icon
              // console.log("last", this.state.messages[0]);
              // this.state.messages.shift();
              this.state.messages = this.state.messages.filter(function (item, idx) {
                return item.type !== "wait";
              });
              if (r.data.testFound) {
                // this.setState({ waitIcon: resultsArrivedIcon });
                // console.log("sending reply");

                if (r.data.value != false) {
                  this.onSend([
                    {
                      text: message_from_doc,
                      user: {
                        _id: 2,
                        name: "Bot",
                        avatar: docAvatar
                      },
                      quickReplies: {
                        type: "radio", // or 'checkbox',
                        keepIt: true,
                        values: [
                          {
                            title: buttonText[this.state.language].hearButton,
                            value: "audio"
                          },

                          {
                            title: buttonText[this.state.language].readButton,
                            value: "text"
                          }
                        ]
                      }
                    }
                  ]);
                } else {
                  this.onSend([
                    {
                      text: buttonText[this.state.language].foundTestNotValue,
                      user: {
                        _id: 2,
                        name: "Bot",
                        avatar: docAvatar
                      }
                    }
                  ]);
                  this.onQuickReply([
                    {
                      title: "",
                      value: this.state.language
                    }
                  ]);
                }
              } else {
                this.onSend([
                  {
                    text: message_from_doc,
                    user: {
                      _id: 2,
                      name: "Bot",
                      avatar: docAvatar
                    }
                  }
                ]);
                this.onQuickReply([
                  {
                    title: "",
                    value: this.state.language
                  }
                ]);
              }
            })
            .catch(e => {
              // console.log("last", this.state.messages[0]);
              this.state.messages.shift();
              this.onSend([
                {
                  text: buttonText[this.state.language].serverError,
                  user: {
                    _id: 2,
                    name: "Bot",
                    avatar: docAvatar
                  }
                }
              ]);
              this.onQuickReply([
                {
                  title: "",
                  value: this.state.language
                }
              ]);
              console.log("error from api", e);
            });

        }

      });
    }

    if (replies[0].value === "text") {
      let condition = this.computeReportDescription();
      // console.log(this.state.language, condition);
      this.onSend([
        {
          text: reportDescription[this.state.language][condition],
          user: {
            _id: 2,
            name: "Bot",
            avatar: docAvatar
          }
        }
      ]);
      this.onQuickReply([
        {
          title: "",
          value: this.state.language
        }
      ]);
    }

    if (replies[0].value === "audio") {
      let condition = this.computeReportDescription();
      this.setState({ condition });

      this.CheckIfAudioCanPlay(condition);
      this.onSend([
        {
          type: "player",
          image:
            "https://cdn.dribbble.com/users/29332/screenshots/3201788/speaker.gif",
          quickReplies: {
            type: "radio",
            keepIt: true,
            values: [
              {
                title: buttonText[this.state.language].pause,
                value: "pause"
              },
              {
                title: buttonText[this.state.language].stop,
                value: "stop"
              }
            ]
          },
          user: {
            _id: 2,
            name: "Bot",
            avatar: docAvatar
          }
        }
      ]);
    }
    if (replies[0].value === "pause") {
      // console.log(this.state.playing);
      let items = [...this.state.messages];
      // console.log("last message block",items[items.length - 1]);
      // let i = items.findIndex(x => x._id === this.state.playing.id);
      let i = this.updateIdofPausePlay();
      console.log("item with index before", i);
      if (!this.state.playingAudio) {
        this.CheckIfAudioCanPlay(this.state.condition);
        console.log("play block");
        // console.log("Audio was playing",this.state.playingAudio,"in play block");
        items[i].quickReplies.values[0].title = buttonText[this.state.language].pause;
        items[i].image = "https://cdn.dribbble.com/users/29332/screenshots/3201788/speaker.gif";
        this.setState({
          playingAudio: true,
          messages: items
        });
      } else {
        this.pauseAudio();
        console.log("pause block");
        // console.log("Audio was playing",this.state.playingAudio,"in pause block");
        items[i].quickReplies.values[0].title = buttonText[this.state.language].play;
        items[i].image = "https://i.ibb.co/nCbGH32/Artboard.png";
        this.setState({
          playingAudio: false,
          messages: items
        });
      }
    }
    if (replies[0].value === "stop") {
      this.stopAudio();

      // let items = [...this.state.messages];
      // // let i = items.findIndex(x => x._id === this.state.playing.id);
      // let i = this.updateIdofPausePlay();
      this.state.messages = this.state.messages.filter(function (item, idx) {
        return item.type !== "player";
      });

      this.onQuickReply([
        {
          title: "",
          value: this.state.language
        }
      ]);


      this.setState({ imagename: "" });
      // global.soundObject.unloadAsync();
    }
    if (LANGAGES.includes(replies[0].value)) {
      console.log("Language change to", replies[0].value);
      this.setState({
        language: replies[0].value
      });

      this.onSend([
        {
          type: "request",
          text: buttonText[replies[0].value].uploadRequest,
          quickReplies: {
            type: "radio", // or 'checkbox',
            keepIt: false,
            values: [
              {
                title: buttonText[replies[0].value].uploadButton + " ⬆️",
                value: "report"
              }
            ]
          },
          user: {
            _id: 2,
            name: "Bot",
            avatar: docAvatar
          }
        }
      ]);
    }
  };

  CheckIfAudioCanPlay = async (condition) => {
    global.soundObject.getStatusAsync()
      .then(result => {
        // console.log("check is sound loaded", result.isLoaded==false);
        // this.setState({ "duration": result.durationMillis, showSlider: true });
        if (result.isLoaded === false) {//we want it to match
          setTimeout(this.CheckIfAudioCanPlay, 50);//wait 50 millisecnds then recheck
          return;
        }
        // result.isLoaded=true/;
        //real action
        // console.log("playing audio")
        else this.playAudio(condition)

      });





  }

  playAudio = async (condition) => {
    // console.log("play audio for ", condition, this.state.language, "filename", audio[condition + "-" + this.state.language]);

    if (Object.keys(this.state.playing).length === 0) {
      try {
        // if (result.isLoaded==false) {
        //   await while(result.isLoaded);
        // }
        // console.log("in try catch");
        global.soundObject.setOnPlaybackStatusUpdate(
          this.onPlaybackStatusUpdate
        );
        // console.log("just before audio play", condition + "-" + this.state.language);


        global.soundObject.getStatusAsync()
          .then(result => {
            // console.log("duration", result.durationMillis);
            this.setState({ "duration": result.durationMillis, showSlider: true });

          });
        await global.soundObject.playAsync();
        this.setState({
          playing: {
            playing: true,
            id: global.id,
          },
          playingAudio: true
        });
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
        console.log(error);
      }
    } else {
      await global.soundObject.playAsync();
      this.setState({
        playing: {
          ...this.state.playing,
          playing: true
        }
      });
    }
  };
  onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
      }
    } else {
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        this.onQuickReply([
          {
            title: "",
            value: "stop"
          }
        ]);

      } else {
        // console.log("current time",playbackStatus.positionMillis);
        this.setState({ "audioPostion": playbackStatus.positionMillis });
        // console.log("from state position is",this.state.audioPostion);
      }
    }
  };
  pauseAudio = async () => {
    if (typeof this.state.playing !== "undefined") {
      await global.soundObject.pauseAsync();
      this.setState({
        playing: {
          ...this.state.playing,
          playing: false
        }
      });
    }
  };
  stopAudio = async () => {
    if (typeof this.state.playing !== "undefined") {
      await global.soundObject.stopAsync();
      this.setState({
        playing: {},
        showSlider: false
      });
    }
  };

  _pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: false
    });
    if (result.type === "success") {
      this.setState({
        image: result.uri,
        imagename: result.name
      });
    }
  };

  render() {
    // const param = this.props.navigation.state.params;
    // console.log("rerender with duration and pos",this.state.duration,this.state.audioPostion);
    return (
      <>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          onQuickReply={this.onQuickReply}
          user={{
            _id: 1,
            avatar: userAvatar
          }}
          renderInputToolbar={() => null}
          showAvatarForEveryMessage={true}
          showUserAvatar={true}
          isAnimated={true}
        />

        {this.state.showSlider ? <View style={styles.container}><SliderComponent changePostion={(newPosition) => this.seekTo(newPosition)} duration={this.state.duration} value={this.state.audioPostion} /></View> : null}
        {/* {this.state.showSlider ? <SliderComponent duration={this.state.duration} audioPostion={this.state.audioPostion}/> : null} */}
      </>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f0f0f0",
    padding: 2
  }, container: {
    marginLeft: 50,
    marginRight: 20,
    marginTop: -50,
    backgroundColor: "#f0f0f0",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20
  }
});

export default BlankPage;
