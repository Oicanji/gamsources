export const extensionsConvert = {
  aseprite: "image/x-aseprite",
  class: "text/plain",
};
  
export const extensionsSupports = ["aseprite", "class"];
  
export const typesFiles = {
  image: ["image", "sprite"],
  audio: ["sound", "music", "voiced"],
  text: ["text", "script", "code"],
};

export const subType = {
  image: "image",
  sprite: "image",
  sound: "audio",
  music: "audio",
  voiced: "audio",
  text: "text",
  script: "text",
  code: "text",
}

export const attrNames = {
  image: false,
  sprite: {
    name: "Multiple sprites",
    input: "turnOnOff",
  },
  sound: {
    name: "Loop sound?",
    input: "turnOnOff",
  },
  music: false,
  voiced: false,
  text: false,
  script: false,
  code: false,
}

export const extraNames = {
  image: false,
  sprite: {
    name: "Sprite individual size",
    input: "grid",
  },
  sound: false,
  music: false,
  voiced: false,
  text: false,
  script: false,
  code: false,
}
  
export const typesDescriptions = {
  sprite: {
    title: "Sprite image file",
    description:
      "Commonly used in games, may have a multiple frames or collections of images",
  },
  image: {
    title: "Image audio file",
    description: "Images for backgrounds, icons, etc",
  },
  sound: {
    title: "Sound audio file",
    description: "Wide range of audio files, like sound effects",
  },
  music: {
    title: "Music audio file",
    description: "Music files for background music, music themes, etc",
  },
  voiced: {
    title: "Voiced audio file",
    description:
      "Audio files for narrations, voice acting and more audio with voice",
  },
  text: {
    title: "Text file",
    description: "Text files for subtitles, descriptions, etc",
  },
  script: {
    title: "Script text file",
    description:
      "This is to story scripts, like a movie script, or history script",
  },
  code: {
    title: "Code script file",
    description: "Code files for programming, with programming languages",
  },
};