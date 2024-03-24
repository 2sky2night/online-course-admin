import { Button } from "antd";
import { useTheme } from "antd-style";

export default function HomePage() {
  const theme = useTheme();
  const handleClick = () => {};
  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        111
      </Button>
      <div style={{ color: theme.colorText }}>111</div>
    </div>
  );
}
