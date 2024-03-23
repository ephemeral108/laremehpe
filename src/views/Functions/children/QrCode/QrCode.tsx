import { Button, Input, Space } from "antd";
import styles from "./QrCode.module.css";
import QRCode from "qrcode.react";
import { useState } from "react";

const changeCanvasToPic = () => {
  const canvasImg = document.getElementsByTagName(
    "canvas"
  )[0] as HTMLCanvasElement; // 获取canvas类型的二维码
  const img = new Image();
  img.src = canvasImg.toDataURL("image/png"); // 将canvas对象转换为图片的data url
  const downLink = document.createElement("a");
  downLink.href = img.src;
  downLink.download = "qrCode";
  document.body.append(downLink);
  downLink.click();
  setTimeout(() => {
    downLink.remove();
  }, 1000);
};

export const QrCode = () => {
  const { TextArea } = Input;
  const [form, setForm] = useState({
    size: 256,
    text: "http://laremehpe.eu.org:5173",
  });
  return (
    <div className={styles.box}>
      <TextArea
        rows={4}
        placeholder="text"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <Space>
        <Input
          placeholder="size"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: +e.target.value })}
        />
        <Button
          type="primary"
          onClick={() => {
            // console.log("download");
            changeCanvasToPic();
          }}
        >
          download
        </Button>
      </Space>
      <div className={styles.codeBox}>
        <QRCode value={form.text} size={form.size} />
      </div>
    </div>
  );
};
