/* MoveNet Skeleton - Steve's Makerspace (most of this code is from TensorFlow)

MoveNet is developed by TensorFlow:
https://www.tensorflow.org/hub/tutorials/movenet

*/

let video, bodypose, pose, keypoint, detector;
let poses = [];

function preload(){
  earImg = loadImage("upload_e7b8681276bf136e02f932e89ea6fe54.gif")
  }

async function init() {
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  };
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig
  );
}

async function videoReady() {
  console.log("video ready");
  await getPoses();
}

async function getPoses() {
  if (detector) {
    poses = await detector.estimatePoses(video.elt, {
      maxPoses: 2,
      //flipHorizontal: true,
    });
  }
  requestAnimationFrame(getPoses);
}

async function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(width, height);
  video.hide();
  await init();

  stroke(255);
  strokeWeight(5);
}

function draw() {
  image(video, 0, 0);
  drawSkeleton();
  // flip horizontal
  cam = get();
  translate(cam.width, 0);
  scale(-1, 1);
  image(cam, 0, 0);
  text("412730342 蕭雯萱",50,50)
}

function drawSkeleton() {
  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    pose = poses[i];
    partA = pose.keypoints[3];
    partB = pose.keypoints[4];
    if (partA.score > 0.1 && partB.score > 0.1) {
      push()
      imageMode(CENTER);
      image(earImg,partA.x,partA.y-25,50,50)
      pop()
      
    }
    if (partA.score > 0.1 && partB.score > 0.1) {
      push()
      imageMode(CENTER);
      image(earImg,partB.x,partB.y,50,50)
      pop()
      
    }

   partA = pose.keypoint[2]
   if (partA.score>0.1){
    push()
    textSize(50)
    fill("#960018")
    scale(1,-1)
    text("412730342 蕭雯萱",partA.x-50,partA.y-50)
    pop()
   }
    
  }
}

/* Points (view on left of screen = left part - when mirrored)
  0 nose
  1 left eye
  2 right eye
  3 left ear
  4 right ear
  5 left shoulder
  6 right shoulder
  7 left elbow
  8 right elbow
  9 left wrist
  10 right wrist
  11 left hip
  12 right hip
  13 left kneee
  14 right knee
  15 left foot
  16 right foot
*/
