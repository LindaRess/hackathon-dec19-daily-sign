import moment from "moment";

export const convertBase64StringToFile = signImage => {
  const block = signImage.split(";");
  // Get the content type of the image
  const contentType = block[0].split(":")[1]; // In this case "image/gif"
  // get the real base64 content of the file
  const realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

  // Convert it to a blob to upload
  return b64toBlob(realData, contentType);
};

const b64toBlob = (b64Data, contentType, sliceSize) => {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  const byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

export const pad = (num, size) => {
  let s = String(num);
  if (s.length === 3) {
    return s;
  }
  while (s.length < (size || 3)) {
    s = "0" + s;
  }
  return s;
};

export const monday = parseInt(
  `${moment()
    .startOf("week")
    .year()}${pad(
    moment()
      .startOf("week")
      .dayOfYear()
  )}`,
  10
);

export const sunday = parseInt(
  `${moment()
    .endOf("week")
    .year()}${pad(
    moment()
      .endOf("week")
      .dayOfYear()
  )}`,
  10
);

export const today = () => {
  return parseInt(`${moment().year()}${pad(moment().dayOfYear())}`, 10);
};

export const retrieveDate = dateIntFromAPI => {
  const year = moment().format("YYYY");
  return new Date(year, 0, dateIntFromAPI);
};
