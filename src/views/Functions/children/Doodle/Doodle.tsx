// import { useEffect, useRef, useState } from "react";
// import styles from "./Doodle.module.css";
// import { Button, Input, Space } from "antd";

// export const Doodle = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const ctx = useRef<CanvasRenderingContext2D | null>(null);
//   const isDrawing = useRef(false);
//   const [size, setSize] = useState({
//     x: 800,
//     y: 800,
//   });

//   useEffect(() => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     if (!context) return;
//     ctx.current = context;

//     // 初始化画布样式
//     context.fillStyle = "#eee";
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     // 添加鼠标按下事件监听
//     canvas.addEventListener("mousedown", handleMouseDown);
//     // 添加鼠标移动事件监听
//     canvas.addEventListener("mousemove", handleMouseMove);
//     // 添加鼠标释放事件监听
//     canvas.addEventListener("mouseup", handleMouseUp);

//     // 清理函数，移除事件监听器
//     return () => {
//       canvas.removeEventListener("mousedown", handleMouseDown);
//       canvas.removeEventListener("mousemove", handleMouseMove);
//       canvas.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   const handleMouseDown = (event: MouseEvent) => {
//     isDrawing.current = true;
//     startDrawing(event);
//   };

//   const handleMouseMove = (event: MouseEvent) => {
//     if (!isDrawing.current) return;
//     continueDrawing(event);
//   };

//   const handleMouseUp = () => {
//     isDrawing.current = false;
//     ctx.current!.closePath();
//   };

//   const startDrawing = (event: MouseEvent) => {
//     const canvas = canvasRef.current!;
//     const context = ctx.current!;
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
//     context.beginPath();
//     context.moveTo(x, y);
//   };

//   const continueDrawing = (event: MouseEvent) => {
//     const canvas = canvasRef.current!;
//     const context = ctx.current!;
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     context.lineTo(x, y);
//     context.stroke();
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} width={size.x} height={size.y} />
//       <Space>
//         <Button onClick={() => {}}>clear</Button>
//         <Input
//           value={size.x}
//           onChange={(e) => {
//             setSize({
//               y: size.y,
//               x: +e.target.value,
//             });
//           }}
//         />
//         <Input
//           value={size.y}
//           onChange={(e) => {
//             setSize({
//               y: e.target.value,
//               x: size.x,
//             });
//           }}
//         />
//       </Space>
//     </div>
//   );
// };
import { useEffect, useRef, useState } from "react";
import { Button, Input, Space } from "antd";
import styles from "./Doodle.module.css";

export const Doodle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false);
  const [size, setSize] = useState({
    x: 200,
    y: 200,
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
        : event.touches[0].clientX - rect.left;
    const y =
      "clientY" in event
        ? event.clientY - rect.top
        : event.touches[0].clientY - rect.top;
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
        : event.touches[0].clientX - rect.left;
    const y =
      "clientY" in event
        ? event.clientY - rect.top
        : event.touches[0].clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  return (
    <div className={styles.box}>
      <canvas ref={canvasRef} width={size.x} height={size.y} />
      <Space>
        <Button onClick={() => {}}>clear</Button>
        <Input
          value={size.x}
          onChange={(e) => {
            setSize({
              y: size.y,
              x: +e.target.value,
            });
          }}
        />
        <Input
          value={size.y}
          onChange={(e) => {
            setSize({
              y: e.target.value,
              x: size.x,
            });
          }}
        />
      </Space>
    </div>
  );
};
