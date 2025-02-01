import { describe, it } from "@jest/globals";
import { createRoot } from "react-dom/client";
import { Link } from ".";

describe("Link", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Link href="https://nrz.build/repo">Nrz Docs</Link>);
    root.unmount();
  });
});
