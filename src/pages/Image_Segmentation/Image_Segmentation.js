import React, { useState } from "react";
import ImagePicker from "../../components/Image_Picker/Image_Picker";
import useStyles from "./styles";
import WebcamCapture from "../../components/Webcam/Webcam.js";
import {
  Grid,
  Box,
  IconButton,
  Button,
  Backdrop,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Audio from "../../components/Audio_Player/Audio_Player";
import ResultTab from "../../components/Tab/Tab";
import { useMediaQuery } from "react-responsive";
import CircularProgress from "@material-ui/core/CircularProgress";
import FileUplaodIcon from "../../assets/uploadIcon.svg";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";

function Image_Segmentation() {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePresent, setImagePresent] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [resultAudio, setResultAudio] = useState();
  const [englishAudio, setEnglishAudio] = useState();
  const [urduAudio, setUrduAudio] = useState();
  const [open, setOpen] = useState(false);

  const [source, setSource] = useState("");

  const [englishTabData, setEnglishTabData] = useState();
  const [urduTabData, setUrduTabData] = useState();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [model, setModel] = useState("resnet18");

  const remedialActions = {
    healthy: {
      title: "Healthy: Healthy Plant",
      description:
        "Fertilize with the right fertilizer mixture and a balanced nutrient supply. Do not over-water the crop during the season. Do not touch healthy plants after touching infected plants. Maintain a high number of different varieties of plants around fields. If treating against an infestation, use specific products that do not affect beneficial insects. Remove diseased leaves, fruit or branches at the right time during the growing season. After the harvest, clean up plant debris from the field or orchard and burn them. In case of pests and diseases, always consider an integrated approach. with preventive measures together with biological treatments if available. As long as preventive measures are followed and care is taken to give plants and trees what they need, no chemical control should be needed!",
      symptoms: [
        "Dark green colored plant",
        "Firm leaves",
        "Brightly colored flowers",
        "Well shaped, good-colored leaves, nutritious fruits and flowers",
        "Root system is well developed",
      ],
      // recommendations:{
      //   title: "Recommendations",

      // }
    },
    resistant: {
      title: "Resistant: Mild Yellow Stripe Rust",
      description:
        "The severity of the disease depends on the susceptibility of the plant. In vulnerable varieties, the fungus produces tiny, yellow to orange (rusty) pustules that are arranged in rows forming narrow stripes parallel to the leaf veins. They eventually merge and can engulf the whole leaf, a feature that appears earlier in young plants. These pustules (0.5 to 1 mm in diameter) can sometimes also be found on stems and heads. At later stages of the disease, long, necrotic, light brown stripes or blotches are visible on leaves, often covered with rusty pustules. In severe infections, the growth of plants is seriously compromised and tissues are damaged. The reduced leaf area leads to lower productivity, fewer spikes per plant and fewer grains per spike. Overall, the disease can lead to severe crop losses.",
      symptoms: [
        "Yellow colored plant",
        "Tiny, rusty pustules arranged in stripes",
        "Stems and heads can alse be affected",
      ],
    },
    susceptible: {
      title: "Susceptible: Severe Yellow Stripe Rust",
      description:
        "The severity of the disease depends on the susceptibility of the plant. In vulnerable varieties, the fungus produces tiny, yellow to orange (rusty) pustules that are arranged in rows forming narrow stripes parallel to the leaf veins. They eventually merge and can engulf the whole leaf, a feature that appears earlier in young plants. These pustules (0.5 to 1 mm in diameter) can sometimes also be found on stems and heads. At later stages of the disease, long, necrotic, light brown stripes or blotches are visible on leaves, often covered with rusty pustules. In severe infections, the growth of plants is seriously compromised and tissues are damaged. The reduced leaf area leads to lower productivity, fewer spikes per plant and fewer grains per spike. Overall, the disease can lead to severe crop losses.",
      symptoms: [
        "Yellow colored plant with severe rust spots",
        "Tiny, rusty pustules arranged in stripes",
        "Stems and heads can alse be affected",
      ],
    },
  };

  const urduRemedialActions = {
    healthy: {
      title: "صحت مند: صحت مند پودا",
      description:
        "کھاد کے صحیح مرکب اور متوازن غذائی اجزاء کے ساتھ کھاد ڈالیں۔ موسم کے دوران فصل کو زیادہ پانی نہ دیں۔ متاثرہ پودوں کو چھونے کے بعد صحت مند پودوں کو مت چھونا۔ کھیتوں کے ارد گرد پودوں کی مختلف اقسام کی بڑی تعداد کو برقرار رکھیں۔ اگر انفیکشن کے خلاف علاج کر رہے ہیں تو، مخصوص مصنوعات استعمال کریں جو فائدہ مند کیڑوں کو متاثر نہیں کرتی ہیں۔ بڑھتے ہوئے موسم کے دوران صحیح وقت پر بیمار پتے، پھل یا شاخیں ہٹا دیں۔ کٹائی کے بعد، کھیت یا باغ سے پودوں کا ملبہ صاف کر کے جلا دیں۔ کیڑوں اور بیماریوں کی صورت میں، ہمیشہ ایک مربوط نقطہ نظر پر غور کریں۔ اگر دستیاب ہو تو حیاتیاتی علاج کے ساتھ احتیاطی تدابیر کے ساتھ۔ جب تک احتیاطی تدابیر کی پیروی کی جاتی ہے اور پودوں اور درختوں کو ان کی ضرورت کے مطابق احتیاط برتی جاتی ہے، کسی کیمیائی کنٹرول کی ضرورت نہیں ہوگی!",
      symptoms: [
        "گہرے سبز رنگ کا پودا",
        "پختہ پتے",
        "چمکدار رنگ کے پھول",
        "اچھی شکل، اچھے رنگ کے پتے، غذائیت سے بھرپور پھل اور پھول",
        "جڑ کا نظام اچھی طرح سے تیار ہے",
      ],
      // recommendations:{
      //   title: "Recommendations",

      // }
    },
    resistant: {
      title: "مزاحم: ہلکی پیلی پٹی زنگ",
      description:
        "بیماری کی شدت پودے کی حساسیت پر منحصر ہے۔ کمزور قسموں میں، فنگس چھوٹے، پیلے سے نارنجی (زنگ آلود) آبلے پیدا کرتی ہے جو پتوں کی رگوں کے متوازی تنگ دھاریوں کی شکل میں قطاروں میں ترتیب دی جاتی ہے۔ وہ آخرکار ضم ہو جاتے ہیں اور پورے پتے کو گھیر لیتے ہیں، یہ ایک خصوصیت جو جوان پودوں میں پہلے ظاہر ہوتی ہے۔ یہ آبلے (قطر میں 0.5 سے 1 ملی میٹر) بعض اوقات تنوں اور سروں پر بھی پائے جاتے ہیں۔ بیماری کے بعد کے مراحل میں، پتوں پر لمبی، نیکروٹک، ہلکی بھوری دھاریاں یا دھبے نظر آتے ہیں، جو اکثر زنگ آلود آبلوں سے ڈھکے ہوتے ہیں۔ شدید انفیکشن میں، پودوں کی نشوونما میں سنجیدگی سے سمجھوتہ ہوتا ہے اور بافتوں کو نقصان پہنچتا ہے۔ پتوں کا کم رقبہ کم پیداوری کا باعث بنتا ہے، فی پودا کم سپائیکس اور کم اناج فی سپائیک۔ مجموعی طور پر، بیماری فصلوں کو شدید نقصان پہنچا سکتی ہے۔",
      symptoms: [
        "پیلے رنگ کا پودا",
        "چھوٹے، زنگ آلود آبلوں کو دھاریوں میں ترتیب دیا گیا ہے۔",
        "تنوں اور سروں کو بھی متاثر کیا جا سکتا ہے۔",
      ],
    },
    susceptible: {
      title: "حساس: شدید پیلی پٹی زنگ",
      description:
        "بیماری کی شدت پودے کی حساسیت پر منحصر ہے۔ کمزور قسموں میں، فنگس چھوٹے، پیلے سے نارنجی (زنگ آلود) آبلے پیدا کرتی ہے جو پتوں کی رگوں کے متوازی تنگ دھاریوں کی شکل میں قطاروں میں ترتیب دی جاتی ہے۔ وہ آخرکار ضم ہو جاتے ہیں اور پورے پتے کو گھیر لیتے ہیں، یہ ایک خصوصیت جو جوان پودوں میں پہلے ظاہر ہوتی ہے۔ یہ آبلے (قطر میں 0.5 سے 1 ملی میٹر) بعض اوقات تنوں اور سروں پر بھی پائے جاتے ہیں۔ بیماری کے بعد کے مراحل میں، پتوں پر لمبی، نیکروٹک، ہلکی بھوری دھاریاں یا دھبے نظر آتے ہیں، جو اکثر زنگ آلود آبلوں سے ڈھکے ہوتے ہیں۔ شدید انفیکشن میں، پودوں کی نشوونما میں سنجیدگی سے سمجھوتہ ہوتا ہے اور بافتوں کو نقصان پہنچتا ہے۔ پتوں کا کم رقبہ کم پیداوری کا باعث بنتا ہے، فی پودا کم سپائیکس اور کم اناج فی سپائیک۔ مجموعی طور پر، بیماری فصلوں کو شدید نقصان پہنچا سکتی ہے۔",
      symptoms: [
        "پیلے رنگ کا پودا جس میں زنگ کے شدید دھبے ہوتے ہیں۔",
        "چھوٹے، زنگ آلود آبلوں کو دھاریوں میں ترتیب دیا گیا ہے۔",
        "تنوں اور سروں کو بھی متاثر کیا جا سکتا ہے۔",
      ],
    },
  };

  const handleImage = (result) => {
    const slug = result.split("base64,").pop();
    setImage(slug);
    setImagePresent(true);
  };

  const handleImagePresent = (result) => {
    setImagePresent(result);
  };

  const handleModelSelect = (event) => {
    setModel(event.target.value);
  };

  const handleSubmit = () => {
    setOpen(true);
    setResult();
    setResultImage();
    setIsResult(false);
    const data = {
      image: image,
      model: model,
    };
    if (imagePresent) {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/image-segment`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const response = res.data;
          // split the reponse on the basis of space
          const responseArray = response.split(" ");
          const leafResult = responseArray[1].replace(/\r\n/g, "");
          setResult(leafResult);

          const imageResult = responseArray[0].replace("jpg", "png");

          setResultImage(imageResult);

          switch (leafResult) {
            case "Healthy":
              setEnglishAudio("/healthy_english.mp3");
              setUrduAudio("/healthy_urdu.mp3");
              setEnglishTabData(remedialActions.healthy);
              setUrduTabData(urduRemedialActions.healthy);
              break;
            case "Resistant":
              setEnglishAudio("/resistant_english.mp3");
              setUrduAudio("/resistant_urdu.mp3");
              setEnglishTabData(remedialActions.resistant);
              setUrduTabData(urduRemedialActions.resistant);

              break;
            case "Susceptible":
              setEnglishAudio("/susceptible_english.mp3");
              setUrduAudio("/susceptible_urdu.mp3");

              setEnglishTabData(remedialActions.susceptible);
              setUrduTabData(urduRemedialActions.susceptible);

              break;
            default:
              setEnglishAudio("/healthy_english.mp3");
              setUrduAudio("/healthy_urdu.mp3");
              setEnglishTabData(remedialActions.healthy);
              setUrduTabData(urduRemedialActions.healthy);

              break;
          }
          setLoading(false);
          setIsResult(true);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        setImagePresent(true);
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          handleImage(reader.result);
        };
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#27293d" }}>
      <Grid container spacing={3} className={classes.grid_container}>
        {!isMobile && (
          <Grid item md={12} xs={!2}>
            <Grid container>
              <Grid item md={5} sm={12} xs={12} className={classes.ind_grid}>
                <ImagePicker
                  handleImage={handleImage}
                  handleImagePresent={handleImagePresent}
                />
              </Grid>
              <Grid item md={7}>
                <Grid container>
                  <Grid
                    item
                    md={3}
                    sm={12}
                    xs={12}
                    className={classes.ind_grid}
                  >
                    <Typography variant="h5" style={{ color: "#fff" }}>
                      OR
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={9}
                    sm={12}
                    xs={12}
                    className={classes.ind_grid}
                  >
                    <WebcamCapture
                      handleImage={handleImage}
                      handleImagePresent={handleImagePresent}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {isMobile && (
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {source && (
              <Box
                display="flex"
                justifyContent="center"
                className={classes.imgBox}
              >
                <img src={source} alt={"snap"} className={classes.img}></img>
              </Box>
            )}

            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                capture="environment"
                onChange={(e) => handleCapture(e.target)}
              />
              <IconButton
                aria-label="upload picture"
                component="span"
                className={classes.submitButton}
                style={{
                  fontSize: "1.1rem",
                  height: "2.5rem",
                  color: "#fff",
                }}
              >
                <PhotoCameraRoundedIcon
                  fontSize="large"
                  style={{ marginRight: "10px", color: "#fff" }}
                />
                Open Camera
              </IconButton>
            </label>
          </Grid>
        )}
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormControl
            style={{
              width: isMobile ? "50%" : "20%",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              style={{
                color: "#fff",
              }}
            >
              Select model
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={model}
              label="Model"
              onChange={handleModelSelect}
              style={{ color: "#fff" }}
            >
              <MenuItem value="resnet18">Resnet 18</MenuItem>
              <MenuItem value="resnet50">Resnet 50</MenuItem>
              <MenuItem value="alexnet">AlexNet</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            disabled={imagePresent ? false : true}
            color="primary"
            size="large"
            className={classes.submitButton}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
        {isResult && englishTabData && urduTabData && resultImage !== "" && (
          <Grid item md={12} sm={12}>
            <div className={classes.result_container}>
              <ResultTab
                englishAudio={englishAudio}
                urduAudio={urduAudio}
                result={result}
                image={resultImage}
                englishData={englishTabData}
                urduData={urduTabData}
              />
            </div>
          </Grid>
        )}
      </Grid>
      <Backdrop
        style={{
          zIndex: "100",
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
        open={open}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            style={{
              margin: "auto",
              color: "#fff",
            }}
          />
          <Typography
            style={{
              color: "white",
              fontSize: "1.2rem",
              marginTop: "1rem",
              fontWeight: "lighter",
            }}
          >
            Processing the image. Please wait.
          </Typography>
        </div>
      </Backdrop>
    </div>
  );
}

export default Image_Segmentation;
