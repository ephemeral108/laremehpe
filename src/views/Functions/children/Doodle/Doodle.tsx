import { useEffect, useRef, useState } from "react";
import { Button, Input, Space } from "antd";
import styles from "./Doodle.module.css";

type device = "desktop" | "mobile" | "tablet";
const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android tablet/i.test(userAgent);

  let deviceType: device = "desktop";
  if (isMobile) {
    deviceType = "mobile";
  } else if (isTablet) {
    deviceType = "tablet";
  }

  return deviceType;
};

export const Doodle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false);
  const [size, setSize] = useState({
    x: 400,
    y: 500,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    ctx.current = context;

    // 初始化画布样式
    // context.fillStyle = "#eee";
    // context.fillRect(0, 0, canvas.width, canvas.height);

    // 添加鼠标和触摸事件监听
    addCanvasEventListeners(canvas);

    if (getDeviceType() === "desktop") {
      setSize({
        x: 1920,
        y: 800,
      });
    }
    // 清理函数，移除事件监听器
    return () => {
      removeCanvasEventListeners(canvas);
    };
  }, []);

  const addCanvasEventListeners = (canvas: HTMLCanvasElement) => {
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);
  };

  const removeCanvasEventListeners = (canvas: HTMLCanvasElement) => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("touchstart", handleTouchStart);
    canvas.removeEventListener("touchmove", handleTouchMove);
    canvas.removeEventListener("touchend", handleTouchEnd);
  };

  const handleMouseDown = (event: MouseEvent) => {
    isDrawing.current = true;
    startDrawing(event);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDrawing.current) return;
    continueDrawing(event);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    ctx.current!.closePath();
  };

  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault(); // 阻止默认的触摸行为
    isDrawing.current = true;
    const touch = event.touches[0];
    startDrawing(touch);
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault(); // 阻止默认的触摸行为
    if (!isDrawing.current) return;
    const touch = event.touches[0];
    continueDrawing(touch);
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
    ctx.current!.closePath();
  };

  const startDrawing = (event: MouseEvent | Touch) => {
    const canvas = canvasRef.current!;
    const context = ctx.current!;
    const rect = canvas.getBoundingClientRect();
    const x =
      "clientX" in event
        ? event.clientX - rect.left
        : (event as TouchEvent).touches[0].clientX - rect.left;
    const y =
      "clientY" in event
        ? event.clientY - rect.top
        : (event as TouchEvent).touches[0].clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
  };

  const continueDrawing = (event: MouseEvent | Touch) => {
    const canvas = canvasRef.current!;
    const context = ctx.current!;
    const rect = canvas.getBoundingClientRect();
    const x =
      "clientX" in event
        ? event.clientX - rect.left
        : (event as TouchEvent).touches[0].clientX - rect.left;
    const y =
      "clientY" in event
        ? event.clientY - rect.top
        : (event as TouchEvent).touches[0].clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  return (
    <div className={styles.box}>
      <canvas
        ref={canvasRef}
        width={size.x}
        height={size.y}
        className={styles.canvas}
      />
      <Space className={styles.gap}>
        <Button
          onClick={() => {
            if (!canvasRef.current || !ctx.current) return;
            const canvas = canvasRef.current;
            const context = ctx.current;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath(); // 可选：开始新的绘图路径
          }}
          type="primary"
        >
          clear
        </Button>
        <Button
          onClick={() => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL("image/png"); // You can also use "image/jpeg" if you prefer JPG format.

            // Create a temporary link element
            const downloadLink = document.createElement("a");
            downloadLink.href = dataURL;
            downloadLink.download = "doodle.png"; // You can customize the filename as needed

            // Append the link to the document, trigger a click, and then remove it
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }}
        >
          download
        </Button>
        <div className={styles.overlap}>
          <label>
            <span>width: </span>
            <Input
              value={size.x}
              onChange={(e) => {
                setSize({
                  y: size.y,
                  x: +e.target.value || 0,
                });
              }}
            />
          </label>
          <label>
            <span>height:</span>
            <Input
              value={size.y}
              onChange={(e) => {
                setSize({
                  y: +e.target.value || 0,
                  x: size.x,
                });
              }}
            />
          </label>
        </div>
      </Space>
    </div>
  );
};
