import jsQR from "jsqr";
import { ChangeEvent } from "react";
import { useAuthListContext } from "../context/AuthListContextProvider";
import { genDigit } from "../lib/util";

function UploadQr() {
  const { setList, listKey } = useAuthListContext();
  const handleUpload = ({ target }: ChangeEvent<HTMLInputElement>) => {
    // create canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      // null if identidier is not support or being use elsewhere
      window.alert("not support");
      return;
    }
    //create img
    const img = new Image();
    img.onload = () => {
      // config canvas
      canvas.width = img.width;
      canvas.height = img.height;
      // draw qr code on canvas
      ctx.drawImage(img, 0, 0);
      // copy canvas to img
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // copy img to QR code
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      // remove canvas after loaded
      canvas.remove();
      // if QR code not provide data name and code
      if (!code?.data) {
        window.alert("QR code must contain name and code");
        return;
      }
      console.log(code.data);
      const searchParams = new URLSearchParams(code.data);
      // notify if code already exist
      if (listKey.find((l) => l === searchParams.get("name"))) {
        console.log("already exist");
        return;
      }
      // update list
      setList((prev) => [
        ...prev,
        {
          name: searchParams.get("name") ?? "Unknown",
          code: searchParams.get("code") ?? "unknown code",
          time: 10000,
          digit: genDigit(),
        },
      ]);
    };
    img.src = URL.createObjectURL(target.files![0]);
    target.value = "";
  };
  return (
    <label
      key="qr-image"
      style={{
        display: "flex",
        border: "1px solid",
        padding: "0.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        borderRadius: "4px",
        cursor: "pointer",
        lineHeight: "normal",
      }}
    >
      QR
      <input
        type="file"
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          marginLeft: "auto",
        }}
        accept="image/*"
        onChange={handleUpload}
      />
    </label>
  );
}

export default UploadQr;
